import User from "../models/auth.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );
      }
      const isMatched = bcryptjs.compareSync(req.body.password, user.password);

      if (!isMatched) {
        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
      }
    }

    if (req.body.profilePicture && user.profilePicture.includes("cloudinary")) {
      let fileName = user.profilePicture.split("/").pop().split(".")[0];
      const fullPath = "metsehaft/" + fileName;
      const response = await cloudinary.uploader.destroy(fullPath);
      console.log(response);
    }

    if (req.body.email) {
      const emailExist = await User.findOne({ email: req.body.email });
      console.log(emailExist);
      if (emailExist) {
        return next(errorHandler(400, "Email already exist"));
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(401, "Unauthorized"));
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (user.profilePicture.includes("cloudinary")) {
      let fileName = user.profilePicture.split("/").pop().split(".")[0];
      const fullPath = "metsehaft/" + fileName;
      await cloudinary.uploader.destroy(fullPath);
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
