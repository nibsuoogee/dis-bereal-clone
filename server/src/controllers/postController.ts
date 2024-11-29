import { Request, Response } from "express"; // Importing Request and Response types
import { handleControllerRequest } from "@controllers/handlers";

export const getPosts = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      //const result = await query("SELECT * FROM posts", []);

      return { message: "Posts fetched successfully", data: ["1", "2"] };
    },
    "handleDevRequest"
  );
};
