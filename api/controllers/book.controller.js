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

    const section7Books = await Book.countDocuments({
      createdAt: { $gte: section7 },
    });

    const section6Books = await Book.countDocuments({
      createdAt: { $gte: section6 },
    });

    const section5Books = await Book.countDocuments({
      createdAt: { $gte: section5 },
    });

    const section4Books = await Book.countDocuments({
      createdAt: { $gte: section4 },
    });

    const section3Books = await Book.countDocuments({
      createdAt: { $gte: section3 },
    });

    const section2Books = await Book.countDocuments({
      createdAt: { $gte: section2 },
    });

    const section1Books = await Book.countDocuments({
      createdAt: { $gte: section1 },
    });

    let percentage = 0;
    if (section7Books !== 0) {
      percentage = Math.round(
        ((section1Books - section7Books) / section1Books) * 100
      );
    } else {
      percentage = section1Books * 100;
    }

    res.status(200).json({
      chartData: [
        { name: "Section 7", books: section7Books },
        { name: "Section 6", books: section6Books },
        { name: "Section 5", books: section5Books },
        { name: "Section 4", books: section4Books },
        { name: "Section 3", books: section3Books },
        { name: "Section 2", books: section2Books },
        { name: "Section 1", books: section1Books },
      ],
      percentage,
    });
  } catch (error) {
    next(error);
  }
};

export const getBarChartInfo = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };

    const day1 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1
    );

    const day2 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 2
    );

    const day3 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 3
    );

    const day4 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 4
    );

    const day5 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 5
    );

    const day6 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 6
    );

    const day7 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 7
    );

    const day8 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 8
    );

    const day9 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 9
    );

    const day10 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 10
    );

    const day11 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 11
    );

    const day12 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 12
    );

    const day13 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 13
    );

    const day14 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 14
    );

    const day15 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 15
    );

    const day1Books = await Book.countDocuments({
      createdAt: { $gte: day1 },
    });

    const day1Users = await User.countDocuments({
      createdAt: { $gte: day1 },
    });

    const day2Books = await Book.countDocuments({
      createdAt: { $gte: day2, $lt: day1 },
    });

    const day2Users = await User.countDocuments({
      createdAt: { $gte: day2, $lt: day1 },
    });

    const day3Books = await Book.countDocuments({
      createdAt: { $gte: day3, $lt: day2 },
    });

    const day3Users = await User.countDocuments({
      createdAt: { $gte: day3, $lt: day2 },
    });

    const day4Books = await Book.countDocuments({
      createdAt: { $gte: day4, $lt: day3 },
    });

    const day4Users = await User.countDocuments({
      createdAt: { $gte: day4, $lt: day3 },
    });

    const day5Books = await Book.countDocuments({
      createdAt: { $gte: day5, $lt: day4 },
    });

    const day5Users = await User.countDocuments({
      createdAt: { $gte: day5, $lt: day4 },
    });

    const day6Books = await Book.countDocuments({
      createdAt: { $gte: day6, $lt: day5 },
    });

    const day6Users = await User.countDocuments({
      createdAt: { $gte: day6, $lt: day5 },
    });

    const day7Books = await Book.countDocuments({
      createdAt: { $gte: day7, $lt: day6 },
    });

    const day7Users = await User.countDocuments({
      createdAt: { $gte: day7, $lt: day6 },
    });

    const day8Books = await Book.countDocuments({
      createdAt: { $gte: day8, $lt: day7 },
    });

    const day8Users = await User.countDocuments({
      createdAt: { $gte: day8, $lt: day7 },
    });

    const day9Books = await Book.countDocuments({
      createdAt: { $gte: day9, $lt: day8 },
    });

    const day9Users = await User.countDocuments({
      createdAt: { $gte: day9, $lt: day8 },
    });

    const day10Books = await Book.countDocuments({
      createdAt: { $gte: day10, $lt: day9 },
    });

    const day10Users = await User.countDocuments({
      createdAt: { $gte: day10, $lt: day9 },
    });

    const day11Books = await Book.countDocuments({
      createdAt: { $gte: day11, $lt: day10 },
    });

    const day11Users = await User.countDocuments({
      createdAt: { $gte: day11, $lt: day10 },
    });

    const day12Books = await Book.countDocuments({
      createdAt: { $gte: day12, $lt: day11 },
    });

    const day12Users = await User.countDocuments({
      createdAt: { $gte: day12, $lt: day11 },
    });

    const day13Books = await Book.countDocuments({
      createdAt: { $gte: day13, $lt: day12 },
    });

    const day13Users = await User.countDocuments({
      createdAt: { $gte: day13, $lt: day12 },
    });

    const day14Books = await Book.countDocuments({
      createdAt: { $gte: day14, $lt: day13 },
    });

    const day14Users = await User.countDocuments({
      createdAt: { $gte: day14, $lt: day13 },
    });

    const day15Books = await Book.countDocuments({
      createdAt: { $gte: day15, $lt: day14 },
    });

    const day15Users = await User.countDocuments({
      createdAt: { $gte: day15, $lt: day14 },
    });

    res.status(200).json({
      barChartData: [
        {
          date: day15.toLocaleDateString("en-US", options),
          books: day15Books,
          users: day15Users,
        },
        {
          date: day14.toLocaleDateString("en-US", options),
          books: day14Books,
          users: day14Users,
        },
        {
          date: day13.toLocaleDateString("en-US", options),
          books: day13Books,
          users: day13Users,
        },
        {
          date: day12.toLocaleDateString("en-US", options),
          books: day12Books,
          users: day12Users,
        },
        {
          date: day11.toLocaleDateString("en-US", options),
          books: day11Books,
          users: day11Users,
        },
        {
          date: day10.toLocaleDateString("en-US", options),
          books: day10Books,
          users: day10Users,
        },
        {
          date: day9.toLocaleDateString("en-US", options),
          books: day9Books,
          users: day9Users,
        },
        {
          date: day8.toLocaleDateString("en-US", options),
          books: day8Books,
          users: day8Users,
        },
        {
          date: day7.toLocaleDateString("en-US", options),
          books: day7Books,
          users: day7Users,
        },
        {
          date: day6.toLocaleDateString("en-US", options),
          books: day6Books,
          users: day6Users,
        },
        {
          date: day5.toLocaleDateString("en-US", options),
          books: day5Books,
          day1Users: day5Users,
        },
        {
          date: day4.toLocaleDateString("en-US", options),
          books: day4Books,
          users: day4Users,
        },
        {
          date: day3.toLocaleDateString("en-US", options),
          books: day3Books,
          users: day3Users,
        },
        {
          date: day2.toLocaleDateString("en-US", options),
          books: day2Books,
          users: day2Users,
        },
        {
          date: day1.toLocaleDateString("en-US", options),
          books: day1Books,
          users: day1Users,
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};
