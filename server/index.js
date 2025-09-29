import express from "express";
import dotenv from 'dotenv';
import connectDatabase from "./config/dbConnect.js";
import cors from 'cors';
import authRouter from "./routes/authRouter.js";
import activityRouter from "./routes/activityRouter.js";
import adminRouter from "./routes/adminRouter.js";

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors());

// Database Connection Function Call
await connectDatabase();

app.get('/', (req, res) => {
    res.send("API Working...");
})

// Different Routes
app.use('/api/auth',authRouter)
app.use('/api/activities',activityRouter)
app.use('/api/admin',adminRouter)

app.listen(port, (req, res) => {
    console.log(`Server running on http://localhost:${port}`);
})
