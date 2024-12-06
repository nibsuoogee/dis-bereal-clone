import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express"; // Importing Request and Response types
import { queryDB, queryMultiDB } from "../database/db";
import { DatabaseOption } from "../../types";

export const getUsers = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM users",
        []
      );

      return { message: "Users fetched successfully", data: result.rows };
    },
    "getUsers"
  );
};
