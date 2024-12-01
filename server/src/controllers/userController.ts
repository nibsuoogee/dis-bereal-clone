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
