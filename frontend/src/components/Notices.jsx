import React, { useState, useEffect } from "react";
import { FaPlus, FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import "./Notices.css";

function Notices() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [filter, setFilter] = useState("published"); // published, pending, rejected
  const [showModal, setShowModal] = useState(false);

  // Mock Data - In a real app, use useEffect to fetch from /api/notices
  const [notices, setNotices] = useState([
    { id: 1, title: "Final Year Project Submission", content: "Please submit your synopsys by Friday.", category: "Academic", status: "published", author: "Prof. Verma", role: "faculty" },
    { id: 2, title: "Cultural Fest 2026", content: "Auditions for the dance team start tomorrow.", category: "Event", status: "pending", author: "Prof. Gupta", role: "faculty" },
    { id: 3, title: "Urgent: Server Maintenance", content: "The college portal will be down for 2 hours.", category: "System", status: "published", author: "Admin", role: "admin" },
  ]);

  // Filter logic based on user role and selection
  const displayedNotices = notices.filter(n => {
    if (user.role === "student") return n.status === "published";
    if (user.role === "faculty") return n.status === "published" || n.author === user.name;
    return n.status === filter; // Admin sees based on selected tab
  });

  return (
    <div className="notices-container">
      <div className="notices-header">
        <div>
          <h1>Notice Board</h1>
          <p>Stay updated with the latest campus announcements</p>
        </div>
        
        {/* Only Faculty and Admin can add notices */}
        {(user.role === "admin" || user.role === "faculty") && (
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <FaPlus /> Create Notice
          </button>
        )}
      </div>

      {/* Admin Tabs for Moderation */}
      {user.role === "admin" && (
        <div className="admin-tabs">
          <button className={filter === "published" ? "active" : ""} onClick={() => setFilter("published")}>Published</button>
          <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>Pending Approval</button>
          <button className={filter === "rejected" ? "active" : ""} onClick={() => setFilter("rejected")}>Rejected</button>
        </div>
      )}

      <div className="notices-grid">
        {displayedNotices.length > 0 ? (
          displayedNotices.map((notice) => (
            <div key={notice.id} className={`notice-card-pro ${notice.status}`}>
              <div className="card-tag">{notice.category}</div>
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              
              <div className="card-footer">
                <span className="author-tag">By {notice.author}</span>
                
                <div className="action-btns">
                  {/* Admin Approval Buttons */}
                  {user.role === "admin" && notice.status === "pending" && (
                    <>
                      <button className="icon-btn approve"><FaCheck /></button>
                      <button className="icon-btn reject"><FaTimes /></button>
                    </>
                  )}
                  
                  {/* Faculty/Admin Edit & Delete */}
                  {(user.role === "admin" || (user.role === "faculty" && notice.author === user.name)) && (
                    <>
                      <button className="icon-btn edit"><FaEdit /></button>
                      <button className="icon-btn delete"><FaTrash /></button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No notices found in this category.</div>
        )}
      </div>
    </div>
  );
}

export default Notices;