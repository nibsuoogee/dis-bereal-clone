import { Pool } from "pg";
import dotenv from "dotenv";
import { DatabaseOption } from "../../../shared/types";
import { DB_NAME_PREFIX } from "../config/constants";

// Load environment variables
dotenv.config();

// Define the pool configuration object with common details (same for all DBs)
const poolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5432"),
};

// Create a pool for each database
// Generate the pool connections dynamically
const pools: { [key in DatabaseOption]: Pool } = Object.keys(
  DatabaseOption
).reduce((acc, key) => {
  const dbName = DatabaseOption[key as keyof typeof DatabaseOption];
  acc[dbName] = new Pool({
    ...poolConfig,
    database: DB_NAME_PREFIX + dbName,
  });
  return acc;
}, {} as { [key in DatabaseOption]: Pool });

// Log when a connection is made to a specific database
Object.values(DatabaseOption).forEach((dbName: DatabaseOption) => {
  pools[dbName].on("connect", () => {
    console.log(`Connected to the ${dbName} database.`);
  });
});

// Function to query a specific database
export const queryMultiDB = (
  dbName: DatabaseOption,
  text: string,
  params: any[]
) => {
  if (!pools[dbName]) {
    throw new Error(`No connection pool found for database: ${dbName}`);
  }

  return pools[dbName].query(text, params);
};

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5432"),
  database: process.env.DB_NAME,
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database.");
});

export const queryDB = (text: string, params: any[]) =>
  pool.query(text, params);
