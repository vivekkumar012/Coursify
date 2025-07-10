import express from 'express'
import userMiddleware from '../middleware/userMid.js';
import { orderData } from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/", userMiddleware, orderData)

export default orderRouter;