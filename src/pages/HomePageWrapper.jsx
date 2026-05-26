import { useState } from "react";
import HomePage from "../components/home/HomePage";
import ProjectsOverlay from "../components/home/projects/ProjectsOverlay";
import AboutOverlay from "../components/home/about/AboutOverlay";
import BenjaminContact from "../components/home/contact/BenjaminContact.jsx";

/**
 * HomePageWrapper
 * Manages which overlay is open on top of the map.
 */
export default function HomePageWrapper() {
  const [activeOverlay, setActiveOverlay] = useState(null);
  // null | 'projects' | 'about' | 'contact'

  const open = (name) => setActiveOverlay(name);
  const close = () => setActiveOverlay(null);

  return (
    <>
      <HomePage
        onProjectsClick={() => open("projects")}
        onAboutClick={() => open("about")}
        onContactClick={() => open("contact")}
      />

      {activeOverlay === "projects" && <ProjectsOverlay onClose={close} />}

      {activeOverlay === "about" && (
        <div key="about-overlay">
          <AboutOverlay onClose={close} />
        </div>
      )}
      {activeOverlay === "contact" && (
        <div key="contact-overlay">
          <BenjaminContact onClose={close} />
        </div>
      )}

      {/* About and Contact overlays — add later */}
    </>
  );
}
