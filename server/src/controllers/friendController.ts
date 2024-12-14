import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express";
import { queryMultiDB } from "../database/db";
import { DatabaseOption, DBPayload, FriendRequest, User } from "@types";
import { UUIDTypes } from "node_modules/uuid/dist/cjs";

export const getFriends = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid, database } = req.params;

      const results = await queryMultiDB(
        database as DatabaseOption,
        `SELECT * FROM friends_${database} WHERE userid1 = $1 or userid2 = $1
        and friendsincedate IS NOT NULL`,
        [userid]
      );

      // for each result, get the username and fullname of the user that is not userid
      const friendids: UUIDTypes[] = results.rows.map((result) => {
        if (result.userid1 !== userid) {
          return result.userid1;
        } else {
          return result.userid2;
        }
      });

      const results2 = await queryMultiDB(
        database as DatabaseOption,
        `SELECT userid, username, fullname FROM users_${database} WHERE userid IN (${friendids
          .map((id, index) => `$${index + 1}`)
          .join(",")})`,
        friendids
      );

      return {
        message: "Friends fetched successfully",
        data: results2.rows as User[],
      };
    },
    "getFriends"
  );
};

export const addFriend = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const payload = req.body as DBPayload;
      const database = payload.database;
      const friendRequest = payload.obj as FriendRequest;
      const userid1 = friendRequest.userid1;
      const userid2 = friendRequest.userid2;

      // first check if userid2 has already added userid1
      const existingFriendRequest = await queryMultiDB(
        database as DatabaseOption,
        `SELECT * FROM friends_${database} WHERE userid1 = $1 AND userid2 = $2`,
        [userid2, userid1]
      );

      if (existingFriendRequest.rows.length > 0) {
        // Then modify that row, setting friendsincedate to current date
        await queryMultiDB(
          database as DatabaseOption,
          `UPDATE friends_${database} SET friendsincedate = NOW() WHERE userid1 = $1 AND userid2 = $2`,
          [userid2, userid1]
        );

        return {
          message: "Friend added successfully",
          data: null,
        };
      }

      await queryMultiDB(
        database as DatabaseOption,
        `INSERT INTO friends_${database} (userid1, userid2) VALUES ($1, $2)`,
        [userid1, userid2]
      );

      return {
        message: "Friend request sent",
        data: null,
      };
    },
    "addFriend"
  );
};

export const getNonFriends = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid, database } = req.params;

      const query = `
        SELECT u.userid, u.username, u.fullname
        FROM users u
        WHERE u.userid != $1 -- Exclude the current user
          AND u.userid NOT IN (
            SELECT f.userid1 
            FROM friends_${database} f
            WHERE f.userid2 = $1 AND f.friendsincedate IS NOT NULL -- Exclude users who sent accepted requests
            UNION
            SELECT f.userid2
            FROM friends_${database} f
            WHERE f.userid1 = $1 AND f.friendsincedate IS NOT NULL -- Exclude users who received accepted requests
          )
      `;

      const result = await queryMultiDB(database as DatabaseOption, query, [
        userid,
      ]);

      return {
        message: "Non-friends fetched successfully",
        data: result.rows as User[],
      };
    },
    "getNonFriends"
  );
};

export const removeFriend = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { database, userid1, userid2 } = req.params;

      await queryMultiDB(
        database as DatabaseOption,
        `DELETE FROM friends_${database} WHERE (userid1 = $1 AND userid2 = $2) 
        OR (userid1 = $2 AND userid2 = $1)`,
        [userid1, userid2]
      );

      return {
        message: "Friend removed successfully",
        data: null,
      };
    },
    "removeFriend"
  );
};
