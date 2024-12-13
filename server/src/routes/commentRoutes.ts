import { getComments, addComment } from "@controllers/commentController";
import express from "express";

export const router = express.Router();

router.get("/:postid", getComments); 
router.post("/", addComment); 

export default router;
