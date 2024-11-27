import { Request, Response } from "express"; // Importing Request and Response types
import { getErrorMessage } from "../utils/logger";
//const User = require('../models/userModel');

export const getPosts = async (req: Request, res: Response) => {
  try {
    //const users = await User.find();
    const posts: string[] = ["a post", "another post"];
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in getPosts():" + getErrorMessage(err) });
  }
};
