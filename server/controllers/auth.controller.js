import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";



export const signup = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;  // Make sure to destructure 'role' too.
  
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const encryptedPassword = await bcryptjs.hash(password, 10);
      const verificationToken = Math.floor(100000 * Math.random() * 900000).toString();
  
      const newUser = new User({
        name,
        email,
        password: encryptedPassword,
        role,  // Ensure role is included
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
  
      await newUser.save();
      generateTokenAndSetCookie(res, newUser._id);
  
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          _id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      });
      
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
      // Find user by email
      const user = await User.findOne({ email });
      
      // If no user found
      if (!user) {
          return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      // Check if the password matches the hashed password
      const passwordMatches = await bcryptjs.compare(password, user.password);
      if (!passwordMatches) {
          return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      // Generate the JWT token here
      const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET_KEY, 
          { expiresIn: '1h' }  
      );

      // Set token in a cookie (optional)
      res.cookie("token", token, {
          httpOnly: true,  
          maxAge: 3600000, // 1 hour
      });

      // Update the user's last login
      user.lastLogin = new Date();
      await user.save();

      // Send back the response with the token and user details
      res.status(200).json({
          success: true,
          message: "You have been successfully logged in",
          token,
          user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              isVerified: user.isVerified,
              lastLogin: user.lastLogin,
          }
      });

  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout =  async(req,res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
  