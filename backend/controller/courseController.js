import { courseModel } from "../model/courseModel.js";
import { v2 as cloudinary } from 'cloudinary'
import { purchaseModel } from "../model/purchaseModel.js";

export const createCourse = async (req, res) => {
    const adminId = req.adminId;
    try {
        const { title, description, price } = req.body;
        if (!title || !description || !price) {
            return res.status(403).json({
                msg: "All Fields are required"
            })
        }
        //Image File Uploade Procedure
        // Data base me url store hota hai isiliye express fileUpload me file upload kar do aur url k liye usko cloudinary pe bheje
        // cloudinary se 2 cheez lenge ek public_id aur ek url jo hme chahiye tha
        const { image } = req.files;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                msg: "No file uploaded"
            })
        }
        const allowedFormat = ["image/jpeg", "image/png"];
        if (!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({
                msg: "Incorrect fie format. Only jpg and png allowed"
            })
        }
        //Cloudinary code
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
        if (!cloud_response || cloud_response.error) {
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
            },
            creatorId: adminId
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
    const adminId = req.adminId;
    try {
        const { courseId } = req.params;
        const { title, description, price, image } = req.body;
        // if(!title || !description || !price) {
        //     return res.status(400).json({
        //         message: "All fields are required for update the course content"
        //     })
        // }
        const courseSearch = await courseModel.findOneAndUpdate(courseId);
        if (!courseSearch) {
            return res.status(404).json({ errors: "Course not found" });
        }
        const course = await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        },
            {
                title: title || course.title,
                description: description || course.description,
                price: price || course.price,
                image: {
                    public_id: image?.public_id,
                    url: image?.url
                }
            });

        if (!course) {
            return res.status(402).json({
                errors: "Cannot update, created by other admin"
            })
        }

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

export const deleteCourse = async (req, res) => {
    const adminId = req.adminId;
    try {
        const { courseId } = req.params;

        const course = await courseModel.findOneAndDelete({
            _id: courseId,
            creatorId: adminId
        });

        if (!course) {
            return res.status(400).json({
                errors: "Course delete, created by other admin"
            })
        }
        res.status(200).json({
            message: "Course Deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            message: "Error in Course Deletion",
            error: error.message
        })
    }
}

export const getCourses = async (req, res) => {
    try {
        const course = await courseModel.find({})
        res.status(201).json({ course });
    } catch (error) {
        res.status(500).json({
            message: "Error in getAll Courses",
            error: error.message
        })
    }
}

export const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(401).json({
                message: "Course not found with this id"
            })
        }
        res.status(200).json({
            course
        })

    } catch (error) {
        res.status(500).json({
            message: "Error in Getting single Course",
            error: error.message
        })
    }
}

import Stripe from 'stripe'

export const buyCourses = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    //console.log(process.env.STRIPE_SECRET_KEY);

    const { userId } = req.body;
    const { courseId } = req.params;
    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(400).json({
                message: "Course Not found"
            })
        }
        const existing = await purchaseModel.findOne({
            userId: userId,
            courseId: courseId
        })
        if (existing) {
            return res.status(400).json({
                message: "Course already purchased"
            })
        }

        // Stripe Payment Integration starts
        const amount = course.price;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"]
        });


        res.status(200).json({
            message: "Course purchased successfully",
            course,
            clientSecret: paymentIntent.client_secret,
        })

    } catch (error) {
        res.status(400).json({
            message: "Error while Purchase Course",
            error: error.message
        })
    }
}