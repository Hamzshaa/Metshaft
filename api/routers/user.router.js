import express from "express";
import {
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  grantRevokeAdmin,
  pushNotification,
  getSpecificNotification,
  getNotification,
  markAsReadNotification,
  deleteNotification,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/update", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/", verifyToken, getUsers);
router.get("/:userId", verifyToken, getUser);
router.put("/grantRevokeAdmin/:userId", verifyToken, grantRevokeAdmin);
router.put("/notification", verifyToken, pushNotification);
router.get(
  "/notification/:userId/:notificationId",
  verifyToken,
  getSpecificNotification
);
router.get("/notification/:userId", verifyToken, getNotification);
router.put(
  "/notification/markAsRead/:notificationId",
  verifyToken,
  markAsReadNotification
);
router.put(
  "/notification/delete/:notificationId",
  verifyToken,
  deleteNotification
);

export default router;
