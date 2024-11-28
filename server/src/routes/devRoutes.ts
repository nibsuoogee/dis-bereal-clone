//import { authMiddleware } from "@middlewares/authMiddleware";
import express from "express";
import { initDB } from "../controllers/devController";

export const router = express.Router();

router.post("/", /*authMiddleware,*/ initDB);

export default router;
