import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bookInfo: {
      type: Object,
      default: { progress: 0, finished: 0, total: 0 },
    },
    totalBooks: {
      type: Number,
      default: 0,
    },
    notification: [
      {
        isSeen: {
          type: Boolean,
          default: false,
        },
        message: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
