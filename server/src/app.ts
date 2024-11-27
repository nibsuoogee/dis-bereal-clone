import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

export default app;
