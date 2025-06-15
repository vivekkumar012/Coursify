import express from 'express';
import { createCourse, updateCourse } from '../controller/courseController.js';

const courseRouter = express.Router();


courseRouter.post("/create", createCourse);
courseRouter.put("/update/:courseId", updateCourse);

export default courseRouter;