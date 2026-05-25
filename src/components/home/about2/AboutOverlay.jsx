// import React from "react";
// import styles from "./AboutOverlay.module.css";
// export default function AboutOverlay() {
//   return (
//     <div className={styles.backdrop}>
//       <div className={styles.overlay}>
//         {/* HEADER */}
//         <div className={styles.header}>
//           {/* about the artist container */}
//           <div className={styles.textContainer}>
//             <div className={styles.flexRow}>
//               {/* <img
//                   style={{ display: "inline" }}
//                   src="/assets/about/icons/about_person.svg"
//                   alt="person"
//                 /> */}
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7.99997 8.5C10.628 8.5 13.3246 10.2087 13.4993 13.6413C13.506 13.7737 13.4599 13.9032 13.3712 14.0016C13.2824 14.1 13.1583 14.1591 13.026 14.166C11.6393 14.2367 5.21731 14.28 2.97464 14.166C2.84221 14.1593 2.71788 14.1002 2.62899 14.0018C2.5401 13.9034 2.49393 13.7738 2.50064 13.6413C2.67531 10.2093 5.37198 8.5 7.99997 8.5ZM7.99997 2.5C7.33693 2.5 6.70105 2.76339 6.23221 3.23223C5.76337 3.70107 5.49997 4.33696 5.49997 5C5.49997 5.66304 5.76337 6.29893 6.23221 6.76777C6.70105 7.23661 7.33693 7.5 7.99997 7.5C8.66302 7.5 9.2989 7.23661 9.76774 6.76777C10.2366 6.29893 10.5 5.66304 10.5 5C10.5 4.33696 10.2366 3.70107 9.76774 3.23223C9.2989 2.76339 8.66302 2.5 7.99997 2.5Z"
//                   fill="#162C72"
//                 />
//               </svg>
//               <span className={styles.textCnt_text}>ABOUT THE ARTIST</span>
//             </div>
//           </div>

//           {/* SOCIAL LINKS */}

//           <div className={styles.socialLinks}>
//             <img src="/assets/about/icons/instagram.svg" alt="" />
//             <img src="/assets/about/icons/linkedin.svg" alt="" />
//           </div>
//         </div>

//         {/* IMAGE AND ITS GRADIENT */}
//         <div className={styles.linearGradient}></div>
//         <div className={styles.characterContainer}>
//           <img
//             src="/assets/about/characters/benjamin_char.png"
//             alt="Benjamin"
//             className={styles.character}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";

/* ─── Inline global styles injected once ─── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Nunito:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');

:root {
  --card-bg:            rgba(255,255,255,0.62);
  --card-bg-hover:      rgba(255,255,255,0.90);
  --card-border:        rgba(255,255,255,0.88);
  --card-border-hover:  rgba(255,255,255,1);
  --card-shadow:        0 4px 22px rgba(90,150,220,0.13),0 1.5px 6px rgba(90,150,220,0.08);
  --card-shadow-hover:  0 12px 40px rgba(59,130,212,0.22),0 2px 10px rgba(59,130,212,0.13);
  --blue-icon:   #3b82d4;
  --blue-grad:   linear-gradient(135deg,#4a9edd,#2563ae);
  --blue-accent: #1e73d0;
  --blue-link:   #2563ae;
  --date-color:  #3b82d4;
  --text-dark:   #1a2f4a;
  --text-mid:    #3a5a7a;
  --text-soft:   #5a7898;
  --text-muted:  #8aaac8;
  --tag-border:  rgba(59,130,212,0.32);
  --r-xl: 22px;
  --r-lg: 16px;
  --r-md: 12px;
  --r-sm: 8px;
}

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

html, body {
  font-family:'Nunito',sans-serif;
  height:100%; overflow:hidden;
  background:linear-gradient(160deg,#c8dcf0 0%,#d8eaf8 45%,#c4d8ee 100%);
}

.benji-bg-fixed {
  position:fixed; inset:0; z-index:0;
  pointer-events:none; overflow:hidden;
}
.benji-bokeh {
  position:absolute; border-radius:50%;
  filter:blur(50px); opacity:.44;
  animation:driftBok linear infinite;
}
.b1{width:260px;height:260px;background:rgba(255,255,255,.7); top:4%;left:1%;  animation-duration:26s}
.b2{width:180px;height:180px;background:rgba(200,228,252,.8); top:55%;left:4%; animation-duration:33s;animation-delay:-9s}
.b3{width:340px;height:340px;background:rgba(255,255,255,.5); top:8%;right:2%; animation-duration:29s;animation-delay:-13s}
.b4{width:150px;height:150px;background:rgba(180,215,248,.7); top:68%;right:6%;animation-duration:23s;animation-delay:-5s}
.b5{width:200px;height:200px;background:rgba(255,255,255,.55);top:32%;left:42%;animation-duration:36s;animation-delay:-17s}
@keyframes driftBok{
  0%{transform:translate(0,0)} 33%{transform:translate(18px,-28px)}
  66%{transform:translate(-12px,12px)} 100%{transform:translate(0,0)}
}
.benji-snow-wrap{position:absolute;inset:0}
.benji-flake{
  position:absolute;
  inset:0;
  pointer-events:none;
}
.benji-shell {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow: auto;
  pointer-events: auto;
}
.benji-topbar-pill {
  display:flex;align-items:center;gap:7px;
  padding:6px 16px;
  background:rgba(255,255,255,.7);
  border:1.5px solid rgba(255,255,255,.95);
  border-radius:20px;
  font-family:'Outfit',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:.15em;text-transform:uppercase;color:var(--text-mid);
  box-shadow:0 2px 7px rgba(80,140,200,.12);
}
.benji-topbar-socials{display:flex;gap:9px;}

/* MODAL */
.benji-modal {
  width:100%; max-width:1060px;
  height:85vh;
  max-height:85vh;
  background:rgba(218,234,252,0.50);
  backdrop-filter:blur(30px);
  -webkit-backdrop-filter:blur(30px);
  border:1.5px solid rgba(255,255,255,.84);
  border-radius:var(--r-xl);
  box-shadow:0 8px 48px rgba(80,140,200,.22),0 2px 10px rgba(80,140,200,.12),
             inset 0 1.5px 0 rgba(255,255,255,.92);
  display:flex; flex-direction:column;
  overflow:hidden;
  position:relative;
  opacity:1 !important;
  transform:none !important;
  animation:none !important;
}

