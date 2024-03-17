import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  addBook,
  getBook,
  deleteBook,
  addToFinished,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addBook);
router.get("/", verifyToken, getBook);
router.delete("/delete/:bookId", verifyToken, deleteBook);
router.put("/add/toFinished/:bookId", verifyToken, addToFinished);

export default router;
