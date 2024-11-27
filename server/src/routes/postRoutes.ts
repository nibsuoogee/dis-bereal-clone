//import { authMiddleware } from "@middlewares/authMiddleware";
import { getPosts } from "@controllers/postController";
import express from "express";

export const router = express.Router();

router.get("/", /*authMiddleware,*/ getPosts);

export default router;
