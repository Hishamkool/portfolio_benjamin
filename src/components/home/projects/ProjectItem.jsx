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

  // useEffect(() => {
  //   if (type !== "video" || !videoRef.current) return;

  //   const video = videoRef.current;

  //   let animationFrame;

  //   const checkVisibility = () => {
  //     const rect = video.getBoundingClientRect();

  //     const isVisible =
  //       rect.right > 0 &&
  //       rect.left < window.innerWidth &&
  //       rect.bottom > 0 &&
  //       rect.top < window.innerHeight;

  //     if (isVisible) {
  //       video.play().catch(() => {});
  //     } else {
  //       video.pause();
  //     }

  //     animationFrame = requestAnimationFrame(checkVisibility);
  //   };

  //   checkVisibility();

  //   return () => {
  //     cancelAnimationFrame(animationFrame);
  //     if (video.current) {
  //       videoRef.current.pause();
  //     }
  //   };
  // }, [type]);
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
        threshold: 0.35,
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
