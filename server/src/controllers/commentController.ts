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
        `
        SELECT c.commentid, c.postid, c.userid, c.text AS content, c.timestamp, u.username
        FROM comments_za c
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

export const deleteComment = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { commentid } = req.params;

      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT userid FROM comments_za WHERE commentid = $1",
        [commentid]
      );
      const userid = result.rows[0]?.userid;

      if (!userid) {
        throw new Error("Comment not found or user mismatch.");
      }

      const result2 = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT database FROM users WHERE userid = $1",
        [userid]
      );
      const database = result2.rows[0]?.database;

      if (!database) {
        throw new Error("User database not found.");
      }

      await queryMultiDB(
        database,
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