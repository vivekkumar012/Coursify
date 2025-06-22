import express from 'express';
import { buyCourses, createCourse, deleteCourse, getCourseDetails, getCourses, updateCourse } from '../controller/courseController.js';
import userMiddleware from '../middleware/userMid.js';

const courseRouter = express.Router();


courseRouter.post("/create", createCourse);
courseRouter.put("/update/:courseId", updateCourse);
courseRouter.delete("/delete/:courseId", deleteCourse);
courseRouter.get("/courses", getCourses);
courseRouter.get("/:courseId", getCourseDetails);

courseRouter.post("/buy/:courseId", userMiddleware, buyCourses);

export default courseRouter;