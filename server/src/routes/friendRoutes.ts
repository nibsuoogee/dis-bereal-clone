import express from "express";
import {
  addFriend,
  getFriends,
  getNonFriends,
} from "../controllers/friendController";

export const router = express.Router();

router.post("/", addFriend);
router.get("/", getFriends);
router.post("/nonFriends", getNonFriends);

export default router;
