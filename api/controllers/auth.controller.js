import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { name, email, password1, password2 } = req.body;

  if (!name || !email || !password1 || !password2) {
    return next(errorHandler(400, "All fields are required"));
  }

  if (password1 !== password2) {
    return next(errorHandler(400, "Passwords do not match."));
  }
  const user = await User.findOne({ email });

  if (user) {
    return next(errorHandler(400, "Email is already registered."));
  }

  const hashedPassword = bcryptjs.hashSync(password1, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid) {
      return next(errorHandler(400, "Invalid credential"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );

    const { password: pass, ...rest } = user._doc;

    // req.user = rest;

    res
      .status(200)
      .cookie("accessToken", token, { httpOnly: true, maxAge: 2147483647 })
      .send(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("accessToken").status(200).json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const oauth = async (req, res, next) => {
  const { name, email, profilePic } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY
      );

      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("accessToken", token, { httpOnly: true, maxAge: 2147483647 })
        .send(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        profilePicture: profilePic,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.SECRET_KEY
      );

      const { password: pass, ...rest } = newUser._doc;
      // req.user = rest;
      res
        .status(200)
        .cookie("accessToken", token, { httpOnly: true, maxAge: 2147483647 })
        .send(rest);
    }
  } catch (error) {
    next(error);
  }
};
