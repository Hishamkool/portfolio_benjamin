import { useState } from 'react';
import ProjectItem from './ProjectItem';
import styles from './ProjectGrid.module.css';

/**
 * ProjectGrid
 *
 * A CSS grid that supports individual item expansion.
 * Expanded items span 2 columns × 2 rows.
 *
 * Props:
 *   projects - filtered array of project objects
 */
export default function ProjectGrid({ projects }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className={styles.scrollArea}>
      <div className={styles.grid}>
        {projects.map(project => (
          <ProjectItem
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
