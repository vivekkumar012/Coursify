import express from 'express'
import { logout, purchases, signin, signup } from '../controller/userController.js';
import userMiddleware from '../middleware/userMid.js';

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/logout", logout);
userRouter.get("/purchases", userMiddleware, purchases);

export default userRouter;