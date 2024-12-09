import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express"; // Importing Request and Response types
import { queryDB } from "../database/db";
import { User } from "../../../client/types";

export const getUsers = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const result = await queryDB("SELECT * FROM posts", []);

      return { message: "Users fetched successfully", data: result.rows };
    },
    "getUsers"
  );
};

export const addUser = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { username, fullname, email, passwordHash, continent } = req.body;

      const existingUser = await queryDB(
        "SELECT userid FROM users WHERE username = $1 OR email = $2",
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        throw new Error("Username or email is already in use");
      }

      const creationDate = new Date();

      const userResult = await queryDB(
        "INSERT INTO users (username, fullname, email, passwordHash, photo, creationDate, continent) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [username, fullname, email, passwordHash, null, creationDate, continent]
      );

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

      const userResult = await queryDB(
        "SELECT * FROM users WHERE username = $1 AND passwordHash = $2",
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
        passwordHash: row.passwordHash,
        photo: row.photo,
        creationDate: row.creationdate,
        continent: row.continent,
      };

      return {
        message: "Login successful",
        data: user,
      };
    },
    "addUser"
  );
};
