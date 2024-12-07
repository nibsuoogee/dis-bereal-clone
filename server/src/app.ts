import express from "express";
import devRoutes from "./routes/devRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import reactionRoutes from "./routes/reactionRoutes";

const app = express();

// Middleware
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// Routes
app.use("/api/dev", devRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reactions", reactionRoutes);

export default app;
