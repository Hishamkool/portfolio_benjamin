import { useState } from "react";

import styles from "./ProjectItem.module.css";

import { getMediaType } from "../../../utils/getMediaType";

export default function ProjectItem({
  project,
  isExpanded,
  onToggle,
  onClick,
  variant = "grid",
}) {
  const [hovered, setHovered] = useState(false);

  const type = getMediaType(project.src);

  return (
    <div
      className={`
      ${styles.item}
${isExpanded ? styles.expanded : ""}
${variant === "marquee" ? styles.marqueeItem : styles.gridItem}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {type === "video" ? (
        <video
          src={project.src}
          muted
          autoPlay
          loop
          playsInline
          className={styles.media}
        />
      ) : (
        <img
          src={project.src}
          alt=""
          className={styles.media}
          draggable={false}
        />
      )}

      {/* Expand button only for classic grid */}
      {onToggle && (
        <button
          className={`${styles.expandBtn} ${hovered ? styles.visible : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {isExpanded ? "−" : "+"}
        </button>
      )}
    </div>
  );
}
