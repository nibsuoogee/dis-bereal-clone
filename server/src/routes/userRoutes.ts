import { getUsers } from "@controllers/userController";
//import { authMiddleware } from "@middlewares/authMiddleware";
import express from "express";

export const router = express.Router();

router.get("/", /*authMiddleware,*/ getUsers);

export default router;