/* TOPBAR */
.benji-topbar {
  flex-shrink:0;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:13px 26px 11px;
  border-bottom:1px solid rgba(255,255,255,.6);
  background:rgba(255,255,255,.18);
  position:relative;
}
.benji-topbar-pill {
  display:flex;align-items:center;gap:7px;
  padding:6px 16px;
  background:rgba(255,255,255,.7);
  border:1.5px solid rgba(255,255,255,.95);
  border-radius:20px;
  font-family:'Outfit',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:.15em;text-transform:uppercase;color:var(--text-mid);
  box-shadow:0 2px 7px rgba(80,140,200,.12);
  z-index:1;
}
.benji-topbar-pill i{color:var(--blue-icon)}
.benji-topbar-socials{
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  display:flex;
  gap:9px;
  z-index:1;
}
.benji-topbar-socials a{
  width:36px;height:36px;border-radius:50%;
  background:rgba(255,255,255,.72);border:1.5px solid rgba(255,255,255,.95);
  display:flex;align-items:center;justify-content:center;
  color:var(--text-dark);font-size:15px;text-decoration:none;
  box-shadow:0 2px 7px rgba(80,140,200,.14); transition:all .22s;
}
.benji-topbar-socials a:hover{background:#fff;transform:translateY(-2px);color:var(--blue-accent);box-shadow:0 5px 16px rgba(80,140,200,.22)}

.benji-topbar-close{
  width:36px;height:36px;border-radius:50%;
  border:none;background:rgba(255,255,255,.72);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;color:var(--text-dark);
  box-shadow:0 2px 7px rgba(80,140,200,.14);transition:transform .18s,background .18s;
  position:absolute;
  right:26px;
  top:50%;
  transform:translateY(-50%);
  z-index:2;
}
.benji-topbar-close:hover{transform:translateY(calc(-50% - 2px));background:#fff;color:var(--blue-accent)}

/* FLOATING PILL BAR */
.benji-modal-pill-bar {
  position:absolute;
  bottom:18px;
  left:50%;
  transform:translateX(-50%);
  z-index:20;
  display:flex;align-items:center;
  background:rgba(255,255,255,.72);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
  border:1.5px solid rgba(255,255,255,.95);
  border-radius:30px;overflow:hidden;
  box-shadow:0 6px 24px rgba(80,140,200,.22),0 2px 8px rgba(80,140,200,.12);
}
.benji-modal-pill-bar a {
  display:flex;align-items:center;gap:8px;
  padding:9px 22px;font-size:12px;font-weight:600;
  color:var(--text-mid);text-decoration:none;
  border-right:1px solid rgba(200,220,240,.4);
  transition:background .2s;white-space:nowrap;
}
.benji-modal-pill-bar a:last-child{border-right:none}
.benji-modal-pill-bar a:hover{background:rgba(255,255,255,.95)}
.benji-modal-pill-bar i{color:var(--blue-icon);font-size:12px}

/* SCROLL CONTAINER */
.benji-modal-scroll {
  flex:1; overflow-y:auto; overflow-x:hidden;
  scroll-snap-type:y mandatory;
  overscroll-behavior-y:contain;
  scrollbar-width:thin;
  scrollbar-color:rgba(59,130,212,.22) transparent;
  scroll-padding-bottom: 0;
}
.benji-modal-scroll::-webkit-scrollbar{width:4px}
.benji-modal-scroll::-webkit-scrollbar-thumb{background:rgba(59,130,212,.22);border-radius:4px}

/* SECTION 1 — HERO */
.benji-sec-hero {
  scroll-snap-align:start;
  scroll-snap-stop:always;
  height:100%;
  min-height:500px;
  display:grid;
  grid-template-columns:1fr 400px 1fr;
  position:relative;
  overflow:hidden;
}
.benji-hero-left {
  display:flex; flex-direction:column;
  justify-content:space-between;
  padding:32px 20px 36px 32px;
}
.benji-hero-big-name {
  font-family:'Outfit',sans-serif;
  font-size:clamp(38px,4.5vw,66px);
  font-weight:800; color:var(--blue-accent);
  letter-spacing:-2px; line-height:1;
  margin-top: 120px;
}
.benji-hero-big-name span{color:var(--text-mid);font-weight:700}
.benji-skill-btns{display:flex;gap:10px;padding-bottom:160px}
.benji-skill-btn{
  width:84px;height:84px;
  background:rgba(255,255,255,.7);
  border:1.5px solid rgba(255,255,255,.95);
  border-radius:var(--r-md);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
  box-shadow:0 3px 12px rgba(80,140,200,.14);
  cursor:pointer;transition:all .24s;text-decoration:none;
}
.benji-skill-btn:hover{background:#fff;transform:translateY(-4px);box-shadow:0 8px 24px rgba(80,140,200,.24)}
.benji-skill-btn i{font-size:22px;color:var(--text-dark)}
.benji-skill-btn span{font-size:10.5px;font-weight:600;color:var(--text-mid);text-align:center;line-height:1.2}
.benji-skill-btn.active{background:rgba(255,255,255,.92);border-color:rgba(59,130,212,.3);box-shadow:0 4px 16px rgba(59,130,212,.18)}

.benji-hero-center {
  display:flex;align-items:flex-end;justify-content:center;
  position:relative; overflow:hidden;
}
.benji-hero-circle {
  position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);
  width:340px;height:340px;border-radius:50%;
  background:linear-gradient(180deg,rgba(175,212,248,.52) 0%,rgba(210,232,252,.22) 100%);
  border:1px solid rgba(255,255,255,.55);
}
.benji-hero-img {
  position:relative;z-index:2;
  height:96%;max-height:500px;width:auto;
  object-fit:contain;object-position:top;
  filter:drop-shadow(0 16px 36px rgba(37,99,174,.16));
  animation:charFloat 4s ease-in-out infinite;
  transform-origin:bottom center;
  will-change:transform;
}
.benji-hero-img-wrap {
  position:relative;z-index:2;
  height:96%;max-height:500px;
  display:flex;align-items:flex-end;justify-content:center;
  transform-origin:bottom center;
  will-change:transform;
}
@keyframes charFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}

.benji-hero-right {
  display:flex;flex-direction:column;
  justify-content:flex-end;
  padding:32px 32px 40px 16px;
}
.benji-bubble {
  background:rgba(255,255,255,.72);
  border:1.5px solid rgba(255,255,255,.95);
  border-radius:var(--r-lg);
  padding:18px 20px;
  box-shadow:0 4px 20px rgba(80,140,200,.14);
  font-size:13px;color:var(--text-mid);line-height:1.68;
  position:relative;
}
.benji-bubble::before{
  content:'';position:absolute;left:-10px;bottom:28px;
  width:0;height:0;
  border-top:8px solid transparent;border-bottom:8px solid transparent;
  border-right:10px solid rgba(255,255,255,.95);
}
.benji-scroll-hint {
  position:absolute;bottom:10px;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:3px;
  pointer-events:none;
  animation:bounce 2s ease-in-out infinite;
  transition:opacity .3s;
}
.benji-scroll-hint span{font-size:9.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-mid)}
.benji-scroll-hint i{color:var(--blue-icon);font-size:13px}
@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(5px)}}

