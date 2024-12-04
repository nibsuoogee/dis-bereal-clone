import { configDotenv } from "dotenv";
import { DatabaseOption, TableOption } from "../../../shared/types";
import { DB_NAME_PREFIX } from "src/config/constants";

// Load environment variables
configDotenv();

/**
 * Generate the columns text in an SQL create query
 * @param columns The columns of the table
 * @returns A string with everything that comes after "CREATE TABLE x"
 */
function createTableColumns(columns: Record<string, string>): string {
  const columnDefinitions = Object.entries(columns)
    .map(([name, definition]) => `${name} ${definition}`)
    .join(",\n");

  return `${columnDefinitions}`;
}

const TableSchemas = {
  Users: {
    userid: "SERIAL PRIMARY KEY",
    username: "VARCHAR(255) NOT NULL",
    fullname: "VARCHAR(255) NOT NULL",
    email: "VARCHAR(255) NOT NULL",
    passwordHash: "VARCHAR(255) NOT NULL",
    photo: "BYTEA",
    creationDate: "DATE NOT NULL",
    continent: "VARCHAR(255) NOT NULL",
  },
  Friends: {
    userid1: "INTEGER NOT NULL",
    userid2: "INTEGER NOT NULL",
    friendSinceDate: "DATE NOT NULL",
  },
  Posts: {
    postid: "SERIAL PRIMARY KEY",
    userid: "INTEGER NOT NULL",
    video: "BYTEA",
    isLate: "BOOLEAN NOT NULL",
    timestamp: "TIMESTAMP NOT NULL",
    locationid: "INTEGER NOT NULL",
  },
  Locations: {
    locationid: "SERIAL PRIMARY KEY",
    latitude: "DECIMAL(9,6) NOT NULL",
    longitude: "DECIMAL(9,6) NOT NULL",
  },
  Comments: {
    commentid: "SERIAL PRIMARY KEY",
    postid: "INTEGER NOT NULL",
    userid: "INTEGER NOT NULL",
    text: "TEXT NOT NULL",
    timestamp: "TIMESTAMP NOT NULL",
  },
  Reactions: {
    reactionid: "SERIAL PRIMARY KEY",
    postid: "INTEGER NOT NULL",
    userid: "INTEGER NOT NULL",
    type: "VARCHAR(50) NOT NULL",
    timestamp: "TIMESTAMP NOT NULL",
  },
  Notifications: {
    notificationid: "SERIAL PRIMARY KEY",
    userid: "INTEGER NOT NULL",
    sentTimestamp: "TIMESTAMP NOT NULL",
    wasDismissed: "BOOLEAN NOT NULL",
  },
};

/**
 * Generates the SQL for creating any regional table
 * @param tableName
 * @param regionAbbreviation e.g. UK
 * @param fields Everything that comes after "CREATE TABLE x"
 * @returns A complete SQL command for creating a table
 */
function createRegionalTableSQL(
  tableName: string,
  regionAbbreviation: string,
  fields: string
) {
  const name = `${tableName}_${regionAbbreviation}`;
  return `CREATE TABLE ${name}(\n${fields}\n);`;
}

/**
 * Generates the SQL for creating all regional tables
 * @param regionAbbreviation e.g. UK
 * @returns All SQL commands for creating regional tables for a specific region
 */
function createAllRegionalTablesSQL(regionAbbreviation: string) {
  const createCommands = Object.entries(TableOption).map(
    ([tableKey, tableValue]) => {
      const fields = createTableColumns(
        TableSchemas[tableKey as keyof typeof TableSchemas]
      );
      return createRegionalTableSQL(tableValue, regionAbbreviation, fields);
    }
  );
  return createCommands.join("\n");
}

export function createAllRegionsAllTablesSQL() {
  const allRegionsAllRegionalTables = Object.entries(DatabaseOption).map(
    ([dbKey, dbValue]) => {
      return createAllRegionalTablesSQL(dbValue);
    }
  );
  return allRegionsAllRegionalTables.join("\n");
}

export function createPublicationSQL(name: string) {
  const tables = Object.entries(TableOption).map(([tableKey, tableValue]) => {
    return `${tableValue}_${name}`;
  });
  const tablesString = tables.join(", ");
  return `CREATE PUBLICATION pub_${name} FOR TABLE ${tablesString};`;
}

export function createReplicationSlotSQL(name: string) {
  return `SELECT pg_create_logical_replication_slot('sub_${name.toLocaleLowerCase()}_slot', 'pgoutput');`;
}

export function createSubscriptionSQL(name: string) {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = parseInt(process.env.DB_PORT ?? "5432");

  return `CREATE SUBSCRIPTION sub_${name} \
  CONNECTION 'host=${host} port=${port} dbname=${DB_NAME_PREFIX}${name} user=${user} password=${password}' \
  PUBLICATION pub_global WITH (slot_name = 'sub_${name.toLocaleLowerCase()}_slot', create_slot = false);`;
}

export function createTableViewSQL(tableName: string) {
  const allSelects = Object.entries(DatabaseOption).map(([dbKey, dbValue]) => {
    return `SELECT * FROM ${tableName}_${dbValue}`;
  });
  const allUnionsString = allSelects.join("\n UNION ALL\n");
  return `CREATE VIEW ${tableName} AS \
  ${allUnionsString};`;
}

export function createViewsSQL() {
  const tablesViews = Object.entries(TableOption).map(
    ([tableKey, tableValue]) => {
      return createTableViewSQL(tableValue);
    }
  );
  return tablesViews.join("\n");
}
