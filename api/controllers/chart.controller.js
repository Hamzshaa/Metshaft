import User from "../models/auth.model.js";
import Book from "../models/book.model.js";

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
      createdAt: { $lt: currentDate },
    });

    const section6Books = await Book.countDocuments({
      createdAt: { $lt: section6 },
    });

    const section5Books = await Book.countDocuments({
      createdAt: { $lt: section5 },
    });

    const section4Books = await Book.countDocuments({
      createdAt: { $lt: section4 },
    });

    const section3Books = await Book.countDocuments({
      createdAt: { $lt: section3 },
    });

    const section2Books = await Book.countDocuments({
      createdAt: { $lt: section2 },
    });

    const section1Books = await Book.countDocuments({
      createdAt: { $lt: section1 },
    });

    let percentage = 0;
    if (section1Books !== 0) {
      percentage = Math.round(
        ((section7Books - section1Books) / section1Books) * 100
      );
    } else {
      percentage = section7Books * 100;
    }

    res.status(200).json({
      chartData: [
        { name: "Section 1", books: section1Books },
        { name: "Section 2", books: section2Books },
        { name: "Section 3", books: section3Books },
        { name: "Section 4", books: section4Books },
        { name: "Section 5", books: section5Books },
        { name: "Section 6", books: section6Books },
        { name: "Section 7", books: section7Books },
      ],
      percentage,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserChartInfo = async (req, res, next) => {
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
      createdAt: { $lt: currentDate },
    });

    const section6Users = await User.countDocuments({
      createdAt: { $lt: section6 },
    });

    const section5Users = await User.countDocuments({
      createdAt: { $lt: section5 },
    });

    const section4Users = await User.countDocuments({
      createdAt: { $lt: section4 },
    });

    const section3Users = await User.countDocuments({
      createdAt: { $lt: section3 },
    });

    const section2Users = await User.countDocuments({
      createdAt: { $lt: section2 },
    });

    const section1Users = await User.countDocuments({
      createdAt: { $lt: section1 },
    });

    let percentage = 0;
    if (section1Users !== 0) {
      percentage = Math.round(
        ((section7Users - section1Users) / section1Users) * 100
      );
    } else {
      percentage = section7Users * 100;
    }

    res.status(200).json({
      chartData: [
        { name: "Section 1", users: section1Users },
        { name: "Section 2", users: section2Users },
        { name: "Section 3", users: section3Users },
        { name: "Section 4", users: section4Users },
        { name: "Section 5", users: section5Users },
        { name: "Section 6", users: section6Users },
        { name: "Section 7", users: section7Users },
      ],
      percentage,
    });
  } catch (error) {
    next(error);
  }
};

