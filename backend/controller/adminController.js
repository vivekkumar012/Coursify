import { z } from 'zod';
import { adminModel } from '../model/adminModel';
import bcrypt from 'bcrypt';


export const signup = async(req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const adminValidation = z.object({
        firstname: z.string().min(2, {message: "First name must be greater than 2 chars"}),
        lastname: z.string().min(2, {message: "last name must be greater than 2 chars"}),
        email: z.string().email(),
        password: z.string.min(4, {message: "Password must be greater than 4 chars"})
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
    
}

export const logout = async(req, res) => {
    
}