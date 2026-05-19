import { useState } from "react";

import ClassicProjectItem from "./ClassicProjectItem";

import styles from "./ClassicProjectGrid.module.css";

export default function ClassicProjectGrid({ projects }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.scrollArea}>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ClassicProjectItem
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            onToggle={() => handleToggle(project.id)}
          />
        ))}
      </div>
    </div>
  );
}
