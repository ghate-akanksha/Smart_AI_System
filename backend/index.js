const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Load Environment Variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Auth Routes 
// This handles BOTH:
// 1. POST http://localhost:5000/api/auth/register
// 2. POST http://localhost:5000/api/auth/login
app.use("/api/auth", authRoutes);

// ✅ Base Route
app.get("/", (req, res) => {
    res.send("NexGen API is running...");
});

// ✅ 404 Route Handler (If user hits a route that doesn't exist)
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// ✅ Global Error Handler (Prevents server from crashing on errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});