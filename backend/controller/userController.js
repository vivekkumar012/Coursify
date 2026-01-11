import { userModel } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod'
import { purchaseModel } from "../model/purchaseModel.js";
import { courseModel } from "../model/courseModel.js";

export const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    // Server Side Validation using ZOD
    const userSchema = z.object({
        firstname: z.string().min(2, { message: "name must be 10 chars long" }),
        lastname: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(2)
    })
    const validateSchema = userSchema.safeParse(req.body);
    if (!validateSchema.success) {
        return res.status(402).json({
            message: "Incorrect Format",
            error: validateSchema.error
        })
    }

    try {
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required for signup"
            })
        }

        const user = await userModel.findOne({
            email: email
        })
        if (user) {
            return res.status(400).json({
                msg: "User already exist with this email"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPass
        });

        res.status(200).json({
            message: "User signup successfully",
            newUser
        })
    } catch (error) {
        res.status(403).json({
            message: "Error in user signup",
            error: error.message
        })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required for signin"
            })
        }

        const user = await userModel.findOne({
            email: email
        })
        if (!user) {
            return res.status(403).json({
                message: "User not exist with this email"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({
                message: "Password not matched"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_USER_SECRET, { expiresIn: "1d" });
        //Frontend me easily access ke liye
        // In signin controller
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", // Change this
        };
        res.cookie("jwt", token, cookieOptions);

        res.status(201).json({
            message: "User signin Sucessfully",
            token,
            user
        })
    } catch (error) {
        res.status(403).json({
            message: "Error in user Signin controller",
            error: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        if (!req.cookies.jwt) {
            return res.status(400).json({
                message: "Login first"
            })
        }
        res.clearCookie("jwt");
        res.status(200).json({
            message: "user Logout Successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error in User Logout",
            error: error.message
        })
    }
}

export const purchases = async (req, res) => {
    const userId = req.userId;
    try {
        const purchased = await purchaseModel.find({ userId });

        let purchasedCourse = [];
        for (let i = 0; i < purchased.length; i++) {
            purchasedCourse.push(purchased[i].courseId);
        }
        const courseData = await courseModel.find({
            _id: { $in: purchasedCourse },
        })
        res.status(200).json({
            message: " All purchases courese are successfully found",
            purchased,
            courseData
        })

    } catch (error) {
        res.status(400).json({
            message: "Error in user purchases",
            error: error.message
        })
    }
}

// export const purchases = async (req, res) => {
//     const userId = req.userId; // ✅ Fix 1

//     try {
//         const purchased = await purchaseModel.find({ userId }); // ✅ Fix 2

//         if (!purchased || purchased.length === 0) {
//             return res.status(401).json({
//                 message: "You have not any purchased courses"
//             });
//         }

//         const purchasedCourseIds = purchased.map(item => item.courseId); // ✅ Fix 3

//         const courseData = await courseModel.find({
//             _id: { $in: purchasedCourseIds },
//         });

//         res.status(200).json({
//             message: "All purchased courses are successfully found",
//             purchased,
//             courseData
//         });

//     } catch (error) {
//         res.status(400).json({
//             message: "Error in user purchases",
//             error: error.message
//         });
//     }
// };
