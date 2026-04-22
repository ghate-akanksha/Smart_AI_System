const express = require("express");
const router = express.Router();

// Controllers
const { registerUser, loginUser } = require("../controllers/authController");

// User model
const User = require("../models/userModel");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get all students (for faculty grade entry)
router.get("/students", async (req, res) => {
    try {
        const students = await User.find({ role: "student" })
            .select("_id name email");

        res.status(200).json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;