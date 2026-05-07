import { useState } from 'react';
import styles from './ProjectItem.module.css';

/**
 * ProjectItem
 *
 * A single project card in the grid.
 * - Normal state: 1×1 cell
 * - Expanded state: 2×2 cells (spans 2 cols + 2 rows)
 * - Expand/collapse button only visible on hover
 *
 * Props:
 *   project    - { id, src, category }
 *   isExpanded - boolean
 *   onToggle   - toggle expand/collapse
 */
export default function ProjectItem({ project, isExpanded, onToggle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${styles.item} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Project image */}
      <img
        src={project.src}
        alt=""
        className={styles.image}
        draggable={false}
      />

      {/* Expand / Collapse button — only on hover */}
      <button
        className={`${styles.expandBtn} ${hovered ? styles.visible : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label={isExpanded ? 'Collapse' : 'Expand'}
      >
        {isExpanded ? (
          // Collapse icon (arrows pointing inward)
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 2h4v4M6 14H2v-4M14 6l-4 4M2 10l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          // Expand icon (arrows pointing outward)
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
}
