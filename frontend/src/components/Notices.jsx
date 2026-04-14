import React, { useState, useEffect } from "react";
import { FaPlus, FaCheck, FaTimes, FaEdit, FaTrash, FaBullhorn } from "react-icons/fa";
import "./Notices.css";

function Notices() {
  // Get user from local storage safely
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest", role: "student" };
  
  const [filter, setFilter] = useState("published");
  const [showModal, setShowModal] = useState(false);
  const [notices, setNotices] = useState([
    { id: 1, title: "Final Year Project Submission", content: "Please submit your synopsis by Friday.", category: "Academic", status: "published", author: "Prof. Verma", role: "faculty" },
    { id: 2, title: "Cultural Fest 2026", content: "Auditions for the dance team start tomorrow.", category: "Event", status: "pending", author: "Prof. Gupta", role: "faculty" },
    { id: 3, title: "Urgent: Server Maintenance", content: "The college portal will be down for 2 hours.", category: "System", status: "published", author: "Admin", role: "admin" },
  ]);

  // Form State for new notices
  const [formData, setFormData] = useState({ title: "", content: "", category: "Academic" });

  // --- Handlers ---
  const handleCreateNotice = (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      id: Date.now(),
      status: user.role === "admin" ? "published" : "pending",
      author: user.name,
      role: user.role
    };
    setNotices([newEntry, ...notices]);
    setShowModal(false);
    setFormData({ title: "", content: "", category: "Academic" });
  };

  const updateStatus = (id, newStatus) => {
    setNotices(notices.map(n => n.id === id ? { ...n, status: newStatus } : n));
  };

  const deleteNotice = (id) => {
    if(window.confirm("Are you sure you want to delete this notice?")) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  const displayedNotices = notices.filter(n => {
    if (user.role === "student") return n.status === "published";
    if (user.role === "faculty") return n.status === "published" || n.author === user.name;
    return n.status === filter;
  });

  return (
    <div className="notices-wrapper">
      <div className="notices-header-pro">
        <div className="header-text">
          <h1><FaBullhorn className="header-icon" /> Notice Board</h1>
          <p>Official announcements and campus updates for <strong>Edu_Web</strong></p>
        </div>
        
        {(user.role === "admin" || user.role === "faculty") && (
          <button className="create-btn-pro" onClick={() => setShowModal(true)}>
            <FaPlus /> Post New Notice
          </button>
        )}
      </div>

      {user.role === "admin" && (
        <div className="moderation-bar">
          <button className={filter === "published" ? "active" : ""} onClick={() => setFilter("published")}>Published</button>
          <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
            Pending Approval {notices.filter(n => n.status === "pending").length > 0 && <span className="count-dot"></span>}
          </button>
          <button className={filter === "rejected" ? "active" : ""} onClick={() => setFilter("rejected")}>Archived</button>
        </div>
      )}

      <div className="notices-grid-pro">
        {displayedNotices.length > 0 ? (
          displayedNotices.map((notice) => (
            <div key={notice.id} className={`notice-card-pro ${notice.status}`}>
              <div className="card-top">
                <span className={`category-pill ${notice.category.toLowerCase()}`}>{notice.category}</span>
                <span className="date-text">April 14, 2026</span>
              </div>
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              
              <div className="card-footer-pro">
                <div className="user-info">
                  <div className="user-avatar">{notice.author.charAt(0)}</div>
                  <span className="author-name">{notice.author} <small>({notice.role})</small></span>
                </div>
                
                <div className="action-cluster">
                  {user.role === "admin" && notice.status === "pending" && (
                    <>
                      <button className="action-circle check" title="Approve" onClick={() => updateStatus(notice.id, "published")}><FaCheck /></button>
                      <button className="action-circle cross" title="Reject" onClick={() => updateStatus(notice.id, "rejected")}><FaTimes /></button>
                    </>
                  )}
                  
                  {(user.role === "admin" || (user.role === "faculty" && notice.author === user.name)) && (
                    <>
                      <button className="action-circle edit" title="Edit"><FaEdit /></button>
                      <button className="action-circle trash" title="Delete" onClick={() => deleteNotice(notice.id)}><FaTrash /></button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-notices">
            <img src="https://illustrations.popsy.co/gray/list-is-empty.svg" alt="empty" />
            <p>No notices found in {filter} section.</p>
          </div>
        )}
      </div>

      {/* --- CREATE NOTICE MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-pop">
            <div className="modal-header">
              <h2>Draft Campus Notice</h2>
              <button className="close-modal" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleCreateNotice}>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Exam Schedule Update"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option>Academic</option>
                    <option>Event</option>
                    <option>System</option>
                    <option>Placement</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea 
                  rows="4" 
                  required 
                  placeholder="Provide detailed information here..."
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Discard</button>
                <button type="submit" className="submit-btn-pro">
                  {user.role === "admin" ? "Publish Immediately" : "Submit for Approval"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notices;