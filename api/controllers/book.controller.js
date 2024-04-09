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

    const book = await Book.findOne({
      title: req.body.title,
      _id: req.body.user_Id,
    });

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

    const oneYearAgo = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const totalLastYearBooks = await Book.countDocuments({
      createdAt: { $gte: oneYearAgo },
    });

    const oneMonthAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );

    const totalLastMonthBooks = await Book.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    const oneWeekAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 7
    );

    const totalLastWeekBooks = await Book.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });

    const totalTodayBooks = await Book.countDocuments({
      createdAt: { $gte: currentDate },
    });

    res.status(200).json({
      books,
      totalBooks,
      totalTodayBooks,
      totalLastWeekBooks,
      totalLastMonthBooks,
      totalLastYearBooks,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const onProgressBooks = await Book.find({
      user_id: req.params.userId,
      state: "onProgress",
    });

    const finishedBooks = await Book.find({
      user_id: req.params.userId,
      state: "finished",
    });

    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        bookInfo: {
          progress: onProgressBooks.length,
          finished: finishedBooks.length,
          total: onProgressBooks.length + finishedBooks.length,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
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

    if (book.img && book.img.includes("cloudinary")) {
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
export const deleteImg = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(401, "Unauthorized"));
    }

    let result = "";
    if (req.params.imgUrl) {
      const fullPath = "metsehaft/" + req.params.imgUrl;
      result = await cloudinary.uploader.destroy(fullPath);
    }

    // if (result != "ok") {
    //   return next(errorHandler(404, "not found"));
    // }

    if (result == "not found") {
      return res.send();
    }

    res.status(200).json({ message: "Deleted successfully from cloudinary" });
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
      return;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      {
        state: req.body.state,
      },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const editBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      next(errorHandler(404, "Book not found"));
    }

    if (req.params.bookId !== req.body._id) {
      next(errorHandler(404, "Incorrect data"));
    }

    if (req.user.id !== req.body.user_id || req.user.isAdmin) {
      next(errorHandler(401, "Unauthorized to edit this book"));
    }

    const editedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          page: req.body.page,
          genre: req.body.genre,
          date: req.body.date,
          publisher: req.body.publisher,
          published_date: req.body.published_date,
          nationality: req.body.nationality,
          language: req.body.language,
          translated_to: req.body.translated_to,
          translator: req.body.translator,
          img: req.body.img,
          state: req.body.state,
        },
      },
      { new: true }
    );

    res.status(200).json(editedBook);
  } catch (error) {
    next(error);
  }
};
