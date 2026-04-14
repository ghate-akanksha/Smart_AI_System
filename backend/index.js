const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan"); // Added for professional request logging
const connectDB = require("./config/db");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes"); // Import Notice Routes

// Load Environment Variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Logs: method url status time - e.g., GET /api/notices 200 15ms

// ✅ API Routes
app.use("/api/auth", authRoutes);     // Auth: login, register
app.use("/api/notices", noticeRoutes); // Notices: CRUD & Moderation

// ✅ Base Route
app.get("/", (req, res) => {
    res.send("Edu_Web API is running..."); // Updated branding
});

// ✅ 404 Route Handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({ 
        success: false, 
        message: err.message || "Internal Server Error",
        // Show stack trace only in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Edu_Web Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});