import express from 'express';
import { createCourse, deleteCourse, getCourseDetails, getCourses, updateCourse } from '../controller/courseController.js';

const courseRouter = express.Router();


courseRouter.post("/create", createCourse);
courseRouter.put("/update/:courseId", updateCourse);
courseRouter.delete("/delete/:courseId", deleteCourse);
courseRouter.get("/courses", getCourses);
courseRouter.get("/:courseId", getCourseDetails);

export default courseRouter;