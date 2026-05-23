import styles from "./AboutCarouselSection.module.css";

import carouselData from "../../data/carouselData";

export default function AboutCarouselSection({ current, setCurrent }) {
  const prev = () => {
    setCurrent((p) => (p - 1 + carouselData.length) % carouselData.length);
  };

  const next = () => {
    setCurrent((p) => (p + 1) % carouselData.length);
  };

  return (
    <section className={styles.carouselSection}>
      <div className={styles.carouselTitle}>
        Benjamin <span>cs</span>
      </div>

      <div className={styles.carouselStage}>
        {carouselData.map((item, i) => {
          let className = styles.carouselItem;

          if (i === current) {
            className += ` ${styles.carouselActive}`;
          } else if (
            i ===
            (current - 1 + carouselData.length) % carouselData.length
          ) {
            className += ` ${styles.carouselPrev}`;
          } else if (i === (current + 1) % carouselData.length) {
            className += ` ${styles.carouselNext}`;
          } else {
            className += ` ${styles.carouselHidden}`;
          }

          return (
            <div key={i} className={className} onClick={() => setCurrent(i)}>
              <img src={item.image} alt={item.role} />
            </div>
          );
        })}
      </div>

      <div className={styles.carouselControls}>
        <button onClick={prev}>Prev</button>

        <div className={styles.carouselInfo}>
          <h3>{carouselData[current].role}</h3>

          <p>{carouselData[current].desc}</p>
        </div>

        <button onClick={next}>Next</button>
      </div>
    </section>
  );
}
