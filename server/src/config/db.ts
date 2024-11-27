import { getErrorMessage } from "@utils/logger";

export const connectDB = async () => {
  try {
    // await connect to database function
    console.log("Database connected");
  } catch (err) {
    reportError({ message: "Error in connectDB():" + getErrorMessage(err) });
    process.exit(1);
  }
};
