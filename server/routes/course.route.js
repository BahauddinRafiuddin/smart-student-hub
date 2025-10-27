import express from "express";
import {createCourse} from "../controllers/index.js";

const route = express.Router();

route.post("/create",createCourse);

export default route;