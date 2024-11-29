import { Request, Response } from "express"; // Importing Request and Response types
import { query } from "../database/db";
import { initDBQuery } from "../database/sqlQueries";
import { handleControllerRequest } from "@controllers/handlers";

/**
 * Run queries to create tables and insert sample data based on config settings.
 */
async function initDB() {
  await query(initDBQuery, []);
  //const result = await query(initDBQuery, []);

  return { message: "Database initialized", data: null };
}

export const handleDevRequest = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const command = req.body.command;

      switch (command) {
        case "initialize-database":
          return await initDB();
        default:
          break;
      }

      return { message: "Invalid key in dev route", data: null, status: 400 };
    },
    "handleDevRequest"
  );
};
