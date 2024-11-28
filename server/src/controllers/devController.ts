import { Request, Response } from "express"; // Importing Request and Response types
import { getErrorMessage, reportError } from "../utils/logger";
//const User = require('../models/userModel');
import { query } from "../database/db";
import { initDBQuery } from "../database/sqlQueries";

/**
 * Run queries to create tables and insert sample data based on config settings.
 */
export const initDB = async (req: Request, res: Response) => {
  try {
    await query(initDBQuery, []);
    //const result = await query(initDBQuery, []);

    res.status(200).json({ message: "success", data: [] });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in initDB():" + getErrorMessage(err) });
  }
};
