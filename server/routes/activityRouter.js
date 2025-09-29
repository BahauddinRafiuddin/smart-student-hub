import express from 'express';
import authRouter from './authRouter.js';
import { createActivity, deleteActivity, getActivityById, getMyActivities, updateActivity } from '../controllers/activityController.js';
import { authorize, authUser } from '../middlewares/authUser.js';

const activityRouter = express.Router()

// All routes require authentication
activityRouter.use(authUser);

activityRouter.post('/addActivity', authorize("student"), createActivity);
activityRouter.get('/getMyActivities', authorize("student"), getMyActivities);
activityRouter.get("/getActivityById/:id", getActivityById);
activityRouter.put("/updateActivity/:id", authorize("student"), updateActivity);
activityRouter.delete("/deleteActivity/:id", authorize("student"), deleteActivity);

export default activityRouter;