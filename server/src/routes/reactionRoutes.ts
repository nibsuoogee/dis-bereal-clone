import express from "express";
import {
  getReactions,
  getUserReactions,
  postReaction,
} from "../controllers/reactionController";

export const router = express.Router();

router.get("/:postid", getReactions);
router.get("/:postid/:userid", getUserReactions);

router.post("/", postReaction);

export default router;
