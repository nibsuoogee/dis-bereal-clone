import {
  getComments,
  addComment,
  deleteComment,
} from "@controllers/commentController";
import express from "express";

export const router = express.Router();

router.get("/:postid/:database", getComments);
router.delete("/:commentid/:database", deleteComment);
router.post("/", addComment);

export default router;
