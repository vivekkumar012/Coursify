import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import courseRouter from './router/courseRouter.js';

const app = express();
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 3000
const db_url = process.env.MONGO_URL;
try {
    await mongoose.connect(db_url);
    console.log("DataBase is Connected");
} catch (error) {
    resizeBy.status(500).json({
        msg: "Error in Mongo db Connection",
        error: error.message
    })
}

app.use("/api/v1/course", courseRouter);


app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});