import styles from "./ExpandedProjectModal.module.css";
import { getMediaType } from "../../../utils/getMediaType";

export default function ExpandedProjectModal({ project, onClose }) {
  if (!project) return null;

  const type = getMediaType(project.src);

  return (
    <div className={styles.wrapper}>
      {/* Close button */}
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
        ✕
      </button>

      {/* Click empty area to close */}
      <div className={styles.modal} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          {type === "video" ? (
            <video
              src={project.src}
              controls
              autoPlay
              loop
              playsInline
              className={styles.media}
            />
          ) : (
            <img
              src={project.src}
              alt=""
              className={styles.media}
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
