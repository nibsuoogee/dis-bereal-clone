import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express";
import { queryMultiDB } from "../database/db";
import { DatabaseOption, User } from "@types";

export const getUsers = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM users",
        []
      );

      return {
        message: "Users fetched successfully",
        data: result.rows as User[],
      };
    },
    "getUsers"
  );
};

export const getUser = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid } = req.params;

      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM users WHERE userid = $1",
        [userid]
      );

      return {
        message: "User fetched successfully",
        data: result.rows[0] as User,
      };
    },
    "getUser"
  );
};

export const addUser = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { username, fullname, email, passwordhash, database } = req.body;

      const existingUser = await queryMultiDB(
        database as DatabaseOption,
        "SELECT userid FROM users WHERE username = $1 OR email = $2",
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        throw new Error("Username or email is already in use");
      }

      const creationDate = new Date();
      let dbname = `users_${database}`;
      const query = `INSERT INTO ${dbname} (username, fullname, email, passwordhash, creationDate, database) VALUES ($1, $2, $3, $4, $5, $6)`;

      await queryMultiDB(database as DatabaseOption, query, [
        username,
        fullname,
        email,
        passwordhash,
        creationDate,
        database,
      ]);

      return { message: "Registration successful", data: null };
    },
    "addUser"
  );
};

export const login = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { username, passwordHash } = req.body;

      const userResult = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM users WHERE username = $1 AND passwordhash = $2",
        [username, passwordHash]
      );

      if (userResult.rowCount == 0) {
        throw new Error("Username or e-mail incorrect");
      }

      const row = userResult.rows[0];

      const user: User = {
        userid: row.userid,
        username: row.username,
        fullname: row.fullname,
        email: row.email,
        passwordhash: row.passwordHash,
        creationdate: row.creationdate,
        database: row.database,
      };

      return {
        message: "Login successful",
        data: user,
      };
    },
    "addUser"
  );
};
