import { courseModel } from "../model/courseModel.js";

export const createCourse = async(req, res) => {
    try {
        const { title, description, price, image } = req.body;
        if(!title || !description || !price || !image) {
            return res.status(403).json({
                msg: "All Fields are required"
            })
        }

        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            image: image
        })
        res.status(200).json({
            message: "Course Created",
            course
        })
    } catch (error) {
        res.status(400).json({
            msg: "Error in Create course Controller",
            error: error.message
        })
    }
}