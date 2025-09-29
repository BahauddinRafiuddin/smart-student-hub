import express, { Router } from 'express'
import { adminLogin, approveActivity, getAllActivity, rejectActivity } from '../controllers/adminController.js';
import { authAdmin, authorizeAdmin } from '../middlewares/authAdmin.js';

const adminRouter=express.Router();

adminRouter.post('/login',adminLogin)
adminRouter.get('/all',authAdmin,authorizeAdmin,getAllActivity);
adminRouter.put('/approve/:id',authAdmin,authorizeAdmin,approveActivity);
adminRouter.put('/reject/:id',authAdmin,authorizeAdmin,rejectActivity);

export default adminRouter;