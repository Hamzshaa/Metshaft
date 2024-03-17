import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    page: {
      type: String,
    },
    genre: {
      type: String,
    },
    date: {
      type: Date,
    },
    publisher: {
      type: String,
    },
    published_date: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    translated: {
      type: Boolean,
    },
    language: {
      type: String,
    },
    original_language: {
      type: String,
    },
    translated_to: {
      type: String,
    },
    translator: {
      type: String,
    },
    img: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
