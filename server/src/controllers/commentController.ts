import { Request, Response } from "express";
import { handleControllerRequest } from "@controllers/handlers";
import { queryMultiDB } from "@database/db";
import { DatabaseOption, Comment } from "@types";

export const getComments = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { postid } = req.params;

      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM comments WHERE postid = $1 ORDER BY timestamp ASC",
        [postid]
      );

      return {
        message: "Comments fetched successfully",
        data: result.rows as Comment[],
      };
    },
    "getComments"
  );
};

export const addComment = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { postid, userid, content } = req.body; 

      const result = await queryMultiDB(
        "za" as DatabaseOption,
        `INSERT INTO comments_za (postid, userid, text) 
         VALUES ($1, $2, $3) RETURNING commentid`,
        [postid, userid, content]
      );

      return {
        message: "Comment added successfully",
        data: { commentid: result.rows[0].commentid },
      };
    },
    "addComment"
  );
};
