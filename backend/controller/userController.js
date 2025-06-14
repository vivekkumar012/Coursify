import { userModel } from "../model/userModel";
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
    } catch (error) {
        
    }
}