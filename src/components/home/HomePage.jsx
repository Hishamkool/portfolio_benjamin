import { useState } from "react";
import MapItem from "./MapItem";
import styles from "./HomePage.module.css";

/**
 * HomePage
 *
 * The isometric snow map with clickable elements.
 * Positions are based on the Figma design — adjust
 * top/left/width values in MAP_ITEMS to match exactly.
 *
 * Props:
 *   onProjectsClick    - opens projects overlay
 *   onAboutClick       - opens about overlay
 *   onContactClick     - opens contact overlay
 */

// ============================================================
// MAP ITEMS CONFIG
// Adjust top/left/width to match your Figma positions exactly
// All values are percentages of the map container
// ============================================================
const MAP_ITEMS = [
  {
    id: "projects",
    label: "Projects",
    videoSrc: "/assets/home/house_turn.mp4",
    // Position: cabin — top-left area
    position: { top: "22%", left: "13%", width: "220px" },
  },
  {
    id: "about",
    label: "About the artist",
    videoSrc: "/assets/home/boy_playing.mp4",
    // Position: person — center area
    position: { top: "28%", left: "33%", width: "160px" },
  },
  {
    id: "services",
    label: "Services",
    videoSrc: null,
    imageSrc: null,
    // Position: building — center-right area
    position: { top: "18%", left: "58%", width: "240px" },
    disabled: true, // placeholder — coming soon
  },
  {
    id: "contact",
    label: "Contact",
    videoSrc: "/assets/home/ship_loop.mp4",
    // Position: ship — top-right area
    position: { top: "12%", left: "78%", width: "220px" },
  },
];

export default function HomePage({
  onProjectsClick,
  onAboutClick,
  onContactClick,
}) {
  const handleClick = (id) => {
    if (id === "projects" && onProjectsClick) onProjectsClick();
    if (id === "about" && onAboutClick) onAboutClick();
    if (id === "contact" && onContactClick) onContactClick();
  };

  return (
    <div className={styles.page}>
      {/* Snow map background */}
      <div className={styles.mapContainer}>
        <img
          src="/assets/home/map_bg.png"
          alt="Portfolio Map"
          className={styles.mapBg}
          draggable={false}
        />

        {/* Render all map items */}
        {MAP_ITEMS.map((item) => (
          <MapItem
            key={item.id}
            label={item.label}
            videoSrc={item.videoSrc}
            imageSrc={item.imageSrc}
            style={item.position}
            onClick={() => handleClick(item.id)}
            disabled={item.disabled}
          />
        ))}
      </div>
    </div>
  );
}
