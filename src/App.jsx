// src/App.jsx
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

const ALL_IMAGES = [
  BACKGROUND_CONFIG.src,
  ...LAYERS.map((l) => l.src),
  ...CLOUDS.map((c) => c.src),
];

export default function App() {
  const ctaRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false); // starts loader fade-out
  const [started, setStarted] = useState(false); // unmounts loader after fade

  const handleStart = () => {
    setFadeOut(true);
    // Unmount loader AFTER the fade completes
    // Must match the transition duration in LoadingScreen.module.css (.screen)
    setTimeout(() => setStarted(true), 600);
  };

  return (
    <>
      {/* Parallax scene — always visible underneath, no visibility toggle */}
      <div
        className={styles.app}
        style={{
          height: `${SCROLL_CONFIG.totalViewportMultiplier * 100}vh`,
          minHeight: `${SCROLL_CONFIG.totalViewportMultiplier * 1000}px`,
          backgroundImage: `url('${BACKGROUND_CONFIG.src}')`,
        }}
      >
        <ParallaxScene ctaRef={ctaRef} />
        <Overlay />
        <CTAButton ref={ctaRef} />
      </div>

      {/* Loader sits ON TOP — fades out to reveal scene beneath */}
      {!started && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 0.6s ease", // ← control fade speed here
            pointerEvents: fadeOut ? "none" : "auto",
          }}
        >
          <LoadingScreen imageSrcs={ALL_IMAGES} onComplete={handleStart} />
        </div>
      )}
    </>
  );
}
