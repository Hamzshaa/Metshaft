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

    if (user.email === "trident32000@gmail.com") {
      return next(errorHandler(400, "You can't delete the owner of the app."));
    }

    if (!req.user.email === "trident32000@gmail.com" && user.isAdmin) {
      return next(errorHandler(400, "You can't delete an admin."));
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

export const pushNotification = async (req, res, next) => {
  console.log(req.body);
  if (!req.body.message.trim() || !req.body.message) {
    return next(errorHandler(400, "Message is required"));
  }

  if (req.body.target === "single-user" && !req.body.email) {
    return next(errorHandler(400, "Email is required"));
  }

  try {
    if (req.body.target === "single-user") {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }

      await User.findByIdAndUpdate(user._id, {
        $push: {
          notification: {
            message: req.body.message,
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            ...(req.body.title && { title: req.body.title }),
          },
        },
      });

      return res.status(200).json({
        message: `Notification sent successfully for ${req.body.email}`,
      });
    } else if (req.body.target === "all") {
      await User.updateMany(
        {},
        {
          $push: {
            notification: {
              message: req.body.message,
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              ...(req.body.title && { title: req.body.title }),
            },
          },
        }
      );

      return res
        .status(200)
        .json({ message: "Notification sent successfully for all users" });
    } else if (req.body.target === "only-admins") {
      await User.updateMany(
        { isAdmin: true },
        {
          $push: {
            notification: {
              message: req.body.message,
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              ...(req.body.title && { title: req.body.title }),
            },
          },
        }
      );

      return res
        .status(200)
        .json({ message: "Notification sent successfully for admins" });
    } else if (req.body.target === "except-admins") {
      await User.updateMany(
        { isAdmin: false },
        {
          $push: {
            notification: {
              message: req.body.message,
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              ...(req.body.title && { title: req.body.title }),
            },
          },
        }
      );

      return res.status(200).json({
        message: "Notification sent successfully for non admin users",
      });
    } else {
      return next(errorHandler(400, "Invalid target"));
    }
  } catch (error) {
    next(error);
  }
};

export const getNotification = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json(user.notification);
  } catch (error) {
    next(error);
  }
};

export const markAsReadNotification = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    user.notification.forEach(async (item) => {
      if (item._id == req.params.notificationId) {
        await User.updateOne(
          { _id: req.user.id, "notification._id": item._id },
          { $set: { "notification.$.isSeen": true } }
        );
      }
    });

    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  console.log(req.params.notificationId);
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    user.notification.forEach(async (item) => {
      if (item._id == req.params.notificationId) {
        await User.updateOne(
          { _id: req.user.id },
          { $pull: { notification: { _id: item._id } } }
        );
      }
    });

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getSpecificNotification = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const notification = user.notification.find(
      (item) => item._id == req.params.notificationId
    );

    if (!notification) {
      return next(errorHandler(404, "Notification not found"));
    }

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};
