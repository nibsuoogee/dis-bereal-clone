import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express";
import { queryMultiDB } from "../database/db";
import { DatabaseOption, User } from "@types";
import { promiseMapDatabaseOptions } from "@controllers/devController";
import { QueryResult } from "pg";

export const getUsers = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const results = await promiseMapDatabaseOptions<QueryResult>(
        async (db) => {
          return await queryMultiDB(db, `SELECT * FROM users_${db}`, []);
        }
      );

      const users = results.map((result) => result.rows as User[]).flat();

      return {
        message: "Users fetched successfully",
        data: users,
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

      const results = await promiseMapDatabaseOptions<QueryResult>(
        async (db) => {
          return await queryMultiDB(
            db,
            `SELECT * FROM users_${db} WHERE userid = $1`,
            [userid]
          );
        }
      );

      const users = results.map((result) => result.rows as User[]).flat();

      if (users.length === 0) {
        throw new Error("User not found");
      }

      return {
        message: "User fetched successfully",
        data: users[0],
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

      const results = await promiseMapDatabaseOptions<QueryResult>(
        async (db) => {
          return await queryMultiDB(
            db,
            `SELECT userid FROM users_${db} WHERE username = $1 OR email = $2`,
            [username, email]
          );
        }
      );

      const users = results.map((result) => result.rows as User[]).flat();

      if (users.length > 0) {
        throw new Error("Username or email is already in use");
      }

      const query = `INSERT INTO users_${database}
      (username, fullname, email, passwordhash, database) 
      VALUES ($1, $2, $3, $4, $5)`;

      await queryMultiDB(database as DatabaseOption, query, [
        username,
        fullname,
        email,
        passwordhash,
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

      const results = await promiseMapDatabaseOptions<QueryResult>(
        async (db) => {
          return await queryMultiDB(
            db,
            `SELECT * FROM users_${db} WHERE username = $1 AND passwordhash = $2`,
            [username, passwordHash]
          );
        }
      );

      const users = results.map((result) => result.rows as User[]).flat();

      if (users.length == 0) {
        throw new Error("Username or e-mail incorrect");
      }

      /*const row = users[0];

      const user: User = {
        userid: row.userid,
        username: row.username,
        fullname: row.fullname,
        email: row.email,
        passwordhash: row.passwordhash,
        creationdate: row.creationdate,
        database: row.database,
      };*/

      return {
        message: "Login successful",
        data: users[0],
      };
    },
    "addUser"
  );
};
