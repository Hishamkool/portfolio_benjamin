import { useRef, useState, memo } from "react";

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

  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const type = getMediaType(project.src);

  const handlePlayVideo = (e) => {
    e.stopPropagation();

    if (!videoRef.current) return;

    videoRef.current.play();

    setIsPlaying(true);
  };

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
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            src={project.src}
            muted
            loop
            playsInline
            preload="metadata"
            className={styles.media}
          />

          {!isPlaying && (
            <button className={styles.playButton} onClick={handlePlayVideo}>
              ▶
            </button>
          )}
        </div>
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
