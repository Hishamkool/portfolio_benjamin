import { useRef } from 'react';
import ParallaxScene from './components/parallax/ParallaxScene';
import Overlay from './components/ui/Overlay';
import CTAButton from './components/ui/CTAButton';
import { SCROLL_CONFIG, BACKGROUND_CONFIG } from './data/parallaxConfig';
import './styles/global.css';
import styles from './App.module.css';

/**
 * App
 *
 * Root component. Sets up:
 * - Tall scrollable body (drives the parallax)
 * - Fixed background image (layer 8)
 * - ParallaxScene (all layers, clouds, text)
 * - Overlay (vignette)
 * - CTAButton (fades in at end)
 */
export default function App() {
  const ctaRef = useRef(null);

  return (
    <div
      className={styles.app}
      style={{
        // Body height = multiplier × 100vh — controls how long the animation plays
        height: `${SCROLL_CONFIG.totalViewportMultiplier * 100}vh`,
        minHeight: `${SCROLL_CONFIG.totalViewportMultiplier * 1000}px`,
        backgroundImage: `url('${BACKGROUND_CONFIG.src}')`,
      }}
    >
      {/* All parallax layers, clouds, and text cards */}
      <ParallaxScene ctaRef={ctaRef} />

      {/* Gradient vignette overlay */}
      <Overlay />

      {/* CTA button - opacity driven by ParallaxScene */}
      <CTAButton ref={ctaRef} />

      {/* =============================================
          ADD MORE SECTIONS BELOW THIS LINE
          (e.g. <AboutSection />, <WorkSection />, etc.)
          They will appear after the parallax sequence.
          ============================================= */}
    </div>
  );
}
