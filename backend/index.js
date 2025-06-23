import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import courseRouter from './router/courseRouter.js';
import userRouter from './router/userRouter.js';
import { v2 as cloudinary } from 'cloudinary'
import fileUpload from 'express-fileupload';

const app = express();
dotenv.config();

app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
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
app.use("/api/v1/admin", )

//Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});


app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});