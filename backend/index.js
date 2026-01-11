import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import mongoose from 'mongoose';

import courseRouter from './router/courseRouter.js';
import userRouter from './router/userRouter.js';
import orderRouter from './router/orderRouter.js';
import { v2 as cloudinary } from 'cloudinary'
import fileUpload from 'express-fileupload';
import adminRouter from './router/adminRouter.js';
import cors from 'cors'

const app = express();
const allowedOrigins = [
  "https://coursify-theta.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4001"  // Add this line
];

import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`Blocked by CORS: ${origin}`); // Add logging
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
}));

const port = process.env.PORT || 3000
const db_url = process.env.MONGO_URL;

try {
  await mongoose.connect(db_url);
  console.log("DataBase is Connected");
} catch (error) {
  res.status(500).json({
    msg: "Error in Mongo db Connection",
    error: error.message
  })
}

app.use("/api/v1/course", courseRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/order", orderRouter);

//Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});


app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});