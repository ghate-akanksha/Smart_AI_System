const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

const app = express();

// 3. Global Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// 4. API Routes
app.use("/api/auth", require("./routes/authRoutes"));
  // ← NEW

// 5. Base Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "NexGen College AI API is running...",
        version: "1.0.0"
    });
});

// 6. 404 Route Handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
    console.error(`[Error]: ${err.message}`);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined
    });
});

// 8. Server Activation
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(
        `🚀 NexGen Server running in ${
            process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
    );
});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});