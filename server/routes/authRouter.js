import express from 'express'
import { getProfile, login, register } from '../controllers/authController.js';
import { authUser } from '../middlewares/authUser.js';

const authRouter=express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);

authRouter.get('/profile',authUser,getProfile);

export default authRouter;