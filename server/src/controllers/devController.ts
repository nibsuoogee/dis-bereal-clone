import { Request, Response } from "express";
import { queryDB, queryMultiDB } from "../database/db";
import { initDBQuery } from "../database/sqlQueries";
import { handleControllerRequest } from "@controllers/handlers";
import {
  createAllRegionsAllTablesSQL,
  createPublicationSQL,
  createReplicationSlotsSQL,
  createSubscriptionSQL,
  createViewsSQL,
  insertUserSQL,
} from "../database/multiDatabaseSQL";
import { DatabaseOption, User } from "@types";
import sampleUsers from "../config/sampleData";
import { UUIDTypes } from "uuid";

/**
 * Run queries to create tables and insert sample data based on config settings.
 */
async function initDB() {
  await queryDB(initDBQuery, []);
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
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
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
 * Add sample data users to all databases.
 */
async function populateMultiDB() {
  const users: User[] = sampleUsers as any[];
  users.map(async (user) => {
    const insertSQL = insertUserSQL(user);
    await queryMultiDB(user.database as DatabaseOption, insertSQL, []);
  });

  return { message: "Multi database populated", data: null };
}

/**
 * 1) Drop all views
 * 2) Drop all subscriptions
 * 3) Drop all publications
 * 4) Drop all replication slots
 * 5) Drop all tables
 */
async function resetMultiDB() {
  // Loop through each database connection
  Object.entries(DatabaseOption).map(async ([dbKey, dbValue], index) => {
    // 1)
    const resultViews = await queryMultiDB(
      dbValue,
      "SELECT viewname FROM pg_views WHERE schemaname = 'public';",
      []
    );
    resultViews.rows.map(async (row) => {
      const viewName = row.viewname;
      const dropViewSQL = `DROP VIEW ${viewName};`;
      await queryMultiDB(dbValue, dropViewSQL, []);
    });

    // 2)
    const resultSubscriptions = await queryMultiDB(
      dbValue,
      "SELECT subname FROM pg_subscription;",
      []
    );
    resultSubscriptions.rows.map(async (row) => {
      if (!row.subname.includes(`from_${dbValue}`)) return;

      // Disable subscription first
      const disableSubscriptionSQL = `ALTER SUBSCRIPTION ${row.subname} DISABLE;`;
      await queryMultiDB(dbValue, disableSubscriptionSQL, []);

      // Then alter subscription slot
      const alterSubscriptionSQL = `ALTER SUBSCRIPTION ${row.subname} set (slot_name=none);`;
      await queryMultiDB(dbValue, alterSubscriptionSQL, []);

      console.log("row.subname", row.subname);
      console.log("dbValue", dbValue);
      console.log(" ");
      // Finally drop the subscription
      const subscriptionName = row.subname;
      const dropSubscriptionSQL = `DROP SUBSCRIPTION ${subscriptionName};`;
      await queryMultiDB(dbValue, dropSubscriptionSQL, []);
    });

    // 3)
    const resultPublications = await queryMultiDB(
      dbValue,
      "SELECT pubname FROM pg_publication;",
      []
    );
    resultPublications.rows.map(async (row) => {
      const publicationName = row.pubname;
      const dropSubscriptionSQL = `DROP PUBLICATION ${publicationName};`;
      await queryMultiDB(dbValue, dropSubscriptionSQL, []);
    });

    // 4)
    const resultSlots = await queryMultiDB(
      dbValue,
      "SELECT slot_name, active_pid  FROM pg_replication_slots;",
      []
    );
    resultSlots.rows.map(async (row) => {
      if (!row.slot_name.includes(`for_${dbValue}`)) return;
      console.log("row.slot_name: ", row.slot_name);
      console.log("row.active_pid: ", row.active_pid);
      // First terminate the active wal sender using the pid
      const dropSlotSQL = `SELECT pg_terminate_backend(${row.active_pid});`;
      await queryMultiDB(dbValue, dropSlotSQL, []);
    });
    resultSlots.rows.map(async (row) => {
      if (!row.slot_name.includes(`for_${dbValue}`)) return;
      // Then drop the replication slot
      const dropSlotSQL = `SELECT pg_drop_replication_slot('${row.slot_name}');`;
      await queryMultiDB(dbValue, dropSlotSQL, []);
    });

    // 5)
    const resultTables = await queryMultiDB(
      dbValue,
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public';",
      []
    );
    resultTables.rows.map(async (row) => {
      const tableName = row.tablename;
      const dropTableSQL = `DROP TABLE ${tableName} CASCADE;`;
      await queryMultiDB(dbValue, dropTableSQL, []);
    });
  });

  return { message: "Multi database reset", data: null };
}

async function requestNotification(userid: UUIDTypes | null) {
  await queryMultiDB(
    "za" as DatabaseOption,
    `INSERT INTO notifications_za (userid, wasdismissed) \
    VALUES ($1, $2) RETURNING notificationid`,
    [userid, false]
  );
  return { message: "Notification requested", data: null };
}

export const handleDevRequest = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { command, userid } = req.body;

      switch (command) {
        case "initialize-database":
          return await initDB();
        case "initialize-multi-database":
          return await initMultiDB();
        case "populate-multi-database":
          return await populateMultiDB();
        case "reset-multi-database":
          return await resetMultiDB();
        case "request-notification":
          return await requestNotification(userid);
        default:
          break;
      }

      return { message: "Invalid key in dev route", data: null, status: 400 };
    },
    "handleDevRequest"
  );
};
