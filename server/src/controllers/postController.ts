import { Request, Response } from "express"; // Importing Request and Response types
import { handleControllerRequest } from "@controllers/handlers";
import { query } from "src/database/db";
import { getErrorMessage } from "@utils/logger";

export const getPosts = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const result = await query("SELECT * FROM posts", []);

      return { message: "Posts fetched successfully", data: result.rows };
    },
    "handleDevRequest"
  );
};

export const uploadPost = async (req: Request, res: Response) => {
  return handleControllerRequest(
    res,
    async () => {
      const { content } = req.body;

      // Decode the Base64 content back to a buffer
      const fileBuffer = Buffer.from(content, "base64");

      const result = await query(
        "INSERT INTO posts (content) VALUES ($1) RETURNING postid",
        [fileBuffer]
      );

      return {
        message: "Post uploaded successfully",
        data: { fileId: result.rows[0].postid },
      };
    },
    "handleDevRequest"
  );
};

export const getVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Query the database for the video
    const result = await query("SELECT content FROM posts WHERE postid = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        message: "Video not found",
      });
    }
    const videoBuffer = result.rows[0].content;
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
  /*},
    "handleDevRequest"
  );*/
};
