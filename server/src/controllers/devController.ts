import { Request, Response } from "express";
import { queryMultiDB } from "../database/db";
import { handleControllerRequest } from "@controllers/handlers";
import {
  createAllRegionalTablesSQL,
  createAllRegionsAllTablesSQL,
  createPublicationSQL,
  createReplicationSlotsSQL,
  createSubscriptionSQL,
  createViewsSQL,
  insertUserSQL,
} from "../database/multiDatabaseSQL";
import { DatabaseOption, TableOptionNoReplicate, User } from "@types";
import sampleUsers from "../config/sampleData";
import { UUIDTypes } from "uuid";

/**
 * Perform an operation on each database, waiting for all to finish.
 * @param operations The function to be called on each database
 */
export async function promiseMapDatabaseOptions<T>(
  operations: (db: DatabaseOption) => Promise<T>
) {
  const results = await Promise.all(
    Object.entries(DatabaseOption).map(async ([dbKey, dbValue]) => {
      return await operations(dbValue);
    })
  );
  return results;
}

/**
 * Initialize all databases.
 * 0) Enable extension for uuid-ossp
 * 1) Create all region specific tables in all databases
 * 2) Create publications for each region
 * 3) Create replication slots for each region
 * 4) Create subscriptions to every other database
 * 5) Create views that unionize all regional tables in each database
 * Each step is in a separate loop to reduce chance of error.
 */
async function initMultiDB() {
  const regionalReplicatedTables = createAllRegionsAllTablesSQL();
  const allViewsSQL = createViewsSQL();

  // 0)
  await promiseMapDatabaseOptions(async (db) => {
    await queryMultiDB(db, `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`, []);
  });

  // 1)
  await promiseMapDatabaseOptions(async (db) => {
    const regionalTables = createAllRegionalTablesSQL(
      db,
      TableOptionNoReplicate
    );
    await queryMultiDB(db, regionalTables, []);
    await queryMultiDB(db, regionalReplicatedTables, []);
  });

  // 2)
  await promiseMapDatabaseOptions(async (db) => {
    const publicationSQL = createPublicationSQL(db);
    await queryMultiDB(db, publicationSQL, []);
  });

  // 3)
  await promiseMapDatabaseOptions(async (db) => {
    const replicationSlotsSQL = createReplicationSlotsSQL(db);
    await queryMultiDB(db, replicationSlotsSQL, []);
  });

  // 4)
  await promiseMapDatabaseOptions(async (db) => {
    const subscribeOtherDatabasesSQL = createSubscriptionSQL(db);
    await queryMultiDB(db, subscribeOtherDatabasesSQL, []);
  });

  // 5)
  await promiseMapDatabaseOptions(async (db) => {
    await queryMultiDB(db, allViewsSQL, []);
  });

  return { message: "Multi database initialized", data: null };
}

/**
 * Reset all databases.
 * 1) Drop all views
 * 2) Drop all subscriptions
 * 3) Drop all publications
 * 4) Drop all replication slots
 * 5) Drop all tables
 * Each step in a separate loop to reduce chance of error.
 */
async function resetMultiDB() {
  // 1)
  await promiseMapDatabaseOptions(async (db) => {
    const resultViews = await queryMultiDB(
      db,
      "SELECT viewname FROM pg_views WHERE schemaname = 'public';",
      []
    );
    resultViews.rows.map(async (row) => {
      const viewName = row.viewname;
      const dropViewSQL = `DROP VIEW ${viewName};`;
      await queryMultiDB(db, dropViewSQL, []);
    });
  });

  // 2)
  await promiseMapDatabaseOptions(async (db) => {
    const resultSubscriptions = await queryMultiDB(
      db,
      "SELECT subname FROM pg_subscription;",
      []
    );
    resultSubscriptions.rows.map(async (row) => {
      if (!row.subname.includes(`from_${db}`)) return;

      // Disable subscription first
      const disableSubscriptionSQL = `ALTER SUBSCRIPTION ${row.subname} DISABLE;`;
      await queryMultiDB(db, disableSubscriptionSQL, []);

      // Then alter subscription slot
      const alterSubscriptionSQL = `ALTER SUBSCRIPTION ${row.subname} set (slot_name=none);`;
      await queryMultiDB(db, alterSubscriptionSQL, []);

      // Finally drop the subscription
      const subscriptionName = row.subname;
      const dropSubscriptionSQL = `DROP SUBSCRIPTION ${subscriptionName};`;
      await queryMultiDB(db, dropSubscriptionSQL, []);
    });
  });

  // 3)
  await promiseMapDatabaseOptions(async (db) => {
    const resultPublications = await queryMultiDB(
      db,
      "SELECT pubname FROM pg_publication;",
      []
    );
    resultPublications.rows.map(async (row) => {
      const publicationName = row.pubname;
      const dropSubscriptionSQL = `DROP PUBLICATION ${publicationName};`;
      await queryMultiDB(db, dropSubscriptionSQL, []);
    });
  });

  // 4)
  await promiseMapDatabaseOptions(async (db) => {
    const resultSlots = await queryMultiDB(
      db,
      "SELECT slot_name, active_pid FROM pg_replication_slots;",
      []
    );

    // First terminate the active WAL sender using the pid
    resultSlots.rows.map(async (row) => {
      if (!row.slot_name.includes(`for_${db}`)) return;
      const dropSlotSQL = `SELECT pg_terminate_backend(${row.active_pid});`;
      await queryMultiDB(db, dropSlotSQL, []);
    });

    // Then drop the replication slot
    resultSlots.rows.map(async (row) => {
      if (!row.slot_name.includes(`for_${db}`)) return;
      const dropSlotSQL = `SELECT pg_drop_replication_slot('${row.slot_name}');`;
      await queryMultiDB(db, dropSlotSQL, []);
    });
  });

  // 5)
  await promiseMapDatabaseOptions(async (db) => {
    const resultTables = await queryMultiDB(
      db,
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public';",
      []
    );
    resultTables.rows.map(async (row) => {
      const tableName = row.tablename;
      const dropTableSQL = `DROP TABLE ${tableName} CASCADE;`;
      await queryMultiDB(db, dropTableSQL, []);
    });
  });

  return { message: "Multi database reset", data: null };
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
