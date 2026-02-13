import express from "express";
import { createCourse, getCourse, getAllCourse, updateCourse, deleteCourse } from "../controllers/index.js";

const route = express.Router();

route.route("").get(getAllCourse).post(createCourse);
route.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

export default route;