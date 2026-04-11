
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      {/* 🔝 Navbar stays visible on all pages */}
      <Navbar />

      {/* 🌐 Routes manage which page component to show */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* 🔻 Footer stays visible on all pages */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;