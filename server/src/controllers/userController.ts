import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express";
import { queryMultiDB } from "../database/db";
import { DatabaseOption, DBPayload, User } from "@types";
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

      return {
        message: "Login successful",
        data: users[0],
      };
    },
    "login"
  );
};

export const updateUser = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const payload = req.body as DBPayload;
      const database = payload.database;
      const user = payload.obj as User;
      const { userid, username, fullname, email, passwordhash } = user;
      const cleanUsername = username === "" ? null : username;
      const cleanFullname = fullname === "" ? null : fullname;
      const cleanEmail = email === "" ? null : email;
      const cleanPasswordhash = passwordhash === "" ? null : passwordhash;

      const result = await queryMultiDB(
        database,
        `UPDATE users_${database} 
       SET username = COALESCE($2, username),
           fullname = COALESCE($3, fullname),
           email = COALESCE($4, email),
           passwordhash = COALESCE($5, passwordhash)
       WHERE userid = $1 returning *`,
        [userid, cleanUsername, cleanFullname, cleanEmail, cleanPasswordhash]
      );

      if (result.rows.length < 1) {
        throw new Error("No users updated");
      }
      const updatedUser = result.rows[0] as User;

      return { message: "User updated successfully", data: updatedUser };
    },
    "updateUser"
  );
};

export const deleteUser = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid, database } = req.params;

      await queryMultiDB(
        database as DatabaseOption,
        `DELETE FROM users_${database} WHERE userid = $1`,
        [userid]
      );

      return {
        message: "User deleted successfully",
        data: null,
      };
    },
    "deleteUser"
  );
};
