import { Request, Response } from "express"; // Importing Request and Response types
import { queryDB, queryMultiDB } from "../database/db";
import { initDBQuery } from "../database/sqlQueries";
import { handleControllerRequest } from "@controllers/handlers";
import {
  createAllRegionsAllTablesSQL,
  createPublicationSQL,
  createReplicationSlotsSQL,
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
 * 0) Enable extension for uuid-ossp
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
    // 0)
    await queryMultiDB(
      dbValue,
      "CREATE EXTENSION IF NOT EXISTS 'uuid-ossp'",
      []
    );

    // 1)
    await queryMultiDB(dbValue, allCreateTablesSQL, []);

    // 2)
    const publicationSQL = createPublicationSQL(dbValue);
    await queryMultiDB(dbValue, publicationSQL, []);

    // 3)
    const replicationSlotsSQL = createReplicationSlotsSQL(dbValue);
    await queryMultiDB(dbValue, replicationSlotsSQL, []);
  });

  // Loop through each database connection
  Object.entries(DatabaseOption).map(async ([dbKey, dbValue], index) => {
    // 4)
    const subscribeOtherDatabasesSQL = createSubscriptionSQL(dbValue);
    await queryMultiDB(dbValue, subscribeOtherDatabasesSQL, []);

    // 5)
    await queryMultiDB(dbValue, allViewsSQL, []);
  });

  return { message: "Multi database initialized", data: null };
}

/**
 * 1) Drop all views
 * 2) Drop all subscriptions
 * 3) Drop all replication slots
 * 4) Drop all publications
 * 5) Drop all tables
 */
async function resetMultiDB() {
  // Loop through each database connection
  Object.entries(DatabaseOption).map(async ([dbKey, dbValue], index) => {
    // 2)
    const result = await queryMultiDB(
      dbValue,
      "SELECT subname FROM pg_subscription;",
      []
    );
    console.log("result.rows", result.rows);
    /*
    result.rows.map(async (row) => {
      if (!row.subname.includes(`sub_${dbValue.toLocaleLowerCase()}`)) return;
      const subscriptionName = row.subname;
      const disableSubscriptionSQL = `ALTER SUBSCRIPTION ${subscriptionName} DISABLE;`;
      await queryMultiDB(dbValue, disableSubscriptionSQL, []);

      const slotNoneSubscriptionSQL = `ALTER SUBSCRIPTION ${subscriptionName} SET (slot_name = NONE);`;
      await queryMultiDB(dbValue, slotNoneSubscriptionSQL, []);
    });
    
    result.rows.map(async (row) => {
      console.log("");
      console.log("row.subname", row.subname);
      console.log("sub_${dbValue}: ", `sub_${dbValue.toLocaleLowerCase()}`);

      if (!row.subname.includes(`sub_${dbValue.toLocaleLowerCase()}`)) return;
      console.log("THROUGH %%%%%%%%%%%%");

      const subscriptionName = row.subname;
      const dropSubscriptionSQL = `DROP SUBSCRIPTION ${subscriptionName};`;
      await queryMultiDB(dbValue, dropSubscriptionSQL, []);
    });
    
    // 3)
    const result2 = await queryMultiDB(
      dbValue,
      "SELECT slot_name FROM pg_replication_slots;",
      []
    );
    console.log("result2.rows", result2.rows);
    result2.rows.map(async (row) => {
      const slotName = row.slot_name;
      const dropReplicationSlotSQL = `DROP SUBSCRIPTION IF EXISTS ${slotName};`;
      await queryMultiDB(dbValue, dropReplicationSlotSQL, []);
    });

    // 4)
    const result3 = await queryMultiDB(
      dbValue,
      "SELECT pubname FROM pg_publication;",
      []
    );
    console.log("result3.rows", result3.rows);

    result3.rows.map(async (row) => {
      const publicationName = row.pubname;
      const dropPublicationSQL = `DROP PUBLICATION IF EXISTS ${publicationName};`;
      await queryMultiDB(dbValue, dropPublicationSQL, []);
    });

    // 5)
    const result4 = await queryMultiDB(
      dbValue,
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public';",
      []
    );
    console.log("result4.rows", result4.rows);

    result4.rows.map(async (row) => {
      const tableName = row.tablename;
      const dropTableSQL = `DROP TABLE IF EXISTS ${tableName};`;
      await queryMultiDB(dbValue, dropTableSQL, []);
    });*/
  });

  return { message: "Multi database reset", data: null };
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
        case "reset-multi-database":
          return await resetMultiDB();
        default:
          break;
      }

      return { message: "Invalid key in dev route", data: null, status: 400 };
    },
    "handleDevRequest"
  );
};
