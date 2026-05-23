import { useState } from "react";
import styles from "./AboutCharacterCarousel.module.css";

export default function AboutCharacterCarousel({
  onCharacterChange,
  activeCharacter,
}) {
  const characters = [
    {
      id: "benjamin",
      name: "Benjamin",
      role: "Creative Developer",
      image: "/assets/about/characters/benjamin_char.png",
    },
    {
      id: "elena",
      name: "Elena",
      role: "UI/UX Designer",
      image: "/assets/about/characters/elena_char.png",
    },
    {
      id: "marcus",
      name: "Marcus",
      role: "3D Artist",
      image: "/assets/about/characters/marcus_char.png",
    },
    {
      id: "sophia",
      name: "Sophia",
      role: "Motion Designer",
      image: "/assets/about/characters/sophia_char.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + characters.length) % characters.length;
    setCurrentIndex(newIndex);
    onCharacterChange(characters[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % characters.length;
    setCurrentIndex(newIndex);
    onCharacterChange(characters[newIndex].id);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselHeader}>
        <h2>Meet the Characters</h2>
        <p>Discover each unique personality</p>
      </div>

      <div className={styles.carouselContainer}>
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={handlePrevious}
          aria-label="Previous character"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className={styles.carouselContent}>
          <div className={styles.characterImageWrapper}>
            <img
              src={characters[currentIndex].image}
              alt={characters[currentIndex].name}
              className={styles.carouselCharacterImage}
            />
          </div>

          <div className={styles.characterInfo}>
            <h3 className={styles.characterName}>
              {characters[currentIndex].name}
            </h3>
            <p className={styles.characterRole}>
              {characters[currentIndex].role}
            </p>
          </div>

          <div className={styles.carouselIndicators}>
            {characters.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ""}`}
                onClick={() => {
                  setCurrentIndex(index);
                  onCharacterChange(characters[index].id);
                }}
                aria-label={`Go to character ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={handleNext}
          aria-label="Next character"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.carouselBackground}>
        <div className={styles.gradientOrb}></div>
      </div>
    </div>
  );
}
