import {
  getUser,
  getUsers,
  addUser,
  login,
  updateUser,
  deleteUser,
} from "@controllers/userController";
import express from "express";

export const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.post("/login", login);
router.get("/:userid", getUser);
router.delete("/:userid/:database", deleteUser);
router.patch("/:userid", updateUser);

export default router;
