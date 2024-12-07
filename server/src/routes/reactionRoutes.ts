import express from "express";
import {
  deleteReaction,
  getReactions,
  postReaction,
} from "../controllers/reactionController";

export const router = express.Router();

router.get("/:postid", getReactions);

router.post("/", postReaction);

router.delete("/:postid", deleteReaction);

export default router;
