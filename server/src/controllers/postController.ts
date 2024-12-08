import { Request, Response } from "express";
import { handleControllerRequest } from "@controllers/handlers";
import { queryMultiDB } from "src/database/db";
import { getErrorMessage, reportError } from "@utils/logger";
import { DatabaseOption, DBPayload, Notification, Post } from "@types";

export const getPosts = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM posts",
        []
      );

      return { message: "Posts fetched successfully", data: result.rows };
    },
    "getPosts"
  );
};

export const getUserPosts = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { userid } = req.params;

      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT * FROM posts WHERE userid = $1",
        [userid]
      );

      return { message: "Posts fetched successfully", data: result.rows };
    },
    "getPosts"
  );
};

export const uploadPost = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const payload = req.body as DBPayload;
      const post = payload.obj as Post;
      const originalBuffer = Buffer.from(post.video);
      const database = payload.database;

      // Get the last notification timestamp
      const result = await queryMultiDB(
        database as DatabaseOption,
        "SELECT * FROM notifications \
        WHERE userid = $1 \
        ORDER BY senttimestamp DESC LIMIT 1;",
        [post.userid]
      );

      const notification = result.rows[0] as any;
      let islate = false;

      if (notification.senttimestamp) {
        const timestamp = new Date(notification?.senttimestamp);
        islate = Date.now() - timestamp.getTime() > 120000;
      }

      await queryMultiDB(
        database,
        `INSERT INTO posts_${database} (userid, video, islate, locationid) \
         VALUES ($1, $2, $3, $4) RETURNING postid`,
        [post.userid, originalBuffer, islate, post.userid]
      );

      if (notification.notificationid) {
        // Set the notification as dismissed
        await queryMultiDB(
          database as DatabaseOption,
          `UPDATE notifications_${database} 
          SET wasdismissed = true WHERE notificationid = $1`,
          [notification.notificationid]
        );
      }

      return {
        message: "Post uploaded successfully",
        data: { fileId: result.rows[0].postid },
      };
    },
    "uploadPost"
  );
};

export const getVideo = async (req: Request, res: Response) => {
  try {
    const { postid } = req.params;

    // Query the database for the video
    const result = await queryMultiDB(
      "za" as DatabaseOption,
      "SELECT video FROM posts WHERE postid = $1",
      [postid]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        message: "Video not found",
      });
    }
    const videoBuffer = result.rows[0].video;
    const videoSize = videoBuffer.length;
    const range = req.headers.range;

    if (!range) {
      // If no range is specified, send the whole video
      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Content-Length", videoSize);
      res.send(videoBuffer);
      return;
    }

    // Parse the Range header
    const [start, end] = range
      .replace(/bytes=/, "")
      .split("-")
      .map(Number);

    const chunkStart = start || 0;
    const chunkEnd = end || videoSize - 1;
    const chunkSize = chunkEnd - chunkStart + 1;

    // Set headers for partial content
    res.setHeader(
      "Content-Range",
      `bytes ${chunkStart}-${chunkEnd}/${videoSize}`
    );
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Length", chunkSize);
    res.setHeader("Content-Type", "video/mp4");
    res.status(206); // HTTP 206 Partial Content*/

    // Send the video chunk
    res.send(videoBuffer.slice(chunkStart, chunkEnd + 1));
  } catch (err) {
    const errorMessage = `Error in getVideo(): ${getErrorMessage(err)}`;
    reportError({
      message: errorMessage,
    });
    res.status(500).json({ message: errorMessage });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { id } = req.params;

      // Get the database based on the user behind of the post
      const result = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT userid FROM posts WHERE postid = $1",
        [id]
      );
      const userid = result.rows[0]?.userid;

      const result2 = await queryMultiDB(
        "za" as DatabaseOption,
        "SELECT database FROM users WHERE userid = $1",
        [userid]
      );
      const database = result2.rows[0]?.database;

      await queryMultiDB(
        database,
        `DELETE FROM posts_${database} WHERE postid = $1`,
        [id]
      );

      return {
        message: "Post deleted successfully",
        data: null,
      };
    },
    "deletePost"
  );
};
