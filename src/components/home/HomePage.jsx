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
    // videoSrc: "/assets/home/home_withoutbg.webm", // changed to without bg version
    // Position: cabin — top-left area
    position: { top: "-4.2%", left: "3.5%", width: "22.9%" },
    // position: { top: "0%", left: "0%", width: "22.9%" },
  },
  {
    id: "about",
    label: "About the artist",
    videoSrc: "/assets/home/boy_playing.mp4",
    // videoSrc: "/assets/home/boy_withoutbg.webm",
    // Position: person — center area
    position: { top: "13.4%", left: "29.1%", width: "15.1%" },
  },
  {
    id: "services",
    label: "Services",
    videoSrc: null,
    imageSrc: null,
    // Position: building — center-right area
    position: { top: "29.6%", left: "47.0%", width: "31.9%" },
    disabled: false, // placeholder — coming soon
  },
  {
    id: "contact",
    label: "Contact",
    videoSrc: "/assets/home/ship_loop.mp4",
    // Position: ship — top-right area
    position: { top: "-10%", left: "76.9%", width: "23.1%" },
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
