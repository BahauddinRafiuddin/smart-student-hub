import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/dbConnect.js";
import cors from "cors";
import { authRoute } from "./routes/index.js";
import { courseRoute } from "./routes/index.js";
import { departmentRoute } from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

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
app.use((err, req, res, next) => {
  console.error(err.message);
  if (err)
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
});

app.listen(port, (req, res) => {
  console.log(`Server running on http://localhost:${port}`);
});
