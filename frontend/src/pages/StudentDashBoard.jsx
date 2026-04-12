import React from "react";
import { FaCalendarAlt, FaGraduationCap, FaBookOpen, FaClipboardList } from "react-icons/fa";
import Notices from "../components/Notices";
import Timetable from "../components/Timetable"; // 1️⃣ Import the new component
import "./StudentDashboard.css";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const stats = [
    { id: 1, title: "Attendance", value: "85%", icon: <FaCalendarAlt />, color: "#38bdf8" },
    { id: 2, title: "Current GPA", value: "3.8", icon: <FaGraduationCap />, color: "#a855f7" },
    { id: 3, title: "Courses", value: "6", icon: <FaBookOpen />, color: "#10b981" },
    { id: 4, title: "Assignments", value: "3 Pending", icon: <FaClipboardList />, color: "#f59e0b" },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        
        {/* Welcome Header */}
        <header className="welcome-banner">
          <h1>Welcome back, {user?.name || "Student"}!</h1>
          <p>Here is what's happening with your studies today.</p>
        </header>

        {/* Stats Row */}
        <div className="stats-row">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="icon-box" style={{ backgroundColor: `${stat.color}10` }}>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div className="stat-text">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="dashboard-grid">
          <div className="main-column">
            {/* 2️⃣ Replace the entire placeholder-card div with the component */}
            <Timetable />
          </div>

          <div className="side-column">
            <Notices />
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;