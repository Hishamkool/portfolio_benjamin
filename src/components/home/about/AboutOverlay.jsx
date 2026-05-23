import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutIntroScene from "./AboutIntroScene";
import AboutDetailsScene from "./AboutDetailsScene";
import AboutCharacterCarousel from "./AboutCharacterCarousel";
import styles from "./AboutOverlay.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutOverlay({ onClose }) {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const characterRef = useRef(null);
  const characterContainerRef = useRef(null);
  const [activeCharacter, setActiveCharacter] = useState("benjamin");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Character zoom out animation from page 1 to page 3
      gsap.fromTo(
        characterRef.current,
        {
          scale: 2.5,
          y: "30%",
        },
        {
          scale: 1,
          y: "0%",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1.5,
            onUpdate: (self) => {
              // Update current page based on scroll progress
              const page = Math.floor(self.progress * 3) + 1;
              setCurrentPage(Math.min(page, 3));
            },
          },
        },
      );

      // Pin the character container during initial zoom
      ScrollTrigger.create({
        trigger: characterContainerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.overlay}>
        {/* BACK BUTTON */}
        <button className={styles.backBtn} onClick={onClose} aria-label="Close">
          <img src="/assets/home/back_btn.svg" alt="Back" />
        </button>

        {/* SCROLL CONTENT */}
        <div className={styles.scrollContainer} ref={scrollContainerRef}>
          {/* Page 1 - Intro with character zoomed in */}
          <section className={`${styles.page} ${styles.page1}`}>
            <div
              className={styles.characterContainer}
              ref={characterContainerRef}
            >
              <div className={styles.characterWrapper} ref={characterRef}>
                <img
                  src="/assets/about/characters/benjamin_char.png"
                  alt="Benjamin"
                  className={styles.character}
                />
              </div>
            </div>
            <div className={styles.introContent}>
              <AboutIntroScene />
            </div>
          </section>

          {/* Page 2 - Details with side scrolling info */}
          <section className={`${styles.page} ${styles.page2}`}>
            <div className={styles.detailsContainer}>
              <AboutDetailsScene />
            </div>
          </section>

          {/* Page 3+ - Character in box with carousel */}
          <section className={`${styles.page} ${styles.page3}`}>
            <div className={styles.carouselContainer}>
              <div className={styles.characterBox}>
                <img
                  src={`/assets/about/characters/${activeCharacter}_char.png`}
                  alt={activeCharacter}
                  className={styles.boxedCharacter}
                />
              </div>
              <AboutCharacterCarousel
                onCharacterChange={setActiveCharacter}
                activeCharacter={activeCharacter}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
