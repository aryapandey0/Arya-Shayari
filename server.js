import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import commentRoutes from "./routes/commentRoutes.js"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import shayariRoutes from "./routes/shayariRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;
let io;
export { io };

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

app.use("/api/comment", commentRoutes);
app.use("/api/shayari", shayariRoutes);
app.use("/api/ai", aiRoutes);
/* ---------- Start Server ---------- */

const startServer = async () => {
  try {
    await connectDB();

   const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

     io = new Server(server, {
      cors: {
        origin: [
          "http://localhost:5173",
          "https://arya-shayari.netlify.app"
        ],
        credentials: true
      }
    });

    io.on("connection",(socket)=>{

  console.log("User connected :", socket.id);

  socket.on("register",(userId)=>{

    socket.join(userId);

    console.log(`User ${userId} joined room`);

  });

  socket.on("disconnect",()=>{

    console.log("User disconnected :", socket.id);

  });

});

  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();