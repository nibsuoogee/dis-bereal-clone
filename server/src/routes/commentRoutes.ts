import { getComments, addComment, deleteComment } from "@controllers/commentController"; 
import express from "express";

export const router = express.Router();

router.get("/:postid", getComments); 
router.post("/", addComment); 
router.delete("/:commentid", deleteComment); 

export default router;