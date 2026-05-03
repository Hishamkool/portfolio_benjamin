import { useRef, useCallback } from "react";
import ParallaxLayer from "./ParallaxLayer";
import CloudLayer from "./CloudLayer";
import TextCard from "./TextCard";
import {
  useParallaxScroll,
  calcLayerOffset,
  calcZoomScale,
  calcTextOpacity,
  calcCloudPosition,
} from "../../hooks/useParallaxScroll";
import {
  LAYERS,
  CLOUDS,
  TEXT_CARDS,
  BACKGROUND_CONFIG,
} from "../../data/parallaxConfig";
import styles from "./ParallaxScene.module.css";

/**
 * ParallaxScene
 *
 * The main parallax orchestrator. Holds refs to all DOM elements
 * and drives them imperatively on each animation frame for buttery
 * 60fps performance — no React state updates during scroll.
 *
 * Props:
 *   ctaRef    - ref to the CTA button (so this hook can drive its opacity too)
 */
export default function ParallaxScene({ ctaRef }) {
  // Create refs for each layer, cloud, and text card
  const layerRefs = useRef(LAYERS.map(() => ({ current: null })));
  const cloudRefs = useRef(CLOUDS.map(() => ({ current: null })));
  const textRefs = useRef(TEXT_CARDS.map(() => ({ current: null })));

  // This callback runs every animation frame
  const onFrame = useCallback(
    (progress) => {
      const vh = window.innerHeight;
      const zoom = calcZoomScale(progress);

      // --- Drive image layers ---
      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i]?.current;
        if (!el) return;
        const offsetY = calcLayerOffset(
          progress,
          layer.speed,
          layer.baseRange,
          vh,
        );
        // Deeper layers zoom less, front layers zoom more
        const depthFactor = 0.7 + (i / LAYERS.length) * 0.5;
        const layerZoom = 1 + (zoom - 1) * depthFactor;
        el.style.transform = `translate(-50%, calc(-50% + ${offsetY}px)) scale(${layerZoom})`;
      });

      // --- Drive clouds ---
      CLOUDS.forEach((cloud, i) => {
        const el = cloudRefs.current[i]?.current;
        if (!el) return;
        const { x, y } = calcCloudPosition(progress, cloud);
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
      });

      // --- Drive text card opacity ---
      TEXT_CARDS.forEach((card, i) => {
        const el = textRefs.current[i]?.current;
        if (!el) return;
        el.style.opacity = calcTextOpacity(
          progress,
          card.fadeStart,
          card.fadeEnd,
        );
      });

      // --- Drive CTA button opacity ---
      if (ctaRef?.current) {
        let btnOpacity = 0;
        if (progress >= 0.7) {
          const t = Math.min(1, (progress - 0.7) / 0.2);
          btnOpacity = Math.sin((t * Math.PI) / 2);
        }
        ctaRef.current.style.opacity = btnOpacity;
      }
    },
    [ctaRef],
  );

  useParallaxScroll(onFrame);

  // return (
  //   <div className={styles.scene}>
  //     {/* Fixed background (layer 8) handled via CSS on body */}

  //     {/* Render all layers in order */}
  //     {LAYERS.map((layer, i) => (
  //       <ParallaxLayer
  //         key={layer.id}
  //         src={layer.src}
  //         layerRef={layerRefs.current[i]}
  //       />
  //     ))}

  //     {/* Render clouds */}
  //     {CLOUDS.map((cloud, i) => (
  //       <CloudLayer
  //         key={cloud.id}
  //         src={cloud.src}
  //         width={cloud.width}
  //         opacity={cloud.opacity}
  //         cloudRef={cloudRefs.current[i]}
  //       />
  //     ))}

  //     {/* Render text cards */}
  //     {TEXT_CARDS.map((card, i) => (
  //       <TextCard
  //         key={card.id}
  //         content={card.content}
  //         variant={card.variant}
  //         cardRef={textRefs.current[i]}
  //       />
  //     ))}
  //   </div>
  // );
  return (
    <div className={styles.scene}>
      {/* ── LAYER 7 (back) ── */}
      <ParallaxLayer src={LAYERS[0].src} layerRef={layerRefs.current[0]} />

      {/* ── CLOUD 1 (between 7 and text1) ── */}
      <CloudLayer {...CLOUDS[0]} cloudRef={cloudRefs.current[0]} />

      {/* ── TEXT 1 (between layer7 and layer6) ── */}
      <TextCard {...TEXT_CARDS[0]} cardRef={textRefs.current[0]} />

      {/* ── LAYER 6 ── */}
      <ParallaxLayer src={LAYERS[1].src} layerRef={layerRefs.current[1]} />

      {/* ── CLOUD 2 (between 6 and text2) ── */}
      <CloudLayer {...CLOUDS[1]} cloudRef={cloudRefs.current[1]} />

      {/* ── TEXT 2 (between layer6 and layer5) ── */}
      <TextCard {...TEXT_CARDS[1]} cardRef={textRefs.current[1]} />

      {/* ── LAYER 5 ── */}
      <ParallaxLayer src={LAYERS[2].src} layerRef={layerRefs.current[2]} />

      {/* ── CLOUD 3 (between 5 and text3) ── */}
      <CloudLayer {...CLOUDS[2]} cloudRef={cloudRefs.current[2]} />

      {/* ── TEXT 3 (between layer5 and layer4) ── */}
      <TextCard {...TEXT_CARDS[2]} cardRef={textRefs.current[2]} />

      {/* ── LAYER 4 ── */}
      <ParallaxLayer src={LAYERS[3].src} layerRef={layerRefs.current[3]} />

      {/* ── LAYER 2 ── */}
      <ParallaxLayer src={LAYERS[4].src} layerRef={layerRefs.current[4]} />

      {/* ── LAYER 3 ── */}
      <ParallaxLayer src={LAYERS[5].src} layerRef={layerRefs.current[5]} />

      {/* ── LAYER 1 (front) ── */}
      <ParallaxLayer src={LAYERS[6].src} layerRef={layerRefs.current[6]} />
    </div>
  );
}
