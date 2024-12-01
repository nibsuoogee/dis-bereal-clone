import express from "express";
import { handleDevRequest } from "../controllers/devController";

export const router = express.Router();

router.post("/", handleDevRequest);

export default router;
