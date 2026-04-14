import React, { useState } from 'react';
import Notices from '../components/Notices';
import Timetable from '../components/Timetable';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'notices':
        return <Notices />;
      case 'timetable':
        return <Timetable />;
      case 'users':
        return (
          <div className="admin-placeholder">
            <h3>User Management</h3>
            <p>Feature to add/remove Faculty and Students coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="admin-overview">
            <div className="header-flex">
              <h1>System Administrator Portal</h1>
            </div>
            
            <div className="admin-stats-grid">
              <div className="square-card blue">
                <h3>1,240</h3>
                <p>Total Students</p>
              </div>
              <div className="square-card green">
                <h3>85</h3>
                <p>Total Faculty</p>
              </div>
              <div className="square-card orange">
                <h3>12</h3>
                <p>Departments</p>
              </div>
              <div className="square-card purple">
                <h3>45</h3>
                <p>System Alerts</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar - No longer fixed, stays in its flex-column */}
      <aside className="admin-sidebar">
        <div className="admin-logo">Edu_Web</div>
        <ul className="admin-nav">
          <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>🏠 Dashboard</li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>👥 User Control</li>
          <li className={activeTab === 'notices' ? 'active' : ''} onClick={() => setActiveTab('notices')}>🔔 Global Notices</li>
          <li className={activeTab === 'timetable' ? 'active' : ''} onClick={() => setActiveTab('timetable')}>📅 Master Timetable</li>
        </ul>
        <div className="sidebar-bottom">
          <button className="admin-logout">System Exit</button>
        </div>
      </aside>

      {/* Main Container - Takes up remaining width */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">Control Panel / <strong>{activeTab.toUpperCase()}</strong></div>
          <div className="admin-profile">Admin Root</div>
        </header>

        <section className="admin-content-area">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;