import { Request, Response } from "express";
import { handleControllerRequest } from "@controllers/handlers";
import { queryMultiDB } from "@database/db";
import { DatabaseOption, Comment, DBPayload } from "@types";

export const getComments = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { postid, database } = req.params;

      const result = await queryMultiDB(
        database as DatabaseOption,
        `
        SELECT c.commentid, c.postid, c.userid, c.text, c.timestamp, u.username
        FROM comments_${database} c
        JOIN users u ON c.userid = u.userid
        WHERE c.postid = $1
        ORDER BY c.timestamp ASC
        `,
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
      const payload = req.body as DBPayload;
      const database = payload.database as DatabaseOption;
      const { postid, userid, text } = payload.obj as Comment;

      const result = await queryMultiDB(
        database,
        `INSERT INTO comments_${database} (postid, userid, text) 
         VALUES ($1, $2, $3) RETURNING commentid`,
        [postid, userid, text]
      );

      return {
        message: "Comment added successfully",
        data: { commentid: result.rows[0].commentid },
      };
    },
    "addComment"
  );
};

export const deleteComment = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { commentid, database } = req.params;

      await queryMultiDB(
        database as DatabaseOption,
        `DELETE FROM comments_${database} WHERE commentid = $1`,
        [commentid]
      );

      return {
        message: "Comment deleted successfully",
        data: null,
      };
    },
    "deleteComment"
  );
};
