import { useEffect, useMemo, useRef, useState } from "react";

import ProjectItem from "./ProjectItem";

import styles from "./MarqueeRow.module.css";

export default function MarqueeRow({
  projects,
  direction,
  speed,
  paused,
  onProjectClick,
}) {
  const rowRef = useRef(null);

  const [isVisible, setIsVisible] = useState(true);

  // ============================================================
  // DUPLICATE ONLY IF NEEDED
  // ============================================================

  const renderedProjects = useMemo(() => {
    if (projects.length <= 3) {
      return [...projects, ...projects];
    }

    return projects;
  }, [projects]);

  // ============================================================
  // PAUSE MARQUEE WHEN OUTSIDE VIEWPORT
  // ============================================================

  useEffect(() => {
    if (!rowRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(rowRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.rowWrapper} ref={rowRef}>
      <div
        className={`${styles.track} ${
          direction === "ltr" ? styles.ltr : styles.rtl
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isVisible && !paused ? "running" : "paused",
        }}
      >
        {renderedProjects.map((project, index) => (
          <ProjectItem
            key={`${project.id}-${index}`}
            project={project}
            variant="marquee"
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    </div>
  );
}
