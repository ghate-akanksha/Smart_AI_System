const express = require("express");
const router = express.Router();

// 1. Import BOTH controllers from the same file
const { registerUser, loginUser } = require("../controllers/authController");

// 2. Route for Registration
// Calls http://localhost:5000/api/auth/register
router.post("/register", registerUser);

// 3. Route for Login
// Calls http://localhost:5000/api/auth/login
router.post("/login", loginUser);

module.exports = router;