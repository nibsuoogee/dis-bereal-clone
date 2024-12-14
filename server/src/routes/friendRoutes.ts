import express from "express";
import {
  addFriend,
  getFriends,
  getNonFriends,
  removeFriend,
} from "../controllers/friendController";

export const router = express.Router();

router.post("/", addFriend);
router.get("/:userid", getFriends);
router.get("/nonfriends/:userid", getNonFriends);
router.delete("/:userid1/:userid2", removeFriend);

export default router;
