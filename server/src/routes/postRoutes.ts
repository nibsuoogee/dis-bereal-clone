import {
  deletePost,
  getPosts,
  getVideo,
  uploadPost,
} from "@controllers/postController";
import express from "express";

export const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getVideo);

router.post("/", uploadPost);

router.delete("/:id", deletePost);

export default router;
