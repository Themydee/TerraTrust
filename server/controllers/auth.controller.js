import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";


export const signup = async (req,res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password){
            return res.status(400).json({ message: "All fields are required"})
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists"})
        }

        const encryptedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 * Math.random() * 900000).toString()
        const newUser = new User ({ 
            name,
            email, 
            password: encryptedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() * 24 * 60 * 60 * 1000 // 24hours
        })
        
        await newUser.save()
        generateTokenAndSetCookie(req, user._id)

        res.status(201).json({success: true, message: "User created successfully", user:{
            ...user.doc,
            password: undefined,
        }})
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}


export const login = async(req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email})
        if(!user){
            return res.status(400).json({success:false, message: "Invalid credentials"})
        }

        const passwordMatches = await bcryptjs.compare(password, user.password)



    } catch (error) {
        
    }
}
