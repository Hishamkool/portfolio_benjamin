import styles from "./AboutDetailsSection.module.css";

export default function AboutDetailsSection() {
  return (
    <section className={styles.aboutSection}>
      <aside className={styles.glassCard}>
        <div className={styles.cardTitle}>Projects & Achievements</div>

        <div className={styles.list}>
          <div className={styles.listItem}>
            Created lyrical animations and visuals.
          </div>

          <div className={styles.listItem}>Designed 100+ T-shirt graphics.</div>

          <div className={styles.listItem}>Developed 3D models and assets.</div>
        </div>
      </aside>

      <div className={styles.centerCharacter}>
        <div className={styles.centerRings} />

        <img
          src="/assets/about/characters/benjamin_char.png"
          alt="Benjamin"
          className={styles.centerImage}
        />

        <div className={styles.centerTitle}>
          3D Game Artist & Concept Artist
        </div>
      </div>

      <aside className={styles.glassCard}>
        <div className={styles.cardTitle}>Skills</div>

        <div className={styles.tags}>
          <span>Blender</span>

          <span>Photoshop</span>

          <span>Concept Art</span>

          <span>Branding</span>

          <span>Animation</span>
        </div>
      </aside>
    </section>
  );
}
