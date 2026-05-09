import styles from "./ExpandedProjectModal.module.css";

export default function ExpandedProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {project.type === "video" ? (
          <video
            src={project.src}
            controls
            autoPlay
            muted
            loop
            className={styles.media}
          />
        ) : (
          <img src={project.src} alt="" className={styles.media} />
        )}
      </div>
    </div>
  );
}
