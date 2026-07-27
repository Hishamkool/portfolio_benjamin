import MapItem from "../MapItem";
import styles from "./MobileMap.module.css";

export default function MobileMap({ mapItems, handleClick }) {
  return (
    <div className={styles.page}>
      <div className={styles.mapContainer}>
        <img
          src="/assets/home/mobile_map_path.png"
          alt="Portfolio Map"
          className={styles.mapImage}
          draggable={false}
        />

        {/* Map items go here later */}
        {mapItems.map((item) => {
          return (
            <MapItem
              key={item.id}
              label={item.label}
              videoSrc={item.videoSrc}
              imageSrc={item.imageSrc}
              style={item.mobile.position}
              tagPosition={item.mobile.tagPosition}
              onClick={() => handleClick(item.id)}
              disabled={item.disabled}
            />
          );
        })}
      </div>
    </div>
  );
}
