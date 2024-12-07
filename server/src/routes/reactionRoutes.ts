import express from "express";
import {
  deleteReaction,
  getReactions,
  postReaction,
} from "../controllers/reactionController";

export const router = express.Router();

router.get("/:postid", getReactions);

router.post("/:postid", postReaction);

router.delete("/:postid", deleteReaction);

export default router;
