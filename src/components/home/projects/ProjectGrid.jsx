// THIS IS ACTUALLY MARQUEE PROJECT GALLARY USED FOR ALL PROJECTS , NOT GRID ANYMORE

import { useMemo, useState } from "react";
import MarqueeRow from "./MarqueeRow";
import ExpandedProjectModal from "./ExpandedProjectModal";
import styles from "./ProjectGrid.module.css";

const ITEMS_PER_ROW = 6;

export default function ProjectGrid({ projects }) {
  const [expandedProject, setExpandedProject] = useState(null);

  const rows = useMemo(() => {
    const result = [];

    for (let i = 0; i < projects.length; i += ITEMS_PER_ROW) {
      result.push(projects.slice(i, i + ITEMS_PER_ROW));
    }

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
              speed={28 + index * 4}
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
