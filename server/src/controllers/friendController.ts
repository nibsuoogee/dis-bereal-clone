import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express";
import { queryMultiDB } from "../database/db";
import { DatabaseOption, DBPayload, Friend, FriendRequest, User } from "@types";
import { UUIDTypes } from "node_modules/uuid/dist/cjs";
import { promiseMapDatabaseOptions } from "@controllers/devController";

export const getFriends = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid } = req.params;

      const results = await promiseMapDatabaseOptions(async (db) => {
        return await queryMultiDB(
          db,
          `SELECT * FROM friends_${db} WHERE (userid1 = $1) 
          OR (userid2 = $1)
          and friendsincedate IS NOT NULL`,
          [userid]
        );
      });

      const friendRows = results
        .map((result) => result.rows as Friend[])
        .flat();

      // for each result, get the user that is not userid
      const friendids: UUIDTypes[] = friendRows.map((friendRow) => {
        if (friendRow.userid1 !== userid) {
          return friendRow.userid1;
        } else {
          return friendRow.userid2;
        }
      });

      if (friendids.length === 0) {
        return {
          message: "No friends found",
          data: [],
        };
      }

      const results2 = await promiseMapDatabaseOptions(async (db) => {
        return await queryMultiDB(
          db,
          `SELECT userid, username, fullname, database FROM users_${db} WHERE userid IN (${friendids
            .map((id, index) => `$${index + 1}`)
            .join(",")})`,
          friendids
        );
      });

      const users = results2.map((result) => result.rows as User[]).flat();

      return {
        message: "Friends fetched successfully",
        data: users,
      };
    },
    "getFriends"
  );
};

/**
 * Add a friend.
 * 1) Check from all databases if the userid1 and userid2 have a common row in the friends table.
 *  2) If there are no common rows, then add a new row without the current date
 *     in the database of the initiatorid.
 *  3) else if the userid1 is initiatorid, then return = duplicate request.
 *  4) else if the userid2 is initiatorid, then add the current date to the row
 *     in the same database where the row was read from = new friendship.
 */
export const addFriend = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const payload = req.body as DBPayload;
      const database = payload.database;
      const friendRequest = payload.obj as FriendRequest;
      const initiatorid = friendRequest.userid1;
      const counterpartid = friendRequest.userid2;

      // 1)
      const results = await promiseMapDatabaseOptions(async (db) => {
        const result = await queryMultiDB(
          db,
          `SELECT * FROM friends_${db} WHERE (userid1 = $1 AND userid2 = $2) 
          OR (userid1 = $2 AND userid2 = $1)`,
          [counterpartid, initiatorid]
        );
        const resultWithDB = result.rows.map((row) => ({
          row: row as Friend,
          database: db,
        }));
        return resultWithDB;
      });

      const friendRows = results.flat();

      // 2)
      if (friendRows.length === 0) {
        await queryMultiDB(
          database as DatabaseOption,
          `INSERT INTO friends_${database} (userid1, userid2) VALUES ($1, $2)`,
          [initiatorid, counterpartid]
        );

        return {
          message: "Friend request sent",
          data: null,
        };
      }

      // 3)
      if (friendRows[0].row.userid1 === initiatorid) {
        return {
          message: "Friend request already sent",
          data: null,
        };
      }

      // 4)
      if (friendRows[0].row.userid2 === initiatorid) {
        await queryMultiDB(
          friendRows[0].database,
          `UPDATE friends_${friendRows[0].database} SET friendsincedate = NOW() 
          WHERE userid1 = $1 AND userid2 = $2`,
          [counterpartid, initiatorid]
        );

        return {
          message: "Friend added successfully",
          data: null,
        };
      }

      return {
        message: "addFriend: How did you get here?",
        data: null,
      };
    },
    "addFriend"
  );
};

/**
 * Get all users that are not friends, and have not been sent a friend request
 * by the current user.
 *
 * 0) Get all users except the current user.
 *
 * Gather en exclusion list:
 * 1) Get rows containing the userid of the current user as userid1 or userid2.
 * 2) If no friend rows with userid as userid1 or userid2, return all users.
 * 3) Filter users that are friends of the current user (friendsince date is not null).
 * 4) If userid1 is the current user, then filter userid2 from users (friend
 *    request sent already).
 */
export const getNonFriends = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid } = req.params;

      // 0)
      const userResults = await promiseMapDatabaseOptions(async (db) => {
        return await queryMultiDB(
          db,
          `SELECT userid, username, fullname, database FROM users_${db}
          WHERE userid != $1`,
          [userid]
        );
      });

      const users = userResults.map((result) => result.rows as User[]).flat();

      // 1)
      const results = await promiseMapDatabaseOptions(async (db) => {
        return await queryMultiDB(
          db,
          `SELECT * FROM friends_${db} WHERE (userid1 = $1) 
          OR (userid2 = $1)`,
          [userid]
        );
      });

      const friendRows = results
        .map((result) => result.rows as Friend[])
        .flat();

      // 2)
      if (friendRows.length === 0) {
        return {
          message: "Non-friends fetched successfully",
          data: users,
        };
      }

      // 3)
      const users2 = users.filter((user) => {
        return !friendRows.some((friend) => {
          return (
            friend.userid1 === user.userid && friend.friendsincedate !== null
          );
        });
      });

      // 4)
      const users3 = users2.filter((user) => {
        return !friendRows.some((friend) => {
          return friend.userid2 === user.userid;
        });
      });

      return {
        message: "Non-friends fetched successfully",
        data: users3,
      };
    },
    "getNonFriends"
  );
};

export const removeFriend = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid1, userid2 } = req.params;

      await promiseMapDatabaseOptions(async (db) => {
        return await queryMultiDB(
          db,
          `DELETE FROM friends_${db} 
          WHERE (userid1 = $1 AND userid2 = $2) 
          OR (userid1 = $2 AND userid2 = $1)`,
          [userid1, userid2]
        );
      });

      return {
        message: "Friend removed successfully",
        data: null,
      };
    },
    "removeFriend"
  );
};
