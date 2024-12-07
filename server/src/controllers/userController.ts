import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express";
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

      return { message: "User fetched successfully", data: result.rows[0] };
    },
    "getUser"
  );
};
