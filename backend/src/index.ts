import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import messageRoutes from "./routes/v1/messages";
import authRoutes from "./routes/v1/auth";
import { swaggerRouter } from "./swagger";
import { authenticateToken } from "./middleware/auth";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/messages", authenticateToken, messageRoutes);
app.use("/api/auth", authRoutes);

// Swagger UI
app.use("/api-docs", swaggerRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/chat-app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
