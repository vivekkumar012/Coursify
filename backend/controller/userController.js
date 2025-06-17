import { userModel } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod'

export const signup = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    // Server Side Validation using ZOD
    const userSchema = z.object({
        firstname: z.string().min(2, {message: "name must be 10 chars long"}),
        lastname: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(2)
    })
    const validateSchema = userSchema.safeParse(req.body);
    if(!validateSchema.success) {
        return res.status(402).json({
            message: "Incorrect Format",
            error: validateSchema.error
        })
    }

    try {
        if(!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required for signup"
            })
        }

        const user = await userModel.findOne({
            email : email
        })
        if(user) {
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
    const { email, password} = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({
                message: "All fields are required for signin"
            })
        }

        const user = await userModel.findOne({
            email : email
        })
        if(!user) {
            return res.status(403).json({
                message: "User not exist with this email"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(403).json({
                message: "Password not matched"
            })
        }

        const token = await jwt.sign({
            id: user._id
        }, process.env.JWT_USER_SECRET);

        res.json(203).json({
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
    const {} = req.user
}