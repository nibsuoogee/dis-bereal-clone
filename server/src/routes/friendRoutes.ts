import express from "express";
import {
  addFriend,
  getFriends,
  getNonFriends,
  removeFriend,
} from "../controllers/friendController";

export const router = express.Router();

router.post("/", addFriend);
router.get("/:database/:userid", getFriends);
router.get("/nonfriends/:database/:userid", getNonFriends);
router.delete("/:database/:userid1/:userid2", removeFriend);

export default router;
