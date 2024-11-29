import { handleControllerRequest } from "@controllers/handlers";
import { Request, Response } from "express"; // Importing Request and Response types

export const getUsers = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      // fetch users logic

      return {
        message: "Users fetched successfully",
        data: ["user1", "user2"],
      };
    },
    "handleDevRequest"
  );
};