.benji-sec-divider{
  height:1px;background:rgba(255,255,255,.55);
  flex-shrink:0;
  scroll-snap-align:none;
}

/* SECTION 2 — DETAIL */
.benji-sec-detail {
  scroll-snap-align:start;
  scroll-snap-stop:always;
  height:100%;
  min-height:100%;
  display:grid;
  grid-template-columns:260px 1fr 272px;
  grid-template-rows:1fr;
  align-items:stretch;
  overflow:hidden;
}
.benji-col-left  {border-right:1px solid rgba(255,255,255,.55); display:flex;flex-direction:column;padding:12px;gap:10px;overflow:hidden;}
.benji-col-right {border-left: 1px solid rgba(255,255,255,.55); display:flex;flex-direction:column;padding:12px;gap:10px;overflow:hidden;}
.benji-col-center{display:flex;flex-direction:column;align-items:center;padding:20px 18px 16px;position:relative;overflow:hidden;}

/* CARDS */
.benji-card{
  background:var(--card-bg);
  backdrop-filter:blur(18px);
  border:1.5px solid var(--card-border);
  border-radius:var(--r-lg);
  box-shadow:var(--card-shadow);
  display:flex;flex-direction:column;
  overflow:hidden;
  min-height:0;
  transition:background .28s,border-color .28s,box-shadow .28s,transform .28s;
}
.benji-card:hover{
  background:var(--card-bg-hover);
  border-color:var(--card-border-hover);
  box-shadow:var(--card-shadow-hover);
  transform:translateY(-3px) scale(1.008);
}
.benji-projects-card{ flex:1; min-height:0; }
.benji-edu-card     { flex:0 0 255px; }
.benji-exp-card  { flex:1; min-height:0; }
.benji-skills-card{ flex:0 0 175px; }

.benji-card-header{
  display:flex;align-items:center;gap:10px;
  padding:11px 14px 9px;
  border-bottom:1px solid rgba(200,220,240,.35);
  flex-shrink:0;
}
.benji-badge{
  width:32px;height:32px;border-radius:50%;
  background:var(--blue-grad);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:12px;flex-shrink:0;
  box-shadow:0 3px 10px rgba(37,99,174,.3);
}
.benji-card-title{
  font-family:'Outfit',sans-serif;font-size:10.5px;font-weight:700;
  letter-spacing:.12em;text-transform:uppercase;color:var(--text-dark);
}
.benji-card-body{
  padding:9px 13px 12px;
  overflow-y:auto;flex:1;min-height:0;
  scrollbar-width:thin;
  scrollbar-color:rgba(59,130,212,.2) transparent;
}
.benji-card-body::-webkit-scrollbar{width:3px}
.benji-card-body::-webkit-scrollbar-thumb{background:rgba(59,130,212,.2);border-radius:4px}

.benji-proj-item{display:flex;gap:9px;padding:7px 0;border-bottom:1px solid rgba(180,210,240,.25)}
.benji-proj-item:last-child{border-bottom:none}
.benji-proj-icon{
  width:28px;height:28px;border-radius:50%;flex-shrink:0;margin-top:1px;
  background:rgba(59,130,212,.1);border:1.5px solid rgba(59,130,212,.2);
  display:flex;align-items:center;justify-content:center;color:var(--blue-icon);font-size:11px;
  transition:background .22s,border-color .22s;
}
.benji-card:hover .benji-proj-icon{background:rgba(59,130,212,.18);border-color:rgba(59,130,212,.38)}
.benji-proj-text{font-size:11.5px;color:var(--text-mid);line-height:1.55}
.benji-proj-text strong{color:var(--blue-link);font-weight:600}

.benji-edu-item{display:flex;gap:9px;padding:8px 0;border-bottom:1px solid rgba(180,210,240,.25)}
.benji-edu-item:last-child{border-bottom:none;padding-bottom:4px}
.benji-dot-col{display:flex;flex-direction:column;align-items:center;padding-top:5px;flex-shrink:0}
.benji-dot{width:8px;height:8px;border-radius:50%;background:var(--blue-icon);box-shadow:0 0 0 3px rgba(59,130,212,.18);flex-shrink:0}
.benji-dot-line{width:1.5px;flex:1;min-height:6px;background:rgba(59,130,212,.18);margin-top:4px}
.benji-edu-school{font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:700;color:var(--text-dark);margin-bottom:1px}
.benji-edu-date{font-size:10.5px;color:var(--date-color);font-weight:600;margin-bottom:3px}
.benji-edu-desc{font-size:10.5px;color:var(--text-soft);line-height:1.5}
.benji-edu-card .benji-card-body{overflow-y:auto;flex:1;min-height:0;}

