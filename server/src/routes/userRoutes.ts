import { getUser, getUsers, addUser, login } from "@controllers/userController";
import express from "express";

export const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.post("/login", login);
router.get("/:userid", getUser);

export default router;
