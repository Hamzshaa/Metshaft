import express from "express";
import {
  getChartInfo,
  getBarChartInfo,
  getUserChartInfo,
  getPieChartInfo,
  getAreaChartInfo,
} from "../controllers/chart.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/chartInfo/books/lineChart", verifyToken, getChartInfo);
router.get("/chartInfo/users/lineChart", verifyToken, getUserChartInfo);
router.get("/chartInfo/barChart", verifyToken, getBarChartInfo);
router.get("/chartInfo/pieChart", verifyToken, getPieChartInfo);
router.get("/chartInfo/areaChart", verifyToken, getAreaChartInfo);

export default router;
