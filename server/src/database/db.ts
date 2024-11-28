import { getErrorMessage } from "@utils/logger";
import { Pool } from "pg";
import dotenv from "dotenv";

/*export const connectDB = async () => {
  try {
    // await connect to database function

    
    console.log("Database connected");
  } catch (err) {
    reportError({ message: "Error in connectDB():" + getErrorMessage(err) });
    process.exit(1);
  }
};*/

// Load environment variables
dotenv.config();

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

export const query = (text: string, params: any[]) => pool.query(text, params);