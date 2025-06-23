import express from 'express';
import { buyCourses, createCourse, deleteCourse, getCourseDetails, getCourses, updateCourse } from '../controller/courseController.js';
import userMiddleware from '../middleware/userMid.js';
import { adminMiddleware } from '../middleware/adminMid.js';

const courseRouter = express.Router();


courseRouter.post("/create", adminMiddleware, createCourse);
courseRouter.put("/update/:courseId", adminMiddleware, updateCourse);
courseRouter.delete("/delete/:courseId", adminMiddleware, deleteCourse);
courseRouter.get("/courses", getCourses);
courseRouter.get("/:courseId", getCourseDetails);

courseRouter.post("/buy/:courseId", userMiddleware, buyCourses);

export default courseRouter;