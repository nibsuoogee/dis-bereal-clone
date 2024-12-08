import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express"; // Importing Request and Response types
import { queryDB } from "../database/db";

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
      console.log(username, passwordHash);

      const userResult = await queryDB(
        "SELECT userid FROM users WHERE username = $1 AND passwordHash = $2 RETURNING username",
        [username, passwordHash]
      );

      return {
        message: "Registration successful",
        data: userResult.rows[0].username,
      };
    },
    "addUser"
  );
};
