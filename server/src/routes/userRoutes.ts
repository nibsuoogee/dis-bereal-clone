import { getUser, getUsers } from "@controllers/userController";
import express from "express";

export const router = express.Router();

router.get("/", getUsers);
router.get("/:userid", getUser);

export default router;
