
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

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        
        {/* ✅ FIX: Change element from <Register /> to <Login /> */}
        <Route path="/login" element={<Login />} />
        
        {/* 🚀 You should also add your dashboard routes here later */}
        <Route path="/student" element={<div>Student Dashboard</div>} />
        <Route path="/teacher" element={<div>Teacher Dashboard</div>} />
        <Route path="/admin" element={<div>Admin Dashboard</div>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;