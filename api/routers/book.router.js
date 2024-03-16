import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addBook } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addBook);

export default router;
