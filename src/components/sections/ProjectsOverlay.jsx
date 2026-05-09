import { useState, useEffect } from "react";

import { CATEGORIES, PROJECTS } from "../../../data/projectsData";

import ProjectGrid from "../home/projects/ProjectGrid";

import styles from "./ProjectsOverlay.module.css";

/**
 * ProjectsOverlay
 *
 * Main fullscreen portfolio overlay.
 *
 * Responsibilities:
 * - backdrop
 * - sidebar
 * - category tabs
 * - filtering projects
 * - passing filtered projects to ProjectGrid
 */

export default function ProjectsOverlay({ onClose }) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects by active category
  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.overlay}>
        {/* ───────────────── SIDEBAR ───────────────── */}
        <aside className={styles.sidebar}>
          {/* Close Button */}
          <button
            className={styles.backBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <img src="/assets/home/back_btn.svg" alt="Back" />
          </button>

          {/* Category Tabs */}
          <nav className={styles.tabs}>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`${styles.tab} ${
                  activeCategory === category.id ? styles.tabActive : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ───────────────── CONTENT PANEL ───────────────── */}
        <main className={styles.panel}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Explore My Gallery</h1>

              <p className={styles.subtitle}>
                A cinematic collection of artwork, motion design, visual
                experiments, and creative explorations across multiple mediums.
              </p>
            </div>
          </div>

          {/* Infinite Marquee Grid */}
          <ProjectGrid projects={filteredProjects} />
        </main>
      </div>
    </div>
  );
}
