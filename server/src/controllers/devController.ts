import { Request, Response } from "express"; // Importing Request and Response types
import { queryDB, queryMultiDB } from "../database/db";
import { initDBQuery } from "../database/sqlQueries";
import { handleControllerRequest } from "@controllers/handlers";
import {
  createAllRegionsAllTablesSQL,
  createPublicationSQL,
  createReplicationSlotSQL,
  createSubscriptionSQL,
  createViewsSQL,
} from "../database/multiDatabaseSQL";
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
 * 1) Create all region specific tables in all databases
 * 2) Create publications for each region
 * 3) Create replication slots for each region
 * 4) Create subscriptions for each publication in (other) databases
 * 5) Create views that unionize all regional tables in each database
 */
async function initMultiDB() {
  const allCreateTablesSQL = createAllRegionsAllTablesSQL();
  const allViewsSQL = createViewsSQL();

  // Loop through each database connection
  Object.entries(DatabaseOption).map(async ([dbKey, dbValue], index) => {
    if (index !== 0) return;
    // 1)
    //await queryMultiDB(dbValue, allCreateTablesSQL, []);

    // 2)
    const publicationSQL = createPublicationSQL(dbValue);
    //await queryMultiDB(dbValue, publicationSQL, []);
    console.log("PublicationSQL:", publicationSQL);

    // 3)
    const replicationSlotSQL = createReplicationSlotSQL(dbValue);
    //await queryMultiDB(dbValue, replicationSlotSQL, []);
    console.log("replicationSlotSQL:", replicationSlotSQL);

    // 4)
    const subscribeOtherDatabasesSQL = createSubscriptionSQL(dbValue);
    console.log("subscribeOtherDatabasesSQL:", subscribeOtherDatabasesSQL);

    //await queryMultiDB(dbValue, subscribeOtherDatabasesSQL, []);

    // 5)
    //await queryMultiDB(dbValue, allViewsSQL, []);
    console.log("allViewsSQL:", allViewsSQL);
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
