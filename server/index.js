import express from "express";
import dotenv from 'dotenv';
import connectDatabase from "./config/dbConnect.js";
import cors from 'cors';

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors());

// Database Connection Function Call
await connectDatabase();

// global Error handle middleware
app.use((err,req,res,next)=>{
    console.error(err.stack);
    if(err)
        res.status(err.statusCode || 500).json({success:false,message:err.message})
});

app.listen(port, (req, res) => {
    console.log(`Server running on http://localhost:${port}`);
})
