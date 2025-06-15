import { courseModel } from "../model/courseModel.js";
import { v2 as cloudinary } from 'cloudinary'

export const createCourse = async(req, res) => {
    try {
        const { title, description, price } = req.body;
        if(!title || !description || !price ) {
            return res.status(403).json({
                msg: "All Fields are required"
            })
        }
        //Image File Uploade Procedure
        // Data base me url store hota hai isiliye express fileUpload me file upload kar do aur url k liye usko cloudinary pe bheje
        // cloudinary se 2 cheez lenge ek public_id aur ek url jo hme chahiye tha
        const { image } = req.files;
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                msg: "No file uploaded"
            })
        }
        const allowedFormat = ["image/jpeg", "image/png"];
        if(!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({
                msg: "Incorrect fie format. Only jpg and png allowed"
            })
        }
        //Cloudinary code
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
        if(!cloud_response || cloud_response.error) {
            return res.status(400).json({
                message: "Error while uploading file on cloudinary"
            })
        }

        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.url
            }
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

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, price, image} = req.body;
        if(!title || !description || !price) {
            return res.status(400).json({
                message: "All fields are required for update the course content"
            })
        }
        const course = await courseModel.updateOne({
            _id: courseId
        },
        {
            title: title || course.title,
            description: description || course.description,
            price: price || course.price,
            image: {
                public_id: image?.public_id,
                url: image?.url
            }
        })

        res.status(200).json({
            message: "Course Updated Successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error in Course Update",
            error: error.message
        })
    }
}