//import { authMiddleware } from "@middlewares/authMiddleware";
import express from "express";
import { handleDevRequest } from "../controllers/devController";

export const router = express.Router();

router.post("/", /*authMiddleware,*/ handleDevRequest);

export default router;
