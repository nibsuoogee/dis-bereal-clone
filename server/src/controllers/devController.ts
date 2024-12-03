import { Request, Response } from "express"; // Importing Request and Response types
import { queryDB, queryMultiDB } from "../database/db";
import { initDBQuery } from "../database/sqlQueries";
import { handleControllerRequest } from "@controllers/handlers";
import { createAllRegionsAllTablesSQL } from "../database/multiDatabaseSQL";
import { DatabaseOption } from "../../../shared/types";

/**
 * Run queries to create tables and insert sample data based on config settings.
 */
async function initDB() {
  await queryDB(initDBQuery, []);

  // TODO: Add query to insert sample data

  return { message: "Database initialized", data: null };
}

/**
 * For each database in DatabaseOption:
 * - For each table in TableOption:
 *     -
 */
async function initMultiDB() {
  const allCreateTablesSQL = createAllRegionsAllTablesSQL();

  // Loop through each database connection
  Object.entries(DatabaseOption).map(async ([dbKey, dbValue]) => {
    await queryMultiDB(dbValue, allCreateTablesSQL, []);
  });

  return { message: "Multi database initialized", data: null };
}

export const handleDevRequest = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const command = req.body.command;

      switch (command) {
        case "initialize-database":
          return await initDB();
        case "initialize-multi-database":
          return await initMultiDB();
        default:
          break;
      }

      return { message: "Invalid key in dev route", data: null, status: 400 };
    },
    "handleDevRequest"
  );
};
