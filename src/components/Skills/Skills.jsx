import React from 'react';
import { FaCode, FaLaptopCode, FaServer, FaCloud } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming",
      icon: <FaCode />,
      skills: ["Java", "SQL", "C#", "C/C++", "JavaScript", "HTML/CSS", "Python", "PHP"]
    },
    {
      title: "Frameworks & Libraries",
      icon: <FaLaptopCode />,
      skills: ["React", "Node.js", "Ruby", "Angular"]
    },
    {
      title: "Dev Tools & OS",
      icon: <FaServer />,
      skills: ["Git", "Visual Studio", "VS Code", "Atom", "Jira", "Unix/Linux", "Windows"]
    },
    {
      title: "Cloud Computing",
      icon: <FaCloud />,
      skills: ["AWS", "Google Cloud Platform"]
    }
  ];

  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div className="glass-card skill-card" key={index}>
              <div className="skill-header">
                <div className="skill-icon">{category.icon}</div>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-tags">
                {category.skills.map((skill, idx) => (
                  <span className="skill-tag" key={idx}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
