import express from "express";
import { getAllRole, getAllTable, getAllPermission } from "../controllers/index.js";;

const route = express.Router();

route.get("/roles", getAllRole);
route.get("/tables", getAllTable);
route.get("/permissions", getAllPermission);

export default route;