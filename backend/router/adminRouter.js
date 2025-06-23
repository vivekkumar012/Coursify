import express from 'express'
import { logout, signin, signup } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);
adminRouter.get("/logout", logout);

export default adminRouter;