import { userModel } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
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

        await userModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPass
        });

        res.status(200).json({
            message: "User signup successfully"
        })
    } catch (error) {
        res.status(403).json({
            message: "Error in user signup",
            error: error.message
        })
    }
}

export const signin = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    try {
        if(!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required for signup"
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
            token
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