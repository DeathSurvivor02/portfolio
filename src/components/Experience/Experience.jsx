import React from 'react';
import { FaGraduationCap, FaBriefcase, FaCertificate } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  return (
    <section className="section" id="experience">
      <div className="container">
        
        <div className="experience-grid">
          
          <div className="experience-column">
            <h2 className="section-title"><FaGraduationCap className="title-icon"/> Education</h2>
            <div className="timeline">
              <div className="timeline-item glass-card">
                <div className="timeline-dot"></div>
                <div className="timeline-date">Sept 2024 - Present</div>
                <h3 className="timeline-title">Software Engineering Technology (Co-op) Advanced Diploma</h3>
                <h4 className="timeline-subtitle">Centennial College, Toronto, ON</h4>
                <p className="timeline-description">
                  Key courses: Web Applications Design | Software Requirements | Advanced Databases (SQL) | Java Programming
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-dot"></div>
                <div className="timeline-date">Sept 2021 - Dec 2023</div>
                <h3 className="timeline-title">Computer Science and Mathematics Bachelors</h3>
                <h4 className="timeline-subtitle">University of the West Indies, Cavehill, Barbados</h4>
                <p className="timeline-description">
                  Key courses: Object-Oriented Programming Concepts (Java), Programming 1&2 (C++), Data Structures, Calculus 1&2, Micro-economics
                </p>
              </div>

              <div className="timeline-item glass-card">
                <div className="timeline-dot"></div>
                <div className="timeline-date">Sept 2019 - Aug 2021</div>
                <h3 className="timeline-title">Diploma of Applied Sciences</h3>
                <h4 className="timeline-subtitle">The Combermere School, Barbados</h4>
              </div>
            </div>

            <h2 className="section-title mt-top"><FaBriefcase className="title-icon"/> Experience</h2>
            <div className="timeline">
              <div className="timeline-item glass-card">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2022 - 2024</div>
                <h3 className="timeline-title">Cashier</h3>
                <h4 className="timeline-subtitle">Popular Discounts - Christ Church, Barbados</h4>
                <ul className="timeline-list">
                  <li>Strengthened problem-solving and critical thinking by resolving customer issues.</li>
                  <li>Built strong communication skills through daily interactions with diverse customers.</li>
                  <li>Developed adaptability and multitasking in a fast-paced environment.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="experience-column">
            <h2 className="section-title"><FaCertificate className="title-icon"/> Development</h2>
            <div className="cert-list">
              <div className="glass-card cert-card">
                <div className="cert-status in-progress">In Progress</div>
                <h3>Python for Everyone - Course 2&3</h3>
                <p>Coursera (Online)</p>
              </div>
              
              <div className="glass-card cert-card">
                <div className="cert-status in-progress">In Progress</div>
                <h3>Google Automation with Python - Course 1</h3>
                <p>Coursera (Online)</p>
              </div>
              
              <div className="glass-card cert-card">
                <div className="cert-status in-progress">In Progress</div>
                <h3>IBM Cybersecurity Analyst - Course 3</h3>
                <p>Coursera (Online)</p>
              </div>

              <div className="glass-card cert-card">
                <div className="cert-status completed">Completed</div>
                <h3>Encryption and Decryption using C++</h3>
                <p>Coursera (Online)</p>
              </div>

              <div className="glass-card cert-card">
                <div className="cert-status completed">Completed</div>
                <h3>Programming for Everybody (Started with Python)</h3>
                <p>Coursera (Online)</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
