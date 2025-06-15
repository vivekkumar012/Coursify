import express from 'express'
import { logout, signin, signup } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/logout", logout);

export default userRouter;