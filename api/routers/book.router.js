import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  addBook,
  getBook,
  deleteBook,
  addToFinished,
  deleteImg,
  editBook,
  getBookInfo,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addBook);
router.get("/", verifyToken, getBook);
router.get("/info/:userId", verifyToken, getBookInfo);
router.delete("/delete/:bookId", verifyToken, deleteBook);
router.delete("/delete/img/:imgUrl", verifyToken, deleteImg);
router.put("/add/toFinished/:bookId", verifyToken, addToFinished);
router.put("/edit/:bookId", verifyToken, editBook);

export default router;
