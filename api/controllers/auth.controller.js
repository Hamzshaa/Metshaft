import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export const signup = async (req, res, next) => {
  const { name, email, password1, password2 } = req.body;

  if (!name || !email || !password1 || !password2) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password1 !== password2) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "Email is already registered." });
  }

  const hashedPassword = bcryptjs.hashSync(password1, 10);

  const newUser = await new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid credential" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );

    const { password: pass, ...rest } = user._doc;

    res.status(200).cookie("accessToken", token, { httpOnly: true }).send(rest);
  } catch (error) {
    res.status(500).send({ message: error.message });
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
        .cookie("accessToken", token, { httpOnly: true })
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

      res
        .status(200)
        .cookie("accessToken", token, { httpOnly: true })
        .send(rest);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
