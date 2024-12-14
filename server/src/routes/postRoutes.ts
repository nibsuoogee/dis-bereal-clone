import {
  deletePost,
  getFriendsPosts,
  getPosts,
  getUserPosts,
  getVideo,
  uploadPost,
} from "@controllers/postController";
import express from "express";

export const router = express.Router();

router.get("/", getPosts);
router.get("/:userid", getUserPosts);
router.get("/video/:postid", getVideo);
router.get("/friends/:userid", getFriendsPosts);

router.post("/", uploadPost);

router.delete("/:id", deletePost);

export default router;
