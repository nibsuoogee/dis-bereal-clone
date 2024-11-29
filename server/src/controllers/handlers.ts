import { getErrorMessage } from "@utils/logger";
import { Response } from "express";

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
