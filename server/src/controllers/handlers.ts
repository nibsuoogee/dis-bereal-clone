import { getErrorMessage } from "@utils/logger";
import { Response } from "express";

/**
 * Handles the response from a controller function.
 * @param res The response object
 * @param operation an async function that returns an object with a message
 * and data property. Status code will default to 200.
 * @param functionName The calling function name for error logging
 */
export async function handleControllerRequest(
  res: Response,
  operation: () => Promise<{ message: string; data: any; status?: number }>,
  functionName: string
) {
  try {
    const { message, data, status } = await operation();

    res.status(status ?? 200).json({ message, data });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error in ${functionName}(): ` + getErrorMessage(err) });
  }
}
