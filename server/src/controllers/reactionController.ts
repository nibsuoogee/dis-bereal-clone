import { Request, Response } from "express";
import { handleControllerRequest } from "@controllers/handlers";
import { queryMultiDB } from "src/database/db";
import {
  DatabaseOption,
  DBPayload,
  Reaction,
  ReactionCounts,
  ReactionOption,
} from "@types";

export const getReactions = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { postid } = req.params;

      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM reactions WHERE postid = $1",
        [postid]
      );

      const reactions: ReactionCounts = Object.fromEntries(
        Object.values(ReactionOption).map((reaction) => [reaction, 0])
      ) as ReactionCounts;

      result.rows.forEach((row) => {
        reactions[row.type as ReactionOption] += 1;
      });

      return { message: "Reactions fetched successfully", data: reactions };
    },
    "getReactions"
  );
};

export const getUserReactions = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { postid, userid } = req.params;

      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM reactions WHERE postid = $1 AND userid = $2",
        [postid, userid]
      );

      const reactions: ReactionCounts = Object.fromEntries(
        Object.values(ReactionOption).map((reaction) => [reaction, 0])
      ) as ReactionCounts;

      result.rows.forEach((row) => {
        reactions[row.type as ReactionOption] += 1;
      });

      return {
        message: "User reactions fetched successfully",
        data: reactions,
      };
    },
    "getUserReactions"
  );
};

export const postReaction = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const payload = req.body as DBPayload;
      const reaction = payload.obj as Reaction;
      const database = payload.database;

      // Check if the reaction already exists
      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT 1 FROM reactions \
        WHERE postid = $1 AND userid = $2 AND type = $3;",
        [reaction.postid, reaction.userid, reaction.type]
      );

      // Delete the reaction if it exists
      if (result.rows.length > 0) {
        await queryMultiDB(
          database,
          `DELETE FROM reactions_${database} \
          WHERE postid = $1 AND userid = $2 AND type = $3`,
          [reaction.postid, reaction.userid, reaction.type]
        );
        return {
          message: "Reaction removed successfully",
          data: null,
        };
      }

      // and insert the reaction if it does not yet exists
      const result2 = await queryMultiDB(
        database,
        `INSERT INTO reactions_${database} (postid, userid, type) \
        VALUES ($1, $2, $3) RETURNING reactionid`,
        [reaction.postid, reaction.userid, reaction.type]
      );

      return {
        message: "Reaction uploaded successfully",
        data: result2.rows[0].reactionid,
      };
    },
    "postReaction"
  );
};
