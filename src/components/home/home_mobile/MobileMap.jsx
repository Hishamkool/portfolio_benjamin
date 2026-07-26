import { useEffect, useRef, useState } from "react";
import styles from "./MobileMap.module.css";

export default function MobileMap() {
  const viewportRef = useRef(null);
  const mapRef = useRef(null);

  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
    scale: 2,
  });

  const dragging = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });

  const clampCamera = (x, y, scale) => {
    if (!viewportRef.current || !mapRef.current) {
      return { x, y };
    }

    const viewportWidth = viewportRef.current.clientWidth;
    const viewportHeight = viewportRef.current.clientHeight;

    const baseWidth = mapRef.current.offsetWidth;
    const baseHeight = mapRef.current.offsetHeight;

    const mapWidth = baseWidth * scale;
    const mapHeight = baseHeight * scale;

    // const mapWidth = mapRef.current.naturalWidth * scale;
    // const mapHeight = mapRef.current.naturalHeight * scale;

    let minX = viewportWidth - mapWidth;
    let minY = viewportHeight - mapHeight;

    let maxX = 0;
    let maxY = 0;

    if (mapWidth <= viewportWidth) {
      minX = maxX = (viewportWidth - mapWidth) / 2;
    }

    if (mapHeight <= viewportHeight) {
      minY = maxY = (viewportHeight - mapHeight) / 2;
    }

    return {
      x: Math.min(maxX, Math.max(minX, x)),
      y: Math.min(maxY, Math.max(minY, y)),
    };
  };

  useEffect(() => {
    const handleResize = () => {
      setCamera((prev) => {
        const pos = clampCamera(prev.x, prev.y, prev.scale);
        return { ...prev, ...pos };
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerDown = (e) => {
    dragging.current = true;

    lastPoint.current = {
      x: e.clientX,
      y: e.clientY,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;

    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;

    lastPoint.current = {
      x: e.clientX,
      y: e.clientY,
    };

    setCamera((prev) => {
      const next = clampCamera(prev.x + dx, prev.y + dy, prev.scale);

      return {
        ...prev,
        x: next.x,
        y: next.y,
      };
    });
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className={styles.page}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className={styles.map}
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`,
          }}
        >
          <img
            ref={mapRef}
            src="/assets/home/empty_map_bg.png"
            alt="Portfolio Map"
            className={styles.mapImage}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
