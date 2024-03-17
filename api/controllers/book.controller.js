import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/auth.model.js";
import Book from "../models/book.model.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

export const addBook = async (req, res, next) => {
  if (!req.body.author || !req.body.user_id || !req.body.title) {
    return next(errorHandler(401, "All required fields should be filled."));
  }

  try {
    const user = await User.findById(req.body.user_id);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const book = await Book.findOne({ title: req.body.title });

    if (book) {
      return next(errorHandler(400, "Book with this title already exist."));
    }

    const state = req.body.addDirectly ? "finished" : "onProgress";
    const newBook = new Book({
      ...req.body,
      state,
    });

    await newBook.save();

    res.status(200).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const sortDirection = req.query.order === "asc" ? 1 : -1;

  try {
    const books = await Book.find({
      ...(req.query.userId && { user_id: req.query.userId }),
      ...(req.query.genre && { genre: req.query.genre }),
      ...(req.query.nationality && { nationality: req.query.nationality }),
      ...(req.query.bookId && { _id: req.query.bookId }),
      ...(req.query.title && { title: req.query.title }),
      ...(req.query.author && { author: req.query.author }),
      ...(req.query.publisher && { publisher: req.query.publisher }),
      ...(req.query.language && { language: req.query.language }),
      ...(req.query.state && { state: req.query.state }),
      ...(req.query.search && {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { author: { $regex: req.query.search, $options: "i" } },
          { publisher: { $regex: req.query.search, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalBooks = await Book.countDocuments();

    const currentDate = new Date();
    const oneMonthAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );

    const lastMonthBooks = await Book.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    const oneYearAgo = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const lastYearBooks = await Book.countDocuments({
      createdAt: { $gte: oneYearAgo },
    });

    res.status(200).json({ books, totalBooks, lastMonthBooks, lastYearBooks });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return next(errorHandler(404, "Book not found"));
    }

    if (book.user_id !== req.user.id && req.user.isAdmin) {
      return next(errorHandler(401, "Unauthorized"));
    }

    if (book.img.includes("cloudinary")) {
      let fileName = book.img.split("/").pop().split(".")[0];
      const fullPath = "metsehaft/" + fileName;
      await cloudinary.uploader.destroy(fullPath);
    }

    await Book.findByIdAndDelete(req.params.bookId);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const addToFinished = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return next(errorHandler(404, "Book not found"));
    }

    if (book.user_id !== req.user.id && req.user.isAdmin) {
      return next(errorHandler(401, "Unauthorized"));
    }

    if (!req.body.state) {
      console.log("Nothing to update");
      return;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      {
        state: req.body.state,
      },
      { new: true }
    );

    console.log(updatedBook);
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};
