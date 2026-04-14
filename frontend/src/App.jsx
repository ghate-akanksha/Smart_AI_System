
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";

// 🔥 Import the new Student Dashboard component
import StudentDashboard from "./pages/StudentDashboard"; 
import FacultyDashboard from "./pages/FacultyDashBoard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar stays visible on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* ✅ Updated: Route now points to your actual Dashboard component */}
        <Route path="/student" element={<StudentDashboard />} />

        {/* Placeholders for future dashboards */}
        <Route path="/teacher" element={<FacultyDashboard/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;