export const getPieChartInfo = async (req, res, next) => {
  try {
    const onProgressBooks = await Book.countDocuments({
      state: "onProgress",
    });

    const finishedBooks = await Book.countDocuments({ state: "finished" });

    res.status(200).json({
      pieChartData: [
        { name: "On Progress", value: onProgressBooks, color: "#1890ff" },
        { name: "Finished", value: finishedBooks, color: "#09ff01" },
      ],
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

    const day0ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day1 },
      state: "onProgress",
    });

    const day0FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day1 },
      state: "finished",
    });

    const day1ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day1, $lt: currentDate },
      state: "onProgress",
    });

    const day1FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day1, $lt: currentDate },
      state: "finished",
    });

    const day2ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day2, $lt: day1 },
      state: "onProgress",
    });

    const day2FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day2, $lt: day1 },
      state: "finished",
    });

    const day3ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day3, $lt: day2 },
      state: "onProgress",
    });

    const day3FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day3, $lt: day2 },
      state: "finished",
    });

    const day4ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day4, $lt: day3 },
      state: "onProgress",
    });

    const day4FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day4, $lt: day3 },
      state: "finished",
    });

    const day5ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day5, $lt: day4 },
      state: "onProgress",
    });

    const day5FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day5, $lt: day4 },
      state: "finished",
    });

    const day6ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day6, $lt: day5 },
      state: "onProgress",
    });

    const day6FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day6, $lt: day5 },
      state: "finished",
    });

    const day7ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day7, $lt: day6 },
      state: "onProgress",
    });

    const day7FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day7, $lt: day6 },
      state: "finished",
    });

    const day8ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day8, $lt: day7 },
      state: "onProgress",
    });

    const day8FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day8, $lt: day7 },
      state: "finished",
    });

    const day9ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day9, $lt: day8 },
      state: "onProgress",
    });

    const day9FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day9, $lt: day8 },
      state: "finished",
    });

    const day10ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day10, $lt: day9 },
      state: "onProgress",
    });

    const day10FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day10, $lt: day9 },
      state: "finished",
    });

    const day11ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day11, $lt: day10 },
      state: "onProgress",
    });

    const day11FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day11, $lt: day10 },
      state: "finished",
    });

    const day12ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day12, $lt: day11 },
      state: "onProgress",
    });

    const day12FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day12, $lt: day11 },
      state: "finished",
    });

    const day13ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day13, $lt: day12 },
      state: "onProgress",
    });

    const day13FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day13, $lt: day12 },
      state: "finished",
    });

    const day14ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day14, $lt: day13 },
      state: "onProgress",
    });

    const day14FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day14, $lt: day13 },
      state: "finished",
    });

    res.status(200).json({
      barChartData: [
        {
          date: day14.toLocaleDateString("en-US", options),
          progress: day14ProgressBooks,
          finished: day14FinishedBooks,
          total: day14ProgressBooks + day14FinishedBooks,
        },
        {
          date: day13.toLocaleDateString("en-US", options),
          progress: day13ProgressBooks,
          finished: day13FinishedBooks,
          total: day13ProgressBooks + day13FinishedBooks,
        },
        {
          date: day12.toLocaleDateString("en-US", options),
          progress: day12ProgressBooks,
          finished: day12FinishedBooks,
          total: day12ProgressBooks + day12FinishedBooks,
        },
        {
          date: day11.toLocaleDateString("en-US", options),
          progress: day11ProgressBooks,
          finished: day11FinishedBooks,
          total: day11ProgressBooks + day11FinishedBooks,
        },
        {
          date: day10.toLocaleDateString("en-US", options),
          progress: day10ProgressBooks,
          finished: day10FinishedBooks,
          total: day10ProgressBooks + day10FinishedBooks,
        },
        {
          date: day9.toLocaleDateString("en-US", options),
          progress: day9ProgressBooks,
          finished: day9FinishedBooks,
          total: day9ProgressBooks + day9FinishedBooks,
        },
        {
          date: day8.toLocaleDateString("en-US", options),
          progress: day8ProgressBooks,
          finished: day8FinishedBooks,
          total: day8ProgressBooks + day8FinishedBooks,
        },
        {
          date: day7.toLocaleDateString("en-US", options),
          progress: day7ProgressBooks,
          finished: day7FinishedBooks,
          total: day7ProgressBooks + day7FinishedBooks,
        },
        {
          date: day6.toLocaleDateString("en-US", options),
          progress: day6ProgressBooks,
          finished: day6FinishedBooks,
          total: day6ProgressBooks + day6FinishedBooks,
        },
        {
          date: day5.toLocaleDateString("en-US", options),
          progress: day5ProgressBooks,
          finished: day5FinishedBooks,
          total: day5ProgressBooks + day5FinishedBooks,
        },
        {
          date: day4.toLocaleDateString("en-US", options),
          progress: day4ProgressBooks,
          finished: day4FinishedBooks,
          total: day4ProgressBooks + day4FinishedBooks,
        },
        {
          date: day3.toLocaleDateString("en-US", options),
          progress: day3ProgressBooks,
          finished: day3FinishedBooks,
          total: day3ProgressBooks + day3FinishedBooks,
        },
        {
          date: day2.toLocaleDateString("en-US", options),
          progress: day2ProgressBooks,
          finished: day2FinishedBooks,
          total: day2ProgressBooks + day2FinishedBooks,
        },
        {
          date: day1.toLocaleDateString("en-US", options),
          progress: day1ProgressBooks,
          finished: day1FinishedBooks,
          total: day1ProgressBooks + day1FinishedBooks,
        },
        {
          date: currentDate.toLocaleDateString("en-US", options),
          progress: day0ProgressBooks,
          finished: day0FinishedBooks,
          total: day0ProgressBooks + day0FinishedBooks,
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};

export const getAreaChartInfo = async (req, res, next) => {
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

    const day0Users = await User.countDocuments({
      createdAt: { $gte: currentDate },
    });

    const day1Users = await User.countDocuments({
      createdAt: { $gte: day1, $lt: currentDate },
    });

    const day2Users = await User.countDocuments({
      createdAt: { $gte: day2, $lt: day1 },
    });

    const day3Users = await User.countDocuments({
      createdAt: { $gte: day3, $lt: day2 },
    });

    const day4Users = await User.countDocuments({
      createdAt: { $gte: day4, $lt: day3 },
    });

    const day5Users = await User.countDocuments({
      createdAt: { $gte: day5, $lt: day4 },
    });

    const day6Users = await User.countDocuments({
      createdAt: { $gte: day6, $lt: day5 },
    });

    const day7Users = await User.countDocuments({
      createdAt: { $gte: day7, $lt: day6 },
    });

    const day8Users = await User.countDocuments({
      createdAt: { $gte: day8, $lt: day7 },
    });

    const day9Users = await User.countDocuments({
      createdAt: { $gte: day9, $lt: day8 },
    });

    const day10Users = await User.countDocuments({
      createdAt: { $gte: day10, $lt: day9 },
    });

    const day11Users = await User.countDocuments({
      createdAt: { $gte: day11, $lt: day10 },
    });

    const day12Users = await User.countDocuments({
      createdAt: { $gte: day12, $lt: day11 },
    });

    const day13Users = await User.countDocuments({
      createdAt: { $gte: day13, $lt: day12 },
    });

    const day14Users = await User.countDocuments({
      createdAt: { $gte: day14, $lt: day13 },
    });

    const day0ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: currentDate },
      state: "onProgress",
    });

    const day0FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: currentDate },
      state: "finished",
    });

    const day1ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day1, $lt: currentDate },
      state: "onProgress",
    });

    const day1FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day1, $lt: currentDate },
      state: "finished",
    });

    const day2ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day2, $lt: day1 },
      state: "onProgress",
    });

    const day2FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day2, $lt: day1 },
      state: "finished",
    });

    const day3ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day3, $lt: day2 },
      state: "onProgress",
    });

    const day3FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day3, $lt: day2 },
      state: "finished",
    });

    const day4ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day4, $lt: day3 },
      state: "onProgress",
    });

    const day4FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day4, $lt: day3 },
      state: "finished",
    });

    const day5ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day5, $lt: day4 },
      state: "onProgress",
    });

    const day5FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day5, $lt: day4 },
      state: "finished",
    });

    const day6ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day6, $lt: day5 },
      state: "onProgress",
    });

    const day6FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day6, $lt: day5 },
      state: "finished",
    });

    const day7ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day7, $lt: day6 },
      state: "onProgress",
    });

    const day7FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day7, $lt: day6 },
      state: "finished",
    });

    const day8ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day8, $lt: day7 },
      state: "onProgress",
    });

    const day8FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day8, $lt: day7 },
      state: "finished",
    });

    const day9ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day9, $lt: day8 },
      state: "onProgress",
    });

    const day9FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day9, $lt: day8 },
      state: "finished",
    });

    const day10ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day10, $lt: day9 },
      state: "onProgress",
    });

    const day10FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day10, $lt: day9 },
      state: "finished",
    });

    const day11ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day11, $lt: day10 },
      state: "onProgress",
    });

    const day11FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day11, $lt: day10 },
      state: "finished",
    });

    const day12ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day12, $lt: day11 },
      state: "onProgress",
    });

    const day12FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day12, $lt: day11 },
      state: "finished",
    });

    const day13ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day13, $lt: day12 },
      state: "onProgress",
    });

    const day13FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day13, $lt: day12 },
      state: "finished",
    });

    const day14ProgressBooks = await Book.countDocuments({
      createdAt: { $gte: day14, $lt: day13 },
      state: "onProgress",
    });

    const day14FinishedBooks = await Book.countDocuments({
      createdAt: { $gte: day14, $lt: day13 },
      state: "finished",
    });

    res.status(200).json({
      areaChartData: [
        {
          date: day14.toLocaleDateString("en-US", options),
          progress: day14ProgressBooks,
          finished: day14FinishedBooks,
          users: day14Users,
        },
        {
          date: day13.toLocaleDateString("en-US", options),
          progress: day13ProgressBooks,
          finished: day13FinishedBooks,
          users: day13Users,
        },
        {
          date: day12.toLocaleDateString("en-US", options),
          progress: day12ProgressBooks,
          finished: day12FinishedBooks,
          users: day12Users,
        },
        {
          date: day11.toLocaleDateString("en-US", options),
          progress: day11ProgressBooks,
          finished: day11FinishedBooks,
          users: day11Users,
        },
        {
          date: day10.toLocaleDateString("en-US", options),
          progress: day10ProgressBooks,
          finished: day10FinishedBooks,
          users: day10Users,
        },
        {
          date: day9.toLocaleDateString("en-US", options),
          progress: day9ProgressBooks,
          finished: day9FinishedBooks,
          users: day9Users,
        },
        {
          date: day8.toLocaleDateString("en-US", options),
          progress: day8ProgressBooks,
          finished: day8FinishedBooks,
          users: day8Users,
        },
        {
          date: day7.toLocaleDateString("en-US", options),
          progress: day7ProgressBooks,
          finished: day7FinishedBooks,
          users: day7Users,
        },
        {
          date: day6.toLocaleDateString("en-US", options),
          progress: day6ProgressBooks,
          finished: day6FinishedBooks,
          users: day6Users,
        },
        {
          date: day5.toLocaleDateString("en-US", options),
          progress: day5ProgressBooks,
          finished: day5FinishedBooks,
          users: day5Users,
        },
        {
          date: day4.toLocaleDateString("en-US", options),
          progress: day4ProgressBooks,
          finished: day4FinishedBooks,
          users: day4Users,
        },
        {
          date: day3.toLocaleDateString("en-US", options),
          progress: day3ProgressBooks,
          finished: day3FinishedBooks,
          users: day3Users,
        },
        {
          date: day2.toLocaleDateString("en-US", options),
          progress: day2ProgressBooks,
          finished: day2FinishedBooks,
          users: day2Users,
        },
        {
          date: day1.toLocaleDateString("en-US", options),
          progress: day1ProgressBooks,
          finished: day1FinishedBooks,
          users: day1Users,
        },
        {
          date: currentDate.toLocaleDateString("en-US", options),
          progress: day0ProgressBooks,
          finished: day0FinishedBooks,
          users: day0Users,
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};
