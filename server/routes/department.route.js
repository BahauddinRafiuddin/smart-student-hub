import express from "express";
import {createDepartment} from "../controllers/index.js";

const route = express.Router();

route.post("/create",createDepartment);

export default route;