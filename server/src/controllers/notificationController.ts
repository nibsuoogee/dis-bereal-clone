import { DatabaseOption, Notification } from "../../types";
import { queryMultiDB } from "../database/db";
import { handleControllerRequest } from "./handlers";
import { Request, Response } from "express";

export const getUserNotifications = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid } = req.params;

      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM notifications \
        WHERE userid = $1 \
        ORDER BY sentTimestamp DESC LIMIT 1;",
        [userid]
      );

      const notifications = result.rows as Notification[];

      return {
        message: "Notifications fetched successfully",
        data: notifications,
      };
    },
    "getUserNotifications"
  );
};