.benji-exp-item{display:flex;gap:9px;padding:8px 0;border-bottom:1px solid rgba(180,210,240,.25)}
.benji-exp-item:last-child{border-bottom:none}
.benji-exp-title{font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;color:var(--text-dark);margin-bottom:1px}
.benji-exp-date{font-size:10.5px;color:var(--date-color);font-weight:600;margin-bottom:3px}
.benji-exp-desc{font-size:10.5px;color:var(--text-soft);line-height:1.55}

.benji-skills-wrap{
  display:flex;flex-wrap:wrap;gap:7px;
  padding:10px 13px 12px;
  align-content:flex-start;
  overflow-y:auto;
  flex:1; min-height:0;
}
.benji-skills-card .benji-card-body{ display:none; }
.benji-skills-card{ display:flex; flex-direction:column; }

.benji-skill-tag{
  padding:5px 14px;
  background:rgba(255,255,255,.82);
  border:1.5px solid var(--tag-border);
  border-radius:20px;
  font-size:11px;font-weight:600;color:var(--text-dark);
  box-shadow:0 2px 6px rgba(80,140,200,.09);transition:all .2s;cursor:default;
}
.benji-card:hover .benji-skill-tag{background:rgba(255,255,255,.96)}
.benji-skill-tag:hover{background:rgba(59,130,212,.12)!important;border-color:var(--blue-icon);color:var(--blue-accent);transform:translateY(-1px)}

.benji-about-badge{font-family:'Outfit',sans-serif;font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--text-mid);margin-bottom:2px}
.benji-detail-name{font-family:'Outfit',sans-serif;font-size:46px;font-weight:800;color:var(--blue-accent);line-height:1;margin-bottom:5px;letter-spacing:-1.5px}
.benji-detail-role{font-size:12.5px;font-weight:600;color:var(--text-dark);margin-bottom:3px;text-align:center}
.benji-detail-tagline{font-size:11px;color:var(--text-soft);text-align:center;font-style:italic;line-height:1.6;margin-bottom:8px}
.benji-char-wrap{flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center;position:relative;min-height:220px}
.benji-rings{position:absolute;top:50%;left:50%;transform:translate(-50%,-48%);pointer-events:none}
.benji-ring{
  position:absolute;border-radius:50%;
  border:1.5px solid rgba(59,130,212,.17);
  top:50%;left:50%;transform:translate(-50%,-50%);
  animation:breathe 3.5s ease-in-out infinite;
}
.benji-ring:nth-child(1){width:210px;height:210px;animation-delay:0s}
.benji-ring:nth-child(2){width:160px;height:160px;animation-delay:.65s;border-color:rgba(59,130,212,.26)}
.benji-ring:nth-child(3){width:110px;height:110px;animation-delay:1.3s;border-color:rgba(59,130,212,.38)}
.benji-ring-glow{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:210px;height:210px;border-radius:50%;
  background:radial-gradient(circle,rgba(180,215,248,.36) 0%,transparent 72%);
  animation:breathe 3.5s ease-in-out infinite;
}
@keyframes breathe{0%,100%{opacity:.6;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.046)}}

.benji-char-img-detail{
  position:relative;z-index:2;
  height:300px;width:auto;
  object-fit:contain;object-position:top;
  filter:drop-shadow(0 20px 44px rgba(37,99,174,.2));
  animation:charFloat 4s ease-in-out infinite;
  transform-origin:bottom center;
  transform:scale(0.82);
  opacity:0;
  transition:transform .55s cubic-bezier(.34,1.2,.64,1), opacity .45s ease;
}
.benji-char-img-detail.zoomed-in{
  transform:scale(1);
  opacity:1;
}

/* ─── SECTION 3 — CAROUSEL (fixed) ─── */
.benji-sec-carousel {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  /* pill bar is ~44px tall + 18px from bottom of modal = ~62px overlap zone; pad enough so stage clears it */
  padding: 20px 0 80px;
}

.benji-car-header {
  text-align: center;
  flex-shrink: 0;
  z-index: 2;
  position: relative;
  padding: 0 20px;
}
.benji-car-eyebrow { font-family:'Outfit',sans-serif; font-size:9px; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:var(--text-mid); margin-bottom:4px; }
.benji-car-title { font-family:'Outfit',sans-serif; font-size:clamp(30px,3.8vw,50px); font-weight:800; color:var(--blue-accent); letter-spacing:-1.5px; line-height:1; margin-bottom:5px; }
.benji-car-title span { color:var(--text-mid); position: relative; top: 30%; }
.benji-car-subtitle { font-size:11px; color:var(--text-soft); font-style:italic; line-height:1.6; max-width:420px; margin:0 auto; }

/* FIX: stage fills remaining space, no extra bottom padding */
.benji-car-stage {
  flex: 1;
  width: 100%;
  position: relative;
  min-height: 0;
  overflow: hidden;
}

.benji-car-glow {
  position:absolute; bottom:0; left:50%; transform:translateX(-50%);
  width:360px; height:360px; border-radius:50%;
  background:radial-gradient(circle, rgba(180,215,248,.42) 0%, transparent 70%);
  pointer-events:none; z-index:1;
  animation:breathe 3.5s ease-in-out infinite;
}

/* All chars share left:50% as anchor — only transform changes, enabling GPU-smooth transitions */
.benji-car-char {
  position: absolute;
  bottom: 148px;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  /* Explicit props only — never "all" which causes glitches */
  transition:
    transform 0.52s cubic-bezier(0.34, 1.05, 0.64, 1),
    opacity   0.40s ease;
  cursor: pointer;
  will-change: transform, opacity;
}

.benji-car-char img {
  display: block;
  width: auto;
  object-fit: contain;
  object-position: bottom;
  transition:
    max-height 0.52s cubic-bezier(0.34, 1.05, 0.64, 1),
    filter     0.40s ease,
    opacity    0.40s ease;
  transform-origin: bottom center;
}

