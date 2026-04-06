import React from 'react';
import { FaLaptopCode, FaDatabase, FaProjectDiagram } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "Drug Abuse Awareness Web App",
      category: "Web Design",
      description: "Designed a responsive website highlighting the impacts of drug abuse across multiple countries. Integrated a dynamic slideshow using an API to visualize data cases and country statistics.",
      tech: ["HTML", "JavaScript", "CSS", "APIs"],
      icon: <FaLaptopCode />,
      gradient: "linear-gradient(135deg, #ff0f7b 0%, #f89b29 100%)"
    },
    {
      title: "Data Structures & Algorithms GUI",
      category: "Desktop Application",
      description: "Designed and implemented a graphical user interface to showcase various data structures and sorting/searching algorithms including Binary Search, Linear Search, Red-Black Trees, and Linked Lists.",
      tech: ["C", "C++", "GUI Development"],
      icon: <FaProjectDiagram />,
      gradient: "linear-gradient(135deg, #00f0ff 0%, #005aff 100%)"
    },
    {
      title: "Retail Management Database",
      category: "Database Systems",
      description: "Developed a comprehensive database system for storing, updating, and maintaining retail inventory. Served as Project Leader for a team of 4, coordinating tasks for flawless delivery.",
      tech: ["SQL", "Database Design", "Leadership"],
      icon: <FaDatabase />,
      gradient: "linear-gradient(135deg, #7000ff 0%, #bc00ff 100%)"
    }
  ];

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
