// src/components/parallax/ParallaxScene.jsx

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
import { LAYERS, CLOUDS, TEXT_CARDS } from "../../data/parallaxConfig";
import styles from "./ParallaxScene.module.css";

export default function ParallaxScene({ ctaRef }) {
  // One ref slot per layer — LAYERS now has 8 items (index 0–7)
  const layerRefs = useRef(LAYERS.map(() => ({ current: null })));
  const cloudRefs = useRef(CLOUDS.map(() => ({ current: null })));
  const textRefs = useRef(TEXT_CARDS.map(() => ({ current: null })));

  // const onFrame = useCallback(
  //   (progress) => {
  //     const vh = window.innerHeight;
  //     const zoom = calcZoomScale(progress);

  //     // Drive ALL 8 image layers
  //     LAYERS.forEach((layer, i) => {
  //       const el = layerRefs.current[i]?.current;
  //       if (!el) return;
  //       const offsetY = calcLayerOffset(
  //         progress,
  //         layer.speed,
  //         layer.baseRange,
  //         vh,
  //       );
  //       const depthFactor = 0.7 + (i / LAYERS.length) * 0.5;
  //       const layerZoom = 1 + (zoom - 1) * depthFactor;
  //       el.style.transform = `translate(-50%, calc(-50% + ${offsetY}px)) scale(${layerZoom})`;
  //     });

  //     // Drive clouds
  //     CLOUDS.forEach((cloud, i) => {
  //       const el = cloudRefs.current[i]?.current;
  //       if (!el) return;
  //       const { x, y } = calcCloudPosition(progress, cloud);
  //       el.style.left = `${x}%`;
  //       el.style.top = `${y}%`;
  //     });

  //     // Drive text opacity
  //     TEXT_CARDS.forEach((card, i) => {
  //       const el = textRefs.current[i]?.current;
  //       if (!el) return;
  //       el.style.opacity = calcTextOpacity(
  //         progress,
  //         card.fadeStart,
  //         card.fadeEnd,
  //       );
  //     });

  //     // Drive CTA button
  //     if (ctaRef?.current) {
  //       let btnOpacity = 0;
  //       if (progress >= 0.7) {
  //         const t = Math.min(1, (progress - 0.7) / 0.2);
  //         btnOpacity = Math.sin((t * Math.PI) / 2);
  //       }
  //       ctaRef.current.style.opacity = btnOpacity;
  //     }
  //   },
  //   [ctaRef],
  // );
  const onFrame = useCallback(
    (progress) => {
      const vh = window.innerHeight;
      const zoom = calcZoomScale(progress);

      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i]?.current;
        if (!el) return;

        let offsetY = calcLayerOffset(
          progress,
          layer.speed,
          layer.baseRange,
          vh,
        );
        const depthFactor = 0.7 + (i / LAYERS.length) * 0.5;
        const layerZoom = 1 + (zoom - 1) * depthFactor;

        // ── BOTTOM CLAMP — prevents gap appearing at bottom ──
        // ── BOTTOM CLAMP — prevents gap at bottom ──
        if (layer.sticksToBottom) {
          const imageHeight = el.naturalHeight * (el.width / el.naturalWidth);
          // ↑ actual rendered height based on natural aspect ratio at current width

          const imageHalfHeight = (imageHeight * layerZoom) / 2;
          const minOffsetY = vh / 2 - imageHalfHeight;
          offsetY = Math.max(offsetY, minOffsetY);
        }

        // ── CAVE REVEAL — layer1 slides down at end of scroll ──
        if (layer.isForeground && progress > 0.65) {
          const caveProgress = (progress - 0.65) / 0.35;
          const eased = 1 - Math.pow(1 - caveProgress, 2);
          const caveSlide = eased * vh * 0.8;
          offsetY += caveSlide; // intentional slide — no clamp applied here
        }

        el.style.transform = `translate(-50%, calc(-50% + ${offsetY}px)) scale(${layerZoom})`;
      });

      // Clouds
      CLOUDS.forEach((cloud, i) => {
        const el = cloudRefs.current[i]?.current;
        if (!el) return;
        const { x, y } = calcCloudPosition(progress, cloud);
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
      });

      // Text cards
      TEXT_CARDS.forEach((card, i) => {
        const el = textRefs.current[i]?.current;
        if (!el) return;
        el.style.opacity = calcTextOpacity(
          progress,
          card.fadeStart,
          card.fadeEnd,
        );
      });

      // CTA button — fades in inside the cave
      if (ctaRef?.current) {
        let btnOpacity = 0;
        if (progress >= 0.75) {
          const t = Math.min(1, (progress - 0.75) / 0.2);
          btnOpacity = Math.sin((t * Math.PI) / 2);
        }
        ctaRef.current.style.opacity = btnOpacity;
      }
    },
    [ctaRef],
  );
  useParallaxScroll(onFrame);

  return (
    <div className={styles.scene}>
      {/* ── LAYER 8 index=0 — big cloud/bg behind mountains, slow parallax ── */}
      <ParallaxLayer src={LAYERS[0].src} layerRef={layerRefs.current[0]} />

      {/* ── LAYER 7 index=1 — furthest mountain layer ── */}
      <ParallaxLayer src={LAYERS[1].src} layerRef={layerRefs.current[1]} />

      {/* ── CLOUD 1 — between layer7 and text1 ── */}
      <CloudLayer {...CLOUDS[0]} cloudRef={cloudRefs.current[0]} />

      {/* ── TEXT 1 — between layer7 and layer6 ── */}
      <TextCard {...TEXT_CARDS[0]} cardRef={textRefs.current[0]} />

      {/* ── LAYER 6 index=2 ── */}
      <ParallaxLayer src={LAYERS[2].src} layerRef={layerRefs.current[2]} />

      {/* ── CLOUD 2 — between layer6 and text2 ── */}
      <CloudLayer {...CLOUDS[1]} cloudRef={cloudRefs.current[1]} />

      {/* ── TEXT 2 — between layer6 and layer5 ── */}
      <TextCard {...TEXT_CARDS[1]} cardRef={textRefs.current[1]} />

      {/* ── LAYER 5 index=3 ── */}
      <ParallaxLayer src={LAYERS[3].src} layerRef={layerRefs.current[3]} />

      {/* ── CLOUD 3 — between layer5 and text3 ── */}
      <CloudLayer {...CLOUDS[2]} cloudRef={cloudRefs.current[2]} />

      {/* ── TEXT 3 — between layer5 and layer4 ── */}
      <TextCard {...TEXT_CARDS[2]} cardRef={textRefs.current[2]} />

      {/* ── LAYER 4 index=4 ── */}
      <ParallaxLayer src={LAYERS[4].src} layerRef={layerRefs.current[4]} />

      {/* ── LAYER 2 index=5 ── */}
      <ParallaxLayer src={LAYERS[5].src} layerRef={layerRefs.current[5]} />

      {/* ── LAYER 3 index=6 ── */}
      <ParallaxLayer src={LAYERS[6].src} layerRef={layerRefs.current[6]} />

      {/* ── LAYER 1 index=7 — front/closest layer ── */}
      <ParallaxLayer src={LAYERS[7].src} layerRef={layerRefs.current[7]} />
    </div>
  );
}