/* ACTIVE — centred, full size */
.benji-car-char.active {
  transform: translateX(-50%) scale(1);
  z-index: 4;
  opacity: 1;
  pointer-events: auto;
}
.benji-car-char.active img {
  max-height: calc(85vh - 418px);
  min-height: 180px;
  height: auto;
  opacity: 1;
  filter: drop-shadow(0 22px 44px rgba(37,99,174,.26));
  animation: charFloatSmall 4s ease-in-out infinite;
}
@keyframes charFloatSmall {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

/* PREV — slide left via translateX only, no left/right property change */
.benji-car-char.prev {
  transform: translateX(calc(-50% - 34vw)) scale(0.68);
  z-index: 2;
  opacity: 0.52;
  pointer-events: auto;
}
.benji-car-char.prev img {
  max-height: min(26vh, 165px);
  height: auto;
  opacity: 1;
  filter: drop-shadow(0 8px 16px rgba(37,99,174,.1)) grayscale(.25);
  animation: none;
}

/* NEXT — slide right via translateX only */
.benji-car-char.next {
  transform: translateX(calc(-50% + 34vw)) scale(0.68);
  z-index: 2;
  opacity: 0.52;
  pointer-events: auto;
}
.benji-car-char.next img {
  max-height: min(26vh, 165px);
  height: auto;
  opacity: 1;
  filter: drop-shadow(0 8px 16px rgba(37,99,174,.1)) grayscale(.25);
  animation: none;
}

/* HIDDEN — collapse back to centre and fade, never teleport */
.benji-car-char.hidden {
  transform: translateX(-50%) scale(0.55);
  opacity: 0;
  pointer-events: none;
  z-index: 0;
}

/* role card sits 16px from the bottom of the stage; stage has 80px padding-bottom so it clears the pill bar */
.benji-car-role-card {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: flex;
  align-items: stretch;
  background: rgba(255,255,255,.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255,255,255,.96);
  border-radius: 26px;
  box-shadow: 0 8px 32px rgba(80,140,200,.22), 0 2px 8px rgba(80,140,200,.1);
  overflow: hidden;
  min-width: 360px;
}

.benji-car-nav-btn {
  flex-shrink: 0;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-mid);
  font-size: 14px;
  transition: background .2s, color .2s;
}
.benji-car-nav-btn:hover { background: rgba(59,130,212,.08); color: var(--blue-accent); }

.benji-car-role-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px 13px;
  border-left: 1px solid rgba(200,220,240,.4);
  border-right: 1px solid rgba(200,220,240,.4);
  gap: 8px;
}
.benji-car-tools {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}
.benji-car-tool-icon {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,.85);
  border: 1.5px solid rgba(255,255,255,.95);
  box-shadow: 0 2px 10px rgba(80,140,200,.16);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
  transition: transform .22s, box-shadow .22s;
  cursor: default;
}
.benji-car-tool-icon:hover { transform: translateY(-2px) scale(1.1); box-shadow: 0 6px 18px rgba(80,140,200,.26); }
.benji-car-role-text { text-align: center; }
.benji-car-role-title {
  font-family: 'Outfit', sans-serif;
  font-size: 14px; font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 2px;
}
.benji-car-role-desc {
  font-size: 10.5px;
  color: var(--text-soft);
  font-style: italic;
  line-height: 1.5;
}

/* side character labels */
.benji-car-char-label {
  font-family: 'Outfit', sans-serif;
  font-size: 10px; font-weight: 600;
  color: var(--text-muted);
  letter-spacing: .06em;
  text-align: center;
  white-space: nowrap;
  opacity: 0;
  transition: opacity .4s;
  margin-top: 4px;
}
.benji-car-char.prev .benji-car-char-label,
.benji-car-char.next .benji-car-char-label { opacity: .7; }

/* MOBILE */
@media (max-width: 768px) {
  html, body { overflow: auto; }
  .benji-shell { padding: 10px; align-items: flex-start; }
  .benji-modal { max-height: none; height: auto; min-height: 100vh; border-radius: 20px; }
  .benji-modal-scroll { overflow-y: visible; scroll-snap-type: none; }
  .benji-topbar { padding: 12px 14px; flex-wrap: wrap; gap: 10px; }
  .benji-topbar-pill { font-size: 9px; padding: 6px 12px; }
  .benji-topbar-socials a { width: 32px; height: 32px; font-size: 13px; }
  .benji-topbar-pill { position: static; transform: none; }
  .benji-topbar-socials { position: static; left: auto; top: auto; transform: none; }
  .benji-sec-hero { height: auto !important; min-height: auto !important; grid-template-columns: 1fr; padding: 24px 0 70px; }
  .benji-hero-left { order: 1; padding: 10px 20px; align-items: center; gap: 20px; }
  .benji-hero-big-name { text-align: center; font-size: clamp(34px, 12vw, 52px); }
  .benji-skill-btns { justify-content: center; flex-wrap: wrap; }
  .benji-skill-btn { width: 74px; height: 74px; }
  .benji-hero-center { order: 2; min-height: 320px; padding: 20px 0 0; }
  .benji-hero-circle { width: 260px; height: 260px; bottom: 0; }
  .benji-hero-img { max-height: 360px; }
  .benji-hero-right { order: 3; padding: 12px 20px 0; }
  .benji-bubble { font-size: 12px; line-height: 1.7; }
  .benji-bubble::before { display: none; }
  .benji-scroll-hint { display: none; }
  .benji-sec-detail { height: auto !important; grid-template-columns: 1fr; grid-template-rows: auto; overflow: visible; }
  .benji-col-left, .benji-col-center, .benji-col-right { border: none; padding: 12px; overflow: visible; }
  .benji-col-center { order: -1; padding-top: 26px; }
  .benji-detail-name { font-size: 36px; text-align: center; }
  .benji-detail-role { text-align: center; }
  .benji-detail-tagline { max-width: 280px; }
  .benji-char-wrap { min-height: 260px; }
  .benji-char-img-detail { height: 240px; opacity: 1 !important; transform: scale(1) !important; }
  .benji-projects-card, .benji-edu-card, .benji-exp-card, .benji-skills-card { flex: unset; height: auto; min-height: auto; }
  .benji-card-body, .benji-skills-wrap { overflow: visible; }
  .benji-sec-carousel { height: auto !important; padding: 30px 0 120px; }
  .benji-car-title { font-size: clamp(28px, 10vw, 42px); }
  .benji-car-subtitle { font-size: 10px; max-width: 300px; }
  .benji-car-stage { min-height: 480px; }
  .benji-car-char.active img { max-height: 260px; }
  .benji-car-char.prev { transform: translateX(calc(-50% - 36vw)) scale(0.62); opacity: .38; }
  .benji-car-char.next { transform: translateX(calc(-50% + 36vw)) scale(0.62); opacity: .38; }
  .benji-car-char.prev img, .benji-car-char.next img { max-height: 120px; }
  .benji-car-role-card { width: calc(100% - 14px); min-width: unset; max-width: 420px; bottom: 16px; }
  .benji-car-role-inner { padding: 12px 10px; }
  .benji-car-tool-icon { width: 32px; height: 32px; font-size: 13px; }
  .benji-car-role-title { font-size: 13px; }
  .benji-car-role-desc { font-size: 10px; }
  .benji-modal-pill-bar { position: fixed; bottom: 10px; left: 10px; right: 10px; transform: none; width: auto; border-radius: 18px; }
  .benji-modal-pill-bar a { flex: 1; justify-content: center; padding: 10px 8px; font-size: 10px; gap: 6px; }
  .benji-modal-pill-bar i { font-size: 10px; }
  .benji-card-title { font-size: 10px; }
  .benji-proj-text, .benji-exp-desc, .benji-edu-desc { font-size: 11px; }
  .benji-exp-title, .benji-edu-school { font-size: 11.5px; }
  .benji-skill-tag { font-size: 10px; padding: 5px 12px; }
}

