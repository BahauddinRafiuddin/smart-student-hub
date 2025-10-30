import express from "express";
import { authUser } from "../middlewares/old/authUser.js";
import { register, login, logout, getProfile, updateProfile } from "../controllers/index.js"; // controller

const route = express.Router();

route.post("/register",register);
route.post("/login",login);
route.get("/logout",logout);
route.route("/profile").get(authUser,getProfile).put(authUser,updateProfile);

export default route;