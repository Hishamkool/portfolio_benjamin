import { useRef, useState } from "react";
import ParallaxScene from "./components/parallax/ParallaxScene";
import Overlay from "./components/ui/Overlay";
import CTAButton from "./components/ui/CTAButton";
import LoadingScreen from "./components/ui/LoadingScreen";
import {
  SCROLL_CONFIG,
  BACKGROUND_CONFIG,
  LAYERS,
  CLOUDS,
} from "./data/parallaxConfig";
import "./styles/global.css";
import styles from "./App.module.css";

// Build the full list of images to preload
// Includes all layer PNGs + cloud PNGs + background
const ALL_IMAGES = [
  BACKGROUND_CONFIG.src,
  ...LAYERS.map((l) => l.src),
  ...CLOUDS.map((c) => c.src),
];

export default function App() {
  const ctaRef = useRef(null);
  const [started, setStarted] = useState(false); // false = loading screen visible
  const [fadeOut, setFadeOut] = useState(false); // triggers CSS fade-out of loader

  const handleStart = () => {
    setFadeOut(true);
    // Wait for fade-out animation, then unmount loader
    setTimeout(() => setStarted(true), 600);
  };

  return (
    <>
      {/* Loading screen — unmounted after start */}
      {!started && (
        <div
          style={{ opacity: fadeOut ? 0 : 1, transition: "opacity 0.6s ease" }}
        >
          <LoadingScreen imageSrcs={ALL_IMAGES} onComplete={handleStart} />
        </div>
      )}

      {/* Parallax scene — always mounted so images are ready, but hidden until started */}
      <div
        className={styles.app}
        style={{
          height: `${SCROLL_CONFIG.totalViewportMultiplier * 100}vh`,
          minHeight: `${SCROLL_CONFIG.totalViewportMultiplier * 1000}px`,
          backgroundImage: `url('${BACKGROUND_CONFIG.src}')`,
          // Hide until user clicks Start Now
          visibility: started ? "visible" : "hidden",
        }}
      >
        <ParallaxScene ctaRef={ctaRef} />
        <Overlay />
        <CTAButton ref={ctaRef} />
      </div>
    </>
  );
}
