import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "../api/routers/auth.router.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log(e.message));

app.use(cors({ origin: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
