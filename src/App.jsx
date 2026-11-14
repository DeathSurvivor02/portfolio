import React, { useState } from "react";
import { ParallaxBackground } from "./components/ui/parallax-background";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { Skills } from "./components/Skills/Skills";
import { Projects } from "./components/Projects/Projects";
import { Experience } from "./components/Experience/Experience";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [selectedSkillGroup, setSelectedSkillGroup] = useState("all");

  return (
    <div className="relative min-h-screen bg-[#07080a] text-slate-200 antialiased selection:bg-blue-600/30 selection:text-white overflow-x-hidden">
      {/* Scroll-driven multi-layer red & blue parallax background (z-0) */}
      <ParallaxBackground />

      {/* Crisp solid architectural navbar (z-50) */}
      <Navbar />

      {/* Main content container (z-10): Me -> Skills -> Projects under Skills -> Experience -> Contact */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 space-y-28 pt-16 pb-28">
        <Hero />
        <Skills
          selectedGroup={selectedSkillGroup}
          onSelectGroup={(group) => {
            setSelectedSkillGroup(group);
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
        <Projects
          selectedSkillGroup={selectedSkillGroup}
          onClearFilter={() => setSelectedSkillGroup("all")}
        />
        <Experience />
        <Contact />
      </main>

      {/* Footer (z-10) */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