@media (max-width: 480px) {
  .benji-hero-big-name { font-size: 30px; }
  .benji-detail-name { font-size: 30px; }
  .benji-hero-img { max-height: 300px; }
  .benji-char-img-detail { height: 210px; }
  .benji-car-char.active img { height: 220px; }
  .benji-car-stage { min-height: 420px; }
  .benji-modal-pill-bar a span { display: none; }
  .benji-modal-pill-bar a { padding: 11px 0; }
}
`;

/* ─── Data ─── */
const CAR_DATA = [
  {
    role: "Artist",
    desc: '"Creative visionary bringing imagination to life"',
    image: "/assets/about/characters/benjamin_char.png",
    tools: [
      { icon: "fas fa-palette", color: "#8e44ad", title: "Krita" },
      { icon: "fas fa-pen-nib", color: "#2563ae", title: "Procreate" },
      { icon: "fas fa-layer-group", color: "#001d6e", title: "Photoshop" },
      { icon: "fas fa-paint-brush", color: "#c0392b", title: "Clip Studio" },
    ],
  },
  {
    role: "Motion Artist",
    desc: '"Crafting fluid animations and cinematic motion graphics"',
    image: "/assets/about/characters/benjamin_char2.png",
    tools: [
      { icon: "fas fa-film", color: "#6c2dd4", title: "After Effects" },
      { icon: "fas fa-cube", color: "#e87d0d", title: "Blender" },
      { icon: "fas fa-video", color: "#0a7d9e", title: "Premiere Pro" },
      { icon: "fas fa-magic", color: "#27ae60", title: "Motion" },
      { icon: "fas fa-layer-group", color: "#001d6e", title: "Photoshop" },
    ],
  },
  {
    role: "3D Artist",
    desc: '"Specialized in modeling, texturing, and real-time assets"',
    image: "/assets/about/characters/benjamin_char3.png",
    tools: [
      { icon: "fas fa-cube", color: "#e87d0d", title: "Blender" },
      { icon: "fas fa-gamepad", color: "#1a1a2e", title: "Unreal Engine" },
      { icon: "fas fa-project-diagram", color: "#0a7d9e", title: "Maya" },
      { icon: "fas fa-layer-group", color: "#001d6e", title: "Photoshop" },
    ],
  },
  {
    role: "Digital Artist",
    desc: '"Fusing traditional art sensibility with digital mastery"',
    image: "/assets/about/characters/benjamin_char.png",
    tools: [
      { icon: "fas fa-pen-nib", color: "#2563ae", title: "Procreate" },
      { icon: "fas fa-layer-group", color: "#001d6e", title: "Photoshop" },
      { icon: "fas fa-palette", color: "#8e44ad", title: "Krita" },
      { icon: "fas fa-vector-square", color: "#e67e22", title: "Illustrator" },
    ],
  },
];

const CAR_LABELS = ["Artist", "Motion Artist", "3D Artist", "Digital Artist"];

/* ─── Snow component ─── */
function Snow() {
  const flakes = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    dur: Math.random() * 14 + 10,
    delay: Math.random() * 20,
    left: Math.random() * 100,
    op: Math.random() * 0.55 + 0.28,
  }));
  return (
    <div className="benji-snow-wrap">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="benji-flake"
          style={{
            width: f.size,
            height: f.size,
            left: `${f.left}%`,
            top: "-10px",
            opacity: f.op,
            animationDuration: `${f.dur}s`,
            animationDelay: `-${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Carousel Section ─── */
function CarouselSection({ height }) {
  const [current, setCurrent] = useState(0);
  const total = CAR_DATA.length;

  const goTo = (idx) => setCurrent(((idx % total) + total) % total);

  function charClass(i) {
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;
    if (i === current) return "benji-car-char active";
    if (i === prev) return "benji-car-char prev";
    if (i === next) return "benji-car-char next";
    return "benji-car-char hidden";
  }

  const d = CAR_DATA[current];

  return (
    <div className="benji-sec-carousel" style={{ height }}>
      <div className="benji-car-header">
        <div className="benji-car-eyebrow">About the Artist</div>
        <div className="benji-car-title">
          Benjamin <span>cs</span>
        </div>
        <div className="benji-car-subtitle">
          Each version showcases a different area of Benjamin's expertise,
          <br />
          highlighting his skills across art, design, 3D, and motion.
        </div>
      </div>

      <div className="benji-car-stage">
        <div className="benji-car-glow" />

        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={charClass(i)}
            onClick={() => {
              if (i !== current) goTo(i);
            }}
          >
            <img
              src={
                CAR_DATA[i]?.image ||
                "/assets/about/characters/benjamin_char.png"
              }
              alt={CAR_LABELS[i]}
            />
            <div className="benji-car-char-label">{CAR_LABELS[i]}</div>
          </div>
        ))}

        <div className="benji-car-role-card">
          <button
            className="benji-car-nav-btn"
            onClick={() => goTo(current - 1)}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <div className="benji-car-role-inner">
            <div className="benji-car-tools">
              {d.tools.map((t, ti) => (
                <div
                  key={ti}
                  className="benji-car-tool-icon"
                  title={t.title}
                  style={{ color: t.color }}
                >
                  <i className={t.icon} />
                </div>
              ))}
            </div>
            <div className="benji-car-role-text">
              <div className="benji-car-role-title">{d.role}</div>
              <div className="benji-car-role-desc">{d.desc}</div>
            </div>
          </div>
          <button
            className="benji-car-nav-btn"
            onClick={() => goTo(current + 1)}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Portfolio Component ─── */
