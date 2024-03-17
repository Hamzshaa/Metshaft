import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/auth.model.js";
import Book from "../models/book.model.js";

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
