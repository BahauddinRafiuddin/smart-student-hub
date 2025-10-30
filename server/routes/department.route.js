import express from "express";
import {createDepartment, getDepartment, getAllDepartment, updateDepartmnet, deleteDepartment} from "../controllers/index.js";

const route = express.Router();

route.post("/",createDepartment);
route.get("/",getAllDepartment);
route.route("/:id").get(getDepartment).put(updateDepartmnet).delete(deleteDepartment);

export default route;