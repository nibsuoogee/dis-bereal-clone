import express from "express";
import { getUserNotifications } from "../controllers/notificationController";

export const router = express.Router();

router.get("/:userid", getUserNotifications);

export default router;
