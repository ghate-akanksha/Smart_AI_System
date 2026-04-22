const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 1️⃣ REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "student"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during registration",
            error: error.message
        });
    }
};



// 2️⃣ LOGIN USER (FIXED 🔥)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide email and password" 
            });
        }

        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // ✅ FIX: Include name in JWT
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,   // 🔥 IMPORTANT FIX
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during login",
            error: error.message
        });
    }
};


module.exports = { registerUser, loginUser };
