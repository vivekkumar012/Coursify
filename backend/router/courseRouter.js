import express from 'express';
import { createCourse } from '../controller/courseController.js';

const courseRouter = express.Router();


courseRouter.post("/create", createCourse);

export default courseRouter;