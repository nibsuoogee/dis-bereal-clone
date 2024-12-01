//import { authMiddleware } from "@middlewares/authMiddleware";
import {
  deletePost,
  getPosts,
  getVideo,
  uploadPost,
} from "@controllers/postController";
import express from "express";

export const router = express.Router();

router.get("/", /*authMiddleware,*/ getPosts);
router.get("/:id", /*authMiddleware,*/ getVideo);

router.post("/", /*authMiddleware,*/ uploadPost);

router.delete("/:id", /*authMiddleware,*/ deletePost);

export default router;
