import express from "express";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;
