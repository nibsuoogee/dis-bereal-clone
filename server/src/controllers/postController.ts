import { Request, Response } from "express"; // Importing Request and Response types
import { getErrorMessage, reportError } from "../utils/logger";
//const User = require('../models/userModel');
import { query } from "../database/db";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM posts", []); // Query the "posts" table

    res.status(200).json(result.rows);
  } catch (err) {
    const errorMessage = "Error in getPosts():" + getErrorMessage(err);
    reportError({
      message: errorMessage,
    });
    res
      .status(500)
      .json({ message: "Error in getPosts():" + getErrorMessage(err) });
  }
};
