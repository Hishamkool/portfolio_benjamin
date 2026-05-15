import { useState, useEffect } from "react";
import { PROJECTS } from "../../../data/projectData.js";
import { CATEGORIES } from "../../../data/categories.js";
import ProjectGrid from "./ProjectGrid";
import ClassicProjectGrid from "./ClassicProjectGrid";
import styles from "./ProjectsOverlay.module.css";

/**
 * ProjectsOverlay
 *
 * Full-screen glassmorphic overlay with:
 * - Left sidebar: category tabs
 * - Right panel: scrollable image grid with expand/collapse
 * - Back arrow to close
 *
 * Props:
 *   onClose - called when back arrow is clicked
 */
export default function ProjectsOverlay({ onClose }) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects based on active category
  const filtered =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  // Prevent body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.overlay}>
        {/* ── LEFT SIDEBAR ── */}
        <aside className={styles.sidebar}>
          <button
            className={styles.backBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <img src="/assets/home/back_btn.svg" alt="Back" />
          </button>

          {/* Category tabs */}
          <nav className={styles.tabs}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main className={styles.panel}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Explore MY Gallery</h1>
              <p className={styles.subtitle}>
                A curated gallery of my work, showcasing how ideas turn into
                impactful visuals across design, motion, and digital experiences
              </p>
            </div>
          </div>

          {/* Scrollable grid */}
          {activeCategory === "all" ? (
            <ProjectGrid projects={filtered} />
          ) : (
            <ClassicProjectGrid projects={filtered} />
          )}
        </main>
      </div>
    </div>
  );
}
