const User = require("../models/userModel");   // ✅ capital U
const bcrypt = require("bcryptjs");           // ✅ correct spelling

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // 5️⃣ Save
        await newUser.save();

        // 6️⃣ Response
        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { registerUser };
