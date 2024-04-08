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
    }

    if (req.body.email && req.body.email !== user.email) {
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) {
        return next(errorHandler(400, "Email already exist"));
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          name: req.body.name,
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
  if (req.params.id !== req.user.id && !req.user.isAdmin) {
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

export const getUsers = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit).sort("-createdAt");
    const totalUsers = await User.countDocuments();

    res.status(200).json({ users, totalUsers });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const grantRevokeAdmin = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (user.email === "trident32000@gmail.com") {
      return next(
        errorHandler(
          400,
          "You can't change the admin status of the owner of the app."
        )
      );
    }

    if (user.isAdmin) {
      await User.findByIdAndUpdate(userId, { $set: { isAdmin: false } });
    } else {
      await User.findByIdAndUpdate(userId, { $set: { isAdmin: true } });
    }

    res.status(200).json({ message: "Admin status changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const getChartInfo = async (req, res, next) => {
  try {
    const currentDate = new Date();

    const section7 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 4
    );

    const section6 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 8
    );

    const section5 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 12
    );

    const section4 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 16
    );

    const section3 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 20
    );

    const section2 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 24
    );

    const section1 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 28
    );

    const section7Users = await User.countDocuments({
      createdAt: { $gte: section7 },
    });

    const section6Users = await User.countDocuments({
      createdAt: { $gte: section6 },
    });

    const section5Users = await User.countDocuments({
      createdAt: { $gte: section5 },
    });

    const section4Users = await User.countDocuments({
      createdAt: { $gte: section4 },
    });

    const section3Users = await User.countDocuments({
      createdAt: { $gte: section3 },
    });

    const section2Users = await User.countDocuments({
      createdAt: { $gte: section2 },
    });

    const section1Users = await User.countDocuments({
      createdAt: { $gte: section1 },
    });

    let percentage = 0;
    if (section7Users !== 0) {
      percentage = Math.round(
        ((section1Users - section7Users) / section1Users) * 100
      );
    } else {
      percentage = section1Users * 100;
    }

    res.status(200).json({
      chartData: [
        { name: "Section 7", users: section7Users },
        { name: "Section 6", users: section6Users },
        { name: "Section 5", users: section5Users },
        { name: "Section 4", users: section4Users },
        { name: "Section 3", users: section3Users },
        { name: "Section 2", users: section2Users },
        { name: "Section 1", users: section1Users },
      ],
      percentage,
    });
  } catch (error) {
    next(error);
  }
};
