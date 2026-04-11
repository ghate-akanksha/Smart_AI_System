import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <div className="hero-inner">
            <h1>Smart Campus <br /><span className="accent">AI-Driven Management</span></h1>
            <p>A unified MERN ecosystem for students, faculty, and admins with integrated ML result forecasting.</p>
            <div className="cta-group">
              <button className="btn btn-dark">Get Started</button>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </div>
        </div>
      </header>

      {/* Roles Section */}
      <section className="roles">
        <div className="container">
          <h2 className="section-title">One Platform, Three Experiences</h2>
          
          <div className="grid-layout">
            {/* Student Card */}
            <article className="card">
              <div className="card-icon">🎓</div>
              <h3>Student Portal</h3>
              <ul className="list">
                <li>📊 Tally Attendance & Grades</li>
                <li>📤 Submit Assignments</li>
                <li>🔮 <strong>Predict My Result</strong></li>
              </ul>
            </article>

            {/* Faculty Card */}
            <article className="card">
              <div className="card-icon">👨‍🏫</div>
              <h3>Faculty Hub</h3>
              <ul className="list">
                <li>📝 Assign & Grade Tasks</li>
                <li>📈 Performance Analytics</li>
                <li>📁 Resource Management</li>
              </ul>
            </article>

            {/* Admin Card */}
            <article className="card">
              <div className="card-icon">⚙️</div>
              <h3>Admin Control</h3>
              <ul className="list">
                <li>👥 User Role Control</li>
                <li>📋 Institutional Reports</li>
                <li>🔒 System Security</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* AI Performance Section */}
      <section className="ai-feature">
        <div className="container">
          <div className="ai-banner">
            <div className="ai-info">
              <h2>AI Performance Prediction</h2>
              <p>Our ML model analyzes historical data to predict final results with 95% accuracy.</p>
            </div>
            <div className="ai-avatar">🤖</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;