import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import shayariRoutes from "./routes/shayariRoutes.js"
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());

app.get("/hi",(req,res)=>{
  res.send("Hi Arya....")
})

app.use("/api/auth", userRoutes);
app.use("/api/shayari",shayariRoutes );
const startServer = async()=>{
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();