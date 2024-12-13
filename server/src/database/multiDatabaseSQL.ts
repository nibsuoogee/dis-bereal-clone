import { configDotenv } from "dotenv";
import { DatabaseOption, TableOptionReplicate, User } from "@types";
import { DB_NAME_PREFIX } from "src/config/constants";

// Load environment variables
configDotenv();

/**
 * Generate the columns text in an SQL create query
 * @param columns The columns of the table
 * @returns A string with everything that comes after "CREATE TABLE x"
 */
function createTableColumns(columns: Record<string, string>): string {
  console.log("columns: ", columns);
  const columnDefinitions = Object.entries(columns)
    .map(([name, definition]) => `${name} ${definition}`)
    .join(",\n");

  return `${columnDefinitions}`;
}

const TableSchemas = {
  users: {
    userid: `UUID PRIMARY KEY DEFAULT uuid_generate_v4()`,
    username: `VARCHAR(255) NOT NULL`,
    fullname: `VARCHAR(255) NOT NULL`,
    email: `VARCHAR(255) NOT NULL`,
    passwordhash: `VARCHAR(255) NOT NULL`,
    photo: `BYTEA`,
    creationdate: `DATE NOT NULL DEFAULT CURRENT_DATE`,
    database: `VARCHAR(50) NOT NULL`,
  },
  friends: {
    userid1: `UUID NOT NULL`,
    userid2: `UUID NOT NULL`,
    friendsincedate: `DATE NOT NULL`,
    " ": `PRIMARY KEY (userid1, userid2),
      FOREIGN KEY (userid1) REFERENCES users (userid) ON DELETE CASCADE,
      FOREIGN KEY (userid2) REFERENCES users (userid) ON DELETE CASCADE`,
  },
  posts: {
    postid: `UUID PRIMARY KEY DEFAULT uuid_generate_v4()`,
    userid: `UUID NOT NULL REFERENCES users ON DELETE CASCADE`,
    video: `BYTEA`,
    islate: `BOOLEAN NOT NULL`,
    timestamp: `TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    locationid: `UUID NOT NULL`,
  },
  locations: {
    locationid: `UUID PRIMARY KEY DEFAULT uuid_generate_v4()`,
    postid: `UUID NOT NULL REFERENCES posts ON DELETE CASCADE`,
    latitude: `DECIMAL(9,6) NOT NULL`,
    longitude: `DECIMAL(9,6) NOT NULL`,
  },
  comments: {
    commentid: `UUID PRIMARY KEY DEFAULT uuid_generate_v4()`,
    postid: `UUID NOT NULL REFERENCES posts ON DELETE CASCADE`,
    userid: `UUID NOT NULL REFERENCES users ON DELETE CASCADE`,
    text: `TEXT NOT NULL`,
    timestamp: `TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
  },
  reactions: {
    reactionid: `UUID PRIMARY KEY DEFAULT uuid_generate_v4()`,
    postid: `UUID NOT NULL REFERENCES posts ON DELETE CASCADE`,
    userid: `UUID NOT NULL REFERENCES users ON DELETE CASCADE`,
    type: `VARCHAR(50) NOT NULL`,
    timestamp: `TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
  },
  notifications: {
    notificationid: `UUID PRIMARY KEY DEFAULT uuid_generate_v4()`,
    userid: `UUID NOT NULL REFERENCES users ON DELETE CASCADE`,
    senttimestamp: `TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    wasdismissed: `BOOLEAN NOT NULL`,
  },
};

/**
 * Generates the SQL for creating any regional table
 * @param tableName
 * @param regionAbbreviation e.g. uk
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
 * @param regionAbbreviation e.g. uk
 * @returns All SQL commands for creating regional tables for a specific region
 */
export function createAllRegionalTablesSQL(
  regionAbbreviation: string,
  tableOptions: Record<string, string>
) {
  console.log("tableOptions: ", tableOptions);
  const createCommands = Object.entries(tableOptions).map(
    ([tableKey, tableValue]) => {
      const fields = createTableColumns(
        TableSchemas[tableKey as keyof typeof TableSchemas]
      );
      return createRegionalTableSQL(tableValue, regionAbbreviation, fields);
    }
  );
  return createCommands.join("\n");
}

/**
 * Create tables in all databases which should be replicated
 * @returns All SQL commands for creating regional tables for all regions
 */
export function createAllRegionsAllTablesSQL(
  tableOptions: Record<string, string>
) {
  const allRegionsAllRegionalTables = Object.entries(DatabaseOption).map(
    ([dbKey, dbValue]) => {
      return createAllRegionalTablesSQL(dbValue, tableOptions);
    }
  );
  return allRegionsAllRegionalTables.join("\n");
}

export function createPublicationSQL(name: string) {
  const tables = Object.entries(TableOptionReplicate).map(
    ([tableKey, tableValue]) => {
      return `${tableValue}_${name}`;
    }
  );
  const tablesString = tables.join(", ");
  return `CREATE PUBLICATION pub_${name} FOR TABLE ${tablesString};`;
}

export function createReplicationSlotsSQL(name: string) {
  const allReplicationSlots = Object.entries(DatabaseOption)
    .map(([dbKey, dbValue]) => {
      // Don't create a subscription for the same database
      if (name === dbValue) return null;
      return `SELECT pg_create_logical_replication_slot('sub_${name.toLocaleLowerCase()}_slot_for_${dbValue.toLocaleLowerCase()}', 'pgoutput');`;
    })
    .filter(Boolean);
  return allReplicationSlots.join("\n");
}

export function createSubscriptionSQL(name: string) {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = parseInt(process.env.DB_PORT ?? "5432");

  const allSubscriptions = Object.entries(DatabaseOption)
    .map(([dbKey, dbValue]) => {
      // Don't create a subscription for the same database
      if (name === dbValue) return null;
      return `CREATE SUBSCRIPTION sub_${dbValue}_from_${name} \
  CONNECTION 'host=${host} port=${port} dbname=${DB_NAME_PREFIX}${dbValue} user=${user} password=${password}' \
  PUBLICATION pub_${dbValue} WITH (slot_name = 'sub_${dbValue.toLocaleLowerCase()}_slot_for_${name.toLocaleLowerCase()}', create_slot = false);`;
    })
    .filter(Boolean);
  return allSubscriptions.join("\n");
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
  const tablesViews = Object.entries(TableOptionReplicate).map(
    ([tableKey, tableValue]) => {
      return createTableViewSQL(tableValue);
    }
  );
  return tablesViews.join("\n");
}

export function insertUserSQL(user: User) {
  const { username, fullname, email, passwordhash, database } = user;
  return `INSERT INTO users_${database} (username, fullname, email, passwordhash, database) VALUES \
     ('${username}', '${fullname}', '${email}', '${passwordhash}', '${database}');`;
}
