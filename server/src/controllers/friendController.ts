import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express";
import { queryMultiDB } from "../database/db";
import { DatabaseOption, User } from "@types";

export const addFriend = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      let userid1 = req.body.userid1;
      let userid2 = req.body.userid2;
      let database = req.body.database;

      let dbname = `friends_${database}`;
      const query = `INSERT INTO ${dbname} (userid1, userid2) VALUES ($1, $2)`;

      await queryMultiDB(database as DatabaseOption, query, [userid1, userid2]);

      return {
        message: "Friend added successfully",
        data: null,
      };
    },
    "addFriend"
  );
};

export const getFriends = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      let user = req.body;

      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM Friends WHERE userid1 = $1 and friendsincedate IS NOT NULL",
        [user]
      );

      return {
        message: "Friends fetched successfully",
        data: result.rows as User[],
      };
    },
    "getFriends"
  );
};

export const getNonFriends = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      console.log(req.body);
      const userid = req.body.userid; // current user to fetch users they have not yet added
      const database = req.body.database;

      const query = `
        SELECT u.userid, u.username 
        FROM Users u
        WHERE u.userid != $1 -- Exclude the current user
          AND u.userid NOT IN (
            SELECT f.userid1 
            FROM Friends_${database} f
            WHERE f.userid2 = $1 AND f.friendsincedate IS NOT NULL -- Exclude users who sent accepted requests
            UNION
            SELECT f.userid2
            FROM Friends_${database} f
            WHERE f.userid1 = $1 AND f.friendsincedate IS NOT NULL -- Exclude users who received accepted requests
          )
      `;

      const result = await queryMultiDB(database as DatabaseOption, query, [
        userid,
      ]);

      console.log("non friends server", result.rows);

      return {
        message: "Non-friends fetched successfully",
        data: result.rows as User[],
      };
    },
    "getNonFriends"
  );
};
