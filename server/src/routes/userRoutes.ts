import { getUsers } from "@controllers/userController";
import express from "express";

export const router = express.Router();

router.get("/", getUsers);

export default router;
