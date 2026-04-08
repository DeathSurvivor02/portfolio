import React from 'react';
import { FaLaptopCode, FaDatabase, FaProjectDiagram } from 'react-icons/fa';
import './Projects.css';
import { projects } from "./projectsData";

const Projects = () => {


  // projects array is now imported from projectsData.js

  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects Portfolio</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="glass-card project-card" key={index}>
              <div 
                className="project-cover" 
                style={{ background: project.gradient }}
              >
                <div className="project-icon">{project.icon}</div>
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
                    <span className="tech-pill" key={idx}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
