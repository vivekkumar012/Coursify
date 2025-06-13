import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

const app = express();
dotenv.config();

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


app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});