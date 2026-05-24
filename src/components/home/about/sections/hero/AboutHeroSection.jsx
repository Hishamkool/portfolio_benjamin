import styles from "./AboutHeroSection.module.css";

export default function AboutHeroSection({ heroImageWrapRef }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1>
          Benjamin <span>cs</span>
        </h1>

        <div className={styles.skillGrid}>
          <div className={styles.skillCard}>3D Art</div>

          <div className={styles.skillCard}>Game Art</div>

          <div className={`${styles.skillCard} ${styles.skillActive}`}>
            Concept Art
          </div>
        </div>
      </div>

      <div className={styles.heroCenter}>
        <div className={styles.heroCircle} />

        <div ref={heroImageWrapRef} className={styles.heroImageWrap}>
          <img
            src="/assets/about/characters/benjamin_char.png"
            alt="Benjamin"
            className={styles.heroImage}
          />
        </div>
      </div>

      <div className={styles.heroRight}>
        <div className={styles.bioCard}>
          Hey everyone! I'm Benji — a passionate 3D Game Artist and Concept
          Artist who loves bringing stories to life through characters, worlds,
          and creative design.
        </div>
      </div>
    </section>
  );
}
