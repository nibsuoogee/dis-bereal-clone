/**
 * Converta any error to a string safely.
 * @param error Any error.
 * @returns A string version of the error.
 */
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Send an error message to the logger.
 */
export const reportError = ({ message }: { message: string }) => {
  console.error(message);
};
