import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/dbConnect.js";
import cors from "cors";
import { authRoute } from "./routes/index.js";
import { courseRoute } from "./routes/index.js";
import { departmentRoute } from "./routes/index.js";
import { errorHandler } from "./middlewares/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,   
}));

// Database Connection Function Call
await connectDatabase();

app.get("/get", (req, res) => {
  res.status(200).json("wokring good");
});
//endpoint
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/department", departmentRoute);

// global Error handle middleware
app.use(errorHandler);

//handle uncaught Errors
process.on("uncaughtException",(err)=>{
  console.error("Uncaught Exception: ",err);
  process.exit(1);
});

//handle unhandled Errors
process.on("unhandledRejection",(err)=>{
  console.error("unhandled Promise Rejection: ",err);
  process.exit(1);
});

app.listen(port, (req, res) => {
  console.log(`Server running on http://localhost:${port}`);
});
