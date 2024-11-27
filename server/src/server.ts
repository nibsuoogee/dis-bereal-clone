import app from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
