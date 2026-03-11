import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import shayariRoutes from "./routes/shayariRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------- Middlewares ---------- */

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://arya-shayari.netlify.app"
    ],
    credentials: true
  })
);

app.use(cookieParser());

/* ---------- Test Route ---------- */

app.get("/hi", (req, res) => {
  res.send("Hi Arya....");
});

/* ---------- Routes ---------- */

app.use("/api/auth", userRoutes);
app.use("/api/shayari", shayariRoutes);

/* ---------- Start Server ---------- */

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();