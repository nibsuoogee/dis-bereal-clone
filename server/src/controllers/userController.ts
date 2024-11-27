import { Request, Response } from "express"; // Importing Request and Response types
import { getErrorMessage } from "../utils/logger";
//const User = require('../models/userModel');

export const getUsers = async (req: Request, res: Response) => {
  try {
    //const users = await User.find();
    const users: string[] = ["an entry"];
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in getUsers():" + getErrorMessage(err) });
  }
};
