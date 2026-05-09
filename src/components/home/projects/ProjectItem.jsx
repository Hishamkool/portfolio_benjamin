import styles from "./ProjectItem.module.css";
import { getMediaType } from "../../../utils/getMediaType";

export default function ProjectItem({ project, onClick }) {
  const type = getMediaType(project.src);

  return (
    <div className={styles.item} onClick={onClick}>
      {type === "video" ? (
        <video
          className={styles.media}
          src={project.src}
          autoPlay
          muted
          loop
          playsInline
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
  );
}
