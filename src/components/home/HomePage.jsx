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
    // videoSrc: "/assets/home/house_turn.mp4",
    position: { top: "1.2%", left: "3.5%", width: "17.9%" },

    // videoSrc: "/assets/home/house_withoutbg.webm",
    imageSrc: "/assets/home/house_jump_gif2.gif",
    // clip: { top: "40%", bottom: "50%" },
  },
  {
    id: "about",
    label: "About the artist",
    /* 
    videoSrc: "/assets/home/boy_playing.mp4",
    position: { top: "13.4%", left: "29.1%", width: "15.1%" }, 
    */

    videoSrc: "/assets/home/boy_withoutbg.webm",
    position: { top: "16.4%", left: "31.1%", width: "15.1%" },
  },
  {
    id: "services",
    label: "Services",
    videoSrc: "/assets/home/services_withoutbg.webm",
    position: { top: "20.6%", left: "47.0%", width: "31.9%" },
    imageSrc: null,

    disabled: false, // placeholder — coming soon
  },
  {
    id: "contact",
    label: "Contact",
    /* 
    videoSrc: "/assets/home/ship_loop.mp4",
    position: { top: "-10%", left: "76.9%", width: "23.1%" },
     */

    videoSrc: "/assets/home/ship_withoutbg.webm",
    position: { top: "-30%", left: "76.9%", width: "23.1%" },
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
          // src="/assets/home/map_bg.png"
          src="/assets/home/empty_map_bg.png"
          alt="Portfolio Map"
          className={styles.mapBg}
          draggable={false}
        />

        {/* Render all map items */}
        {MAP_ITEMS.map((item) => (
          <MapItem
            key={item.id}
            label={item.label}
            clip={item.clip}
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
