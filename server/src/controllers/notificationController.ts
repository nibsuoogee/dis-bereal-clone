import { Notification } from "@types";
import { queryMultiDB } from "../database/db";
import { handleControllerRequest } from "./handlers";
import { Request, Response } from "express";
import { promiseMapDatabaseOptions } from "@controllers/devController";
import { QueryResult } from "pg";

export const getUserNotifications = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid } = req.params;

      const results = await promiseMapDatabaseOptions<QueryResult>(
        async (db) => {
          return await queryMultiDB(
            db,
            `SELECT * FROM notifications_${db} \
        WHERE userid = $1 \
        ORDER BY senttimestamp DESC LIMIT 1;`,
            [userid]
          );
        }
      );

      const notifications = results
        .map((result) => result.rows as Notification[])
        .flat();

      return {
        message: "Notifications fetched successfully",
        data: notifications,
      };
    },
    "getUserNotifications"
  );
};
