import React, { useState } from 'react';
import Grade from '../components/Grade'; 
import Timetable from '../components/Timetable'; 
import Notices from '../components/Notices'; 
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderComponent = () => {
    switch (activeTab) {
      case 'grades':
        return <Grade />;
      case 'timetable':
        return <Timetable />;
      case 'notices':
        return <Notices />;
      default:
        return (
          <div className="welcome-stats">
            <h2>Welcome back, Prof. Sajjan!</h2>
            <p>Select a module from the sidebar to manage your classes.</p>
            <div className="stat-cards">
              <div className="card"><h3>12</h3><p>Pending Grades</p></div>
              <div className="card"><h3>5</h3><p>Active Notices</p></div>
              <div className="card"><h3>4</h3><p>Classes Today</p></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="sidebar">
        <div className="logo">NexGen Faculty</div>
        <ul className="nav-links">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            🏠 Overview
          </li>
          <li className={activeTab === 'grades' ? 'active' : ''} onClick={() => setActiveTab('grades')}>
            📊 Grade Management
          </li>
          <li className={activeTab === 'timetable' ? 'active' : ''} onClick={() => setActiveTab('timetable')}>
            📅 Timetable Update
          </li>
          <li className={activeTab === 'notices' ? 'active' : ''} onClick={() => setActiveTab('notices')}>
            🔔 Manage Notices
          </li>
          <li className="disabled-item">📝 Attendance (Soon)</li>
          <li className="disabled-item">📁 Assignments (Soon)</li>
        </ul>
        <div className="sidebar-footer">
          <button className="logout-btn">Logout</button>
        </div>
      </nav>

      <main className="main-content">
        <header className="top-bar">
          <div className="breadcrumb">
            Faculty / <strong>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</strong>
          </div>
          <div className="user-info">
            <span>Engineering Batch 2027</span>
            <div className="avatar">PS</div>
          </div>
        </header>
        
        <section className="display-area">
          {renderComponent()}
        </section>
      </main>
    </div>
  );
};

export default FacultyDashboard;