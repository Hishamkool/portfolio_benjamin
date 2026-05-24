import { useEffect, useRef, useState } from "react";

import styles from "./AboutPage.module.css";

import AboutHeroSection from "./sections/hero/AboutHeroSection";
import AboutDetailsSection from "./sections/details/AboutDetailsSection";
import AboutCarouselSection from "./sections/carousel/AboutCarouselSection";

export default function AboutPage({ onClose }) {
  const scrollRef = useRef(null);

  const heroImageWrapRef = useRef(null);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const scroller = scrollRef.current;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const heroHeight = window.innerHeight;

          const progress = Math.min(scroller.scrollTop / heroHeight, 1);

          const scale = 1 - progress * 0.28;

          if (heroImageWrapRef.current) {
            heroImageWrapRef.current.style.transform = `scale(${scale})`;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    scroller.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.modal}>
        <div className={styles.blurLayer} />

        <header className={styles.topbar}>
          <div className={styles.pill}>About the Artist</div>

          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </header>

        <main ref={scrollRef} className={styles.scroll}>
          <AboutHeroSection heroImageWrapRef={heroImageWrapRef} />

          <AboutDetailsSection />

          <AboutCarouselSection current={current} setCurrent={setCurrent} />
        </main>
      </div>
    </div>
  );
}
