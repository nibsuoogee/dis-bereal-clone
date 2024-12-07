import { Request, Response } from "express"; // Importing Request and Response types
import { handleControllerRequest } from "@controllers/handlers";
import { queryMultiDB } from "src/database/db";
import {
  DatabaseOption,
  DBPayload,
  Reaction,
  ReactionCounts,
  ReactionOption,
} from "../../types";

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

export const postReaction = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const payload = req.body as DBPayload;
      const reaction = payload.obj as Reaction;
      const database = payload.database;

      const result = await queryMultiDB(
        database,
        `INSERT INTO reactions_${database} (postid, userid, type) \
         VALUES ($1, $2, $3) RETURNING reactionid`,
        [reaction.postid, reaction.userid, reaction.type]
      );

      return {
        message: "Reaction uploaded successfully",
        data: "",
      };
    },
    "postReaction"
  );
};

export const deleteReaction = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { postid } = req.params;

      return {
        message: "Post deleted successfully",
        data: null,
      };
    },
    "deleteReaction"
  );
};
