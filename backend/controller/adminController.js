import { z } from 'zod';
import { adminModel } from '../model/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async(req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const adminValidation = z.object({
        firstname: z.string().min(2, {message: "First name must be greater than 2 chars"}),
        lastname: z.string().min(2, {message: "last name must be greater than 2 chars"}),
        email: z.string().email(),
        password: z.string().min(4, {message: "Password must be greater than 4 chars"})
    })
    const validate = adminValidation.safeParse(req.body);
    if(!validate.success) {
        return res.status(402).json({
            message: "Error in input validation using zod"
        })
    }

    
    try {
        if(!firstname || !lastname || !email || !password) {
            return res.status(402).json({
                message: "All Fields are required for signup"
            })
        }
        const admin = await adminModel.findOne({
            email: email
        })
        if(admin) {
            return res.status(400).json({
                message: "Admin already exist with this email"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newAdmin = await adminModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPass
        });
        res.status(200).json({
            message: "Admin signup successfully",
            newAdmin
        });

    } catch (error) {
        res.status(403).json({
            message: "Error in admin signup",
            error: error.message
        })
    }
}

export const signin = async(req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            return res.status(403).json({
                message: "All fields are required for signin"
            })
        }
        const admin = await adminModel.findOne({
            email: email
        })
        if(!admin) {
            return res.status(402).json({
                message: "Admin not exist with this email"
            })
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(402).json({
                message: "Incorrect Password"
            })
        }
        const token = jwt.sign({
            id: admin._id
        }, process.env.JWT_ADMIN_SECRET, { expiresIn: "1d"});

        const validateCookie = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true, //  can't be accsed via js directly
            secure: process.env.NODE_ENV === "production", // true for https only
            sameSite: "Strict", // CSRF attacks se protect
        }
        res.cookie("jwt", token, validateCookie);
        res.status(200).json({
            message: "Admin signin Successfully",
            token,
            admin
        })
    } catch (error) {
        res.status(403).json({
            message: "Error in admin signin",
            error: error.message
        })
    }
}

export const logout = async(req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({
            message: "admin Logout Successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error in User Logout",
            error: error.message
        })
    }
}