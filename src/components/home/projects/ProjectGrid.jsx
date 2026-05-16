import { useMemo, useState } from "react";

import MarqueeRow from "./MarqueeRow";
import ExpandedProjectModal from "./ExpandedProjectModal";

import styles from "./ProjectGrid.module.css";

// ============================================================
// FIXED NUMBER OF ROWS
// ============================================================

const ROW_COUNT = 3;

export default function ProjectGrid({ projects }) {
  const [expandedProject, setExpandedProject] = useState(null);

  // ============================================================
  // DISTRIBUTE ALL PROJECTS ACROSS FIXED ROWS
  // ============================================================

  // const rows = useMemo(() => {
  //   const result = Array.from({ length: ROW_COUNT }, () => []);

  //   projects.forEach((project, index) => {
  //     result[index % ROW_COUNT].push(project);
  //   });

  //   return result;
  // }, [projects]);
  const rows = useMemo(() => {
    // shuffle projects first
    const shuffled = [...projects].sort(() => Math.random() - 0.5);

    const result = Array.from({ length: ROW_COUNT }, () => []);

    shuffled.forEach((project, index) => {
      result[index % ROW_COUNT].push(project);
    });

    return result;
  }, [projects]);

  return (
    <>
      <div className={styles.scrollArea}>
        <div className={styles.rows}>
          {rows.map((row, index) => (
            <MarqueeRow
              key={index}
              projects={row}
              direction={index % 2 === 0 ? "ltr" : "rtl"}
              // speed={[55, 38, 62][index]} //different speed for each row
              speed={40 + index} //same speed
              onProjectClick={setExpandedProject}
            />
          ))}
        </div>
      </div>

      <ExpandedProjectModal
        project={expandedProject}
        onClose={() => setExpandedProject(null)}
      />
    </>
  );
}
