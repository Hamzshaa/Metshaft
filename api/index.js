import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "../api/routers/auth.router.js";
import userRoute from "../api/routers/user.router.js";
import bookRoute from "../api/routers/book.router.js";
import chartRoute from "../api/routers/chart.router.js";
dotenv.config();
import path from "path";

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log(e.message));

const __dirname = path.resolve();

app.use(cors({ origin: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/charts", chartRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({ success: false, statusCode, message });
});
