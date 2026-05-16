import { useEffect, useRef, useState, memo } from "react";

import styles from "./ProjectItem.module.css";

import { getMediaType } from "../../../utils/getMediaType";

function ProjectItem({
  project,
  isExpanded,
  onToggle,
  onClick,
  variant = "grid",
}) {
  const [hovered, setHovered] = useState(false);

  const videoRef = useRef(null);

  const type = getMediaType(project.src);

  // ============================================================
  // PLAY VIDEO ONLY WHEN VISIBLE
  // ============================================================

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const video = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.4,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [type]);

  return (
    <div
      className={`
      ${styles.item}
      ${isExpanded ? styles.expanded : ""}
      ${variant === "marquee" ? styles.marqueeItem : styles.gridItem}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (variant === "grid" && onToggle) {
          onToggle();
        } else if (onClick) {
          onClick();
        }
      }}
    >
      {type === "video" ? (
        <video
          ref={videoRef}
          src={project.src}
          muted
          loop
          playsInline
          preload="metadata"
          className={styles.media}
        />
      ) : (
        <img
          src={project.src}
          alt=""
          className={styles.media}
          draggable={false}
          loading="lazy"
        />
      )}

      {/* Expand button only for classic grid */}
      {variant === "grid" && onToggle && (
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

export default memo(ProjectItem);
