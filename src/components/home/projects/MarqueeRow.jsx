import ProjectItem from "./ProjectItem";
import styles from "./MarqueeRow.module.css";

export default function MarqueeRow({
  projects,
  direction,
  speed,
  onProjectClick,
}) {
  const duplicated = [...projects, ...projects];

  return (
    <div className={styles.rowWrapper}>
      <div
        className={`${styles.track} ${
          direction === "ltr" ? styles.ltr : styles.rtl
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicated.map((project, index) => (
          <ProjectItem
            key={`${project.id}-${index}`}
            project={project}
            variant="marquee"
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    </div>
  );
}