export default function BenjiPortfolio({ onClose }) {
  const scrollRef = useRef(null);
  const heroWrapRef = useRef(null);
  const detailImgRef = useRef(null);
  const secDetailRef = useRef(null);

  const [hintOpacity, setHintOpacity] = useState(0.45);
  const [heroScale, setHeroScale] = useState(1);
  const [detailZoomed, setDetailZoomed] = useState(false);
  const [sectionHeight, setSectionHeight] = useState("100%");
  const [activeSkill, setActiveSkill] = useState(2);

  /* Inject global CSS once */
  useEffect(() => {
    const id = "benji-global-css";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
    const faId = "benji-fa";
    if (!document.getElementById(faId)) {
      const link = document.createElement("link");
      link.id = faId;
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(link);
    }
  }, []);

  /* Sync section heights to scroll container */
  useEffect(() => {
    function sync() {
      if (scrollRef.current) {
        setSectionHeight(scrollRef.current.clientHeight + "px");
      }
    }
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  /* Scroll handler */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function onScroll() {
      const scrolled = el.scrollTop;
      const heroH = el.querySelector(".benji-sec-hero")?.offsetHeight || 1;
      setHintOpacity(scrolled > 20 ? 0 : 0.45);
      const progress = Math.min(scrolled / heroH, 1);
      setHeroScale(1 - progress * 0.28);
      setDetailZoomed(progress >= 0.98);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const skillBtns = [
    { icon: "fas fa-palette", label: "3D Art" },
    { icon: "fas fa-gamepad", label: "Game Art" },
    { icon: "fas fa-pen-nib", label: "Concept Art" },
  ];

  return (
    <div className="benji-shell">
      {/* Fixed BG */}
      <div className="benji-bg-fixed">
        <div className="benji-bokeh b1" />
        <div className="benji-bokeh b2" />
        <div className="benji-bokeh b3" />
        <div className="benji-bokeh b4" />
        <div className="benji-bokeh b5" />
        <Snow />
      </div>

      <div className="benji-modal">
        {/* Topbar */}
        <div className="benji-topbar">
          <div className="benji-topbar-pill">
            <i className="fas fa-user-circle" /> About the Artist
          </div>
          <div className="benji-topbar-socials">
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
          </div>
          <button
            type="button"
            className="benji-topbar-close"
            onClick={() => {
              if (typeof onClose === "function") onClose();
            }}
            aria-label="Close modal"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Scroll area */}
        <div className="benji-modal-scroll" ref={scrollRef}>
          {/* ── SECTION 1: HERO ── */}
          <div
            className="benji-sec-hero"
            style={{ height: sectionHeight, minHeight: "500px" }}
          >
            <div className="benji-hero-left">
              <div className="benji-hero-big-name">
                Benjamin <span>cs</span>
              </div>
              <div className="benji-skill-btns">
                {skillBtns.map((b, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`benji-skill-btn${activeSkill === i ? " active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSkill(i);
                    }}
                  >
                    <i className={b.icon} />
                    <span>{b.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="benji-hero-center">
              <div className="benji-hero-circle" />
              <div
                ref={heroWrapRef}
                className="benji-hero-img-wrap"
                style={{
                  transform: `scale(${heroScale})`,
                  transformOrigin: "bottom center",
                }}
              >
                <img
                  className="benji-hero-img"
                  src="/assets/about/characters/benjamin_char.png"
                  alt="Benjamin CS"
                />
              </div>
            </div>

            <div className="benji-hero-right">
              <div className="benji-bubble">
                Hey everyone! I'm Benji —<br />a passionate 3D Game Artist and
                Concept Artist who loves bringing stories to life through
                characters, worlds, and creative design. I'm highly dedicated,
                deadline-friendly, and always focused on delivering my best
                work. Let's create something amazing together!
              </div>
            </div>

            <div className="benji-scroll-hint" style={{ opacity: hintOpacity }}>
              <span>Scroll</span>
              <i className="fas fa-chevron-down" />
            </div>
          </div>

          <div className="benji-sec-divider" />

          {/* ── SECTION 2: DETAIL ── */}
          <div
            className="benji-sec-detail"
            ref={secDetailRef}
            style={{ height: sectionHeight }}
          >
            {/* Left */}
            <div className="benji-col-left">
              <div className="benji-card benji-projects-card">
                <div className="benji-card-header">
                  <div className="benji-badge">
                    <i className="fas fa-layer-group" />
                  </div>
                  <div className="benji-card-title">
                    Projects &amp; Achievements
                  </div>
                </div>
                <div className="benji-card-body">
                  {[
                    {
                      icon: "fas fa-film",
                      text: (
                        <>
                          Created 2D lyrical animations and promotional visuals
                          for <strong>Aromal Chekaver.</strong>
                        </>
                      ),
                    },
                    {
                      icon: "fas fa-tshirt",
                      text: (
                        <>
                          Designed branding materials and{" "}
                          <strong>100+ T-shirt designs</strong> for the clothing
                          brand <strong>NAKED.</strong>
                        </>
                      ),
                    },
                    {
                      icon: "fas fa-music",
                      text: (
                        <>
                          Created cover art and visuals for emerging{" "}
                          <strong>Malayalam music artists.</strong>
                        </>
                      ),
                    },
                    {
                      icon: "fas fa-cube",
                      text: (
                        <>
                          Developed <strong>3D models</strong> and explored
                          different texturing workflows for creative projects.
                        </>
                      ),
                    },
                    {
                      icon: "fas fa-pen-nib",
                      text: (
                        <>
                          Produced <strong>concept art</strong> for indie
                          studios and independent clients worldwide.
                        </>
                      ),
                    },
                  ].map((p, i) => (
                    <div key={i} className="benji-proj-item">
                      <div className="benji-proj-icon">
                        <i className={p.icon} />
                      </div>
                      <div className="benji-proj-text">{p.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="benji-card benji-edu-card">
                <div className="benji-card-header">
                  <div className="benji-badge">
                    <i className="fas fa-graduation-cap" />
                  </div>
                  <div className="benji-card-title">Education</div>
                </div>
                <div className="benji-card-body">
                  <div className="benji-edu-item">
                    <div className="benji-dot-col">
                      <div className="benji-dot" />
                      <div className="benji-dot-line" />
                    </div>
                    <div>
                      <div className="benji-edu-school">
                        Mahatma Gandhi University &nbsp;BA Animation &amp;
                        Graphic Design
                      </div>
                      <div className="benji-edu-date">2022 – 2025</div>
                      <div className="benji-edu-desc">
                        5th Rank Holder. Strong foundation in 3D art, animation,
                        lighting, visual storytelling and 2D concept art.
                      </div>
                    </div>
                  </div>
                  <div className="benji-edu-item">
                    <div className="benji-dot-col">
                      <div className="benji-dot" />
                    </div>
                    <div>
                      <div className="benji-edu-school">
                        Asian Institute of Design (AID)
                      </div>
                      <div className="benji-edu-date">MAY 2022 – 2025</div>
                      <div className="benji-edu-desc">
                        Focused on 3D game art, character &amp; environment
                        modeling, texturing, lighting. Skilled in
                        highpoly/lowpoly modeling &amp; optimization workflows.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center */}
            <div className="benji-col-center">
              <div className="benji-about-badge">About the Artist</div>
              <div className="benji-detail-name">Benji</div>
              <div className="benji-detail-role">
                3D Game Artist &amp; Concept Artist
              </div>
              <div className="benji-detail-tagline">
                I bring ideas to life through art.
                <br />
                From characters full of personality
                <br />
                to immersive worlds that tell a story.
              </div>
              <div className="benji-char-wrap">
                <div className="benji-rings">
                  <div className="benji-ring-glow" />
                  <div className="benji-ring" />
                  <div className="benji-ring" />
                  <div className="benji-ring" />
                </div>
                <img
                  ref={detailImgRef}
                  className={`benji-char-img-detail${detailZoomed ? " zoomed-in" : ""}`}
                  src="/assets/about/characters/benjamin_char.png"
                  alt="Benji"
                />
              </div>
            </div>

            {/* Right */}
            <div className="benji-col-right">
              <div className="benji-card benji-exp-card">
                <div className="benji-card-header">
                  <div className="benji-badge">
                    <i className="fas fa-briefcase" />
                  </div>
                  <div className="benji-card-title">Experience</div>
                </div>
                <div className="benji-card-body">
                  {[
                    {
                      title: "Egllu Studio | 3D Animation Intern",
                      date: "April 2024 – May 2025",
                      desc: "Worked on 3D animation projects, creating 3D props and 2D animatics with a focus on visual storytelling, quality, and detail in a fast-paced studio environment.",
                      line: true,
                    },
                    {
                      title: "Naked Lifestyle Brand | Fashion Graphic Designer",
                      date: "May 2025 – Present",
                      desc: "Currently designing trend-focused T-shirt visuals, apparel graphics, and branding materials including logos, brochures, posters, and mockups for a clothing brand.",
                      line: true,
                    },
                    {
                      title: "2D Animator & Lyric Video Designer | Freelancer",
                      date: "June 2025 – Present",
                      desc: "Freelance designer creating lyrical animations, cover art, thumbnails, and 2D visuals for indie-pop artist Aromal Chekaver and other clients.",
                      line: false,
                    },
                  ].map((e, i) => (
                    <div key={i} className="benji-exp-item">
                      <div className="benji-dot-col">
                        <div className="benji-dot" />
                        {e.line && <div className="benji-dot-line" />}
                      </div>
                      <div>
                        <div className="benji-exp-title">{e.title}</div>
                        <div className="benji-exp-date">{e.date}</div>
                        <div className="benji-exp-desc">{e.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="benji-card benji-skills-card">
                <div className="benji-card-header">
                  <div className="benji-badge">
                    <i className="fas fa-star" />
                  </div>
                  <div className="benji-card-title">Skills</div>
                </div>
                <div className="benji-card-body" />
                <div className="benji-skills-wrap">
                  {[
                    "3D Modeling",
                    "Visual Design & Art",
                    "Software Skills",
                    "Visual Development",
                    "Character Design",
                    "Animation",
                    "Branding",
                    "Concept Art",
                    "Blender",
                    "Photoshop",
                  ].map((s, i) => (
                    <span key={i} className="benji-skill-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="benji-sec-divider" />

          {/* ── SECTION 3: CAROUSEL ── */}
          <CarouselSection height={sectionHeight} />
        </div>
        {/* /modal-scroll */}

        {/* Floating pill bar */}
        <div className="benji-modal-pill-bar">
          <a href="mailto:kpminishaji007@gmail.com">
            <i className="fas fa-envelope" />{" "}
            <span>kpminishaji007@gmail.com</span>
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt" /> <span>India</span>
          </a>
          <a href="#">
            <i className="fas fa-download" /> <span>Download CV</span>
          </a>
        </div>
      </div>
      {/* /modal */}
    </div>
  );
}
