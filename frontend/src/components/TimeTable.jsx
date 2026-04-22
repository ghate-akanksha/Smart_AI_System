import React from "react";
import { FaClock, FaMapMarkerAlt, FaUserTie, FaEdit, FaPlus } from "react-icons/fa";
// import "./Timetable.css";

function Timetable() {
  const user = JSON.parse(localStorage.getItem("user"));
  const canEdit = user?.role === "admin" || user?.role === "faculty";

  // Mock data
  const schedule = [
    { id: 1, time: "09:00 AM", subject: "Advanced Web Dev", room: "Room 302", professor: "Prof. Sharma", color: "#38bdf8" },
    { id: 2, time: "11:30 AM", subject: "Machine Learning", room: "Lab 04", professor: "Dr. Gupta", color: "#a855f7" },
  ];

  return (
    <div className="timetable-card">
      <div className="timetable-header">
        <div className="header-left">
          <h3>Today's Timetable</h3>
          <span className="current-day">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span>
        </div>
        
        {/* 🛠️ Management Button for Admin/Faculty */}
        {canEdit && (
          <button className="manage-schedule-btn">
            <FaPlus /> {user.role === "admin" ? "Assign Class" : "Update Slot"}
          </button>
        )}
      </div>

      <div className="timetable-list">
        {schedule.map((item) => (
          <div key={item.id} className="timetable-item">
            <div className="time-column">
              <span className="time-text">{item.time}</span>
              <div className="time-dot" style={{ backgroundColor: item.color }}></div>
            </div>
            
            <div className="details-column">
              <div className="subject-info">
                <div className="subject-title-row">
                  <h4>{item.subject}</h4>
                  {/* Edit icon appears only for staff */}
                  {canEdit && <FaEdit className="inline-edit-icon" title="Edit Slot" />}
                </div>
                <div className="meta-info">
                  <span><FaMapMarkerAlt /> {item.room}</span>
                  <span><FaUserTie /> {item.professor}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timetable;