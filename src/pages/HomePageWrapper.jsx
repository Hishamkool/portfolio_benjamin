import { useState } from 'react';
import HomePage from '../components/home/HomePage';

/**
 * HomePageWrapper
 *
 * Page-level wrapper for the isometric map.
 * Manages which overlay (if any) is currently open.
 * Overlays (Projects, About, Contact) will be added here later.
 */
export default function HomePageWrapper() {
  const [activeOverlay, setActiveOverlay] = useState(null);
  // null | 'projects' | 'about' | 'contact'

  const openOverlay = (name) => setActiveOverlay(name);
  const closeOverlay = () => setActiveOverlay(null);

  return (
    <>
      <HomePage
        onProjectsClick={() => openOverlay('projects')}
        onAboutClick={() => openOverlay('about')}
        onContactClick={() => openOverlay('contact')}
      />

      {/* ── OVERLAYS — will be built when you say so ── */}
      {/* {activeOverlay === 'projects' && (
        <ProjectsOverlay onClose={closeOverlay} />
      )} */}
      {/* {activeOverlay === 'about' && (
        <AboutOverlay onClose={closeOverlay} />
      )} */}
      {/* {activeOverlay === 'contact' && (
        <ContactOverlay onClose={closeOverlay} />
      )} */}

      {/* Temporary placeholder so you can see clicks work */}
      {activeOverlay && (
        <div
          onClick={closeOverlay}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            color: 'white',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          {activeOverlay.toUpperCase()} overlay — click to close
        </div>
      )}
    </>
  );
}
