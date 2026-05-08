import { useRef, useState } from "react";
import styles from "./MapItem.module.css";

/**
 * MapItem
 *
 * A clickable element on the isometric map.
 * Renders either a looping video or a static image,
 * with a floating label tag above it.
 *
 * Props:
 *   id          - unique identifier
 *   label       - text shown in the tag (e.g. "Projects")
 *   videoSrc    - path to looping mp4 video (optional)
 *   imageSrc    - fallback image if no video (optional)
 *   style       - position styles (top/left/width) passed from parent
 *   onClick     - click handler
 *   disabled    - greyed out, no click (for Services placeholder)
 */
export default function MapItem({
  label,
  videoSrc,
  imageSrc,
  style,
  onClick,
  disabled = false,
  clip, // ← add this
}) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.3; // slight speed up on hover
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  };

  return (
    <div
      className={`${styles.item} ${hovered ? styles.hovered : ""} ${disabled ? styles.disabled : ""}`}
      style={style}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating label tag */}
      <div className={styles.tag}>
        {label}
        {disabled && <span className={styles.soon}> · soon</span>}
      </div>

      {/* Video or image */}
      <div
        className={styles.media}
        style={
          clip
            ? {
                marginTop: `-${clip.top || "0%"}`,
                marginBottom: `-${clip.bottom || "0%"}`,
                overflow: "hidden",
              }
            : undefined
        }
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className={styles.video}
          />
        ) : imageSrc ? (
          <img src={imageSrc} alt={label} className={styles.image} />
        ) : null}
      </div>

      {/* Hover glow ring */}
      {!disabled && <div className={styles.glowRing} />}
    </div>
  );
}
