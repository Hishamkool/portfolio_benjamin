import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  🔧 REPLACE THESE WITH YOUR EMAILJS CREDENTIALS
//     Sign up free at https://www.emailjs.com
//     1. Add Gmail service → connect csbenju76@gmail.com
//     2. Create a template with variables:
//        {{from_name}}, {{from_email}}, {{service}}, {{message}}
//     3. Paste your IDs below
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // e.g. "aBcDeFgHiJkLmNoP"

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Nunito:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');

:root {
  --blue-accent:  #1e73d0;
  --blue-deep:    #0f4fa8;
  --blue-grad:    linear-gradient(135deg,#2a7de1,#1354c4);
  --blue-light:   rgba(30,115,208,.10);
  --blue-border:  rgba(30,115,208,.18);
  --text-dark:    #0d1f3c;
  --text-mid:     #2e4a6a;
  --text-soft:    #5a7898;
  --text-muted:   #8aaac8;
  --card-bg:      rgba(255,255,255,0.78);
  --card-border:  rgba(255,255,255,0.95);
  --input-bg:     rgba(245,250,255,0.90);
  --input-border: rgba(180,210,240,0.70);
  --input-focus:  rgba(30,115,208,0.45);
  --snow-bg:      linear-gradient(160deg,#c8dcf0 0%,#d8eaf8 45%,#c4d8ee 100%);
  --r-xl: 24px;
  --r-lg: 16px;
  --r-md: 12px;
  --r-sm: 8px;
}

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

body {
  font-family:'Nunito',sans-serif;
  background: var(--snow-bg);
  min-height:100vh;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
}

.cj-bg {
  position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0;
}
.cj-bokeh {
  position:absolute;border-radius:50%;filter:blur(55px);opacity:.38;
  animation:bjDrift linear infinite;
}
.bk1{width:280px;height:280px;background:rgba(255,255,255,.75);top:2%;left:-2%;animation-duration:28s}
.bk2{width:200px;height:200px;background:rgba(190,222,252,.85);top:60%;left:2%;animation-duration:34s;animation-delay:-10s}
.bk3{width:360px;height:360px;background:rgba(255,255,255,.5);top:5%;right:-3%;animation-duration:31s;animation-delay:-15s}
.bk4{width:160px;height:160px;background:rgba(170,210,248,.7);bottom:8%;right:5%;animation-duration:25s;animation-delay:-6s}
.bk5{width:220px;height:220px;background:rgba(255,255,255,.5);top:38%;left:40%;animation-duration:38s;animation-delay:-19s}
@keyframes bjDrift{
  0%{transform:translate(0,0)}
  33%{transform:translate(20px,-30px)}
  66%{transform:translate(-14px,14px)}
  100%{transform:translate(0,0)}
}

.cj-snow{position:fixed;inset:0;pointer-events:none;z-index:0}
.cj-flake{
  position:absolute;border-radius:50%;
  background:rgba(255,255,255,.82);
  animation:bjSnow linear infinite;
}
@keyframes bjSnow{
  0%{transform:translateY(-10px) translateX(0);opacity:0}
  10%{opacity:1}
  90%{opacity:.6}
  100%{transform:translateY(100vh) translateX(30px);opacity:0}
}

.cj-shell {
  position:relative;z-index:10;
  width:90vw;max-width:1260px;
  padding:20px;
}

.cj-modal {
  width:100%;
  background:rgba(215,232,252,0.45);
  backdrop-filter:blur(28px);
  -webkit-backdrop-filter:blur(28px);
  border:1.5px solid rgba(255,255,255,.82);
  border-radius:var(--r-xl);
  box-shadow:0 12px 60px rgba(60,120,200,.20),0 2px 12px rgba(60,120,200,.10),
             inset 0 1.5px 0 rgba(255,255,255,.90);
  display:grid;
  grid-template-columns:1fr 1.15fr 220px;
  grid-template-rows:1fr;
  height:85vh;
  max-height:85vh;
  overflow:hidden;
  align-items:center;
  animation:modalIn .55s cubic-bezier(.34,1.1,.64,1) both;
  position:relative;
}
@keyframes modalIn{from{opacity:0;transform:scale(.96) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}

.cj-left {
  padding:44px 36px 44px 44px;
  display:flex;flex-direction:column;
  gap:0;
  min-height:0;

  overflow-y:auto;
}

.cj-center {
  min-height:0;
}

.cj-eyebrow {
  font-family:'Outfit',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:.22em;text-transform:uppercase;
  color:var(--blue-accent);margin-bottom:10px;
  display:flex;align-items:center;gap:8px;
}
.cj-eyebrow::after{
  content:'';flex:1;height:2px;max-width:32px;
  background:var(--blue-accent);border-radius:2px;
}

.cj-headline {
  font-family:'Outfit',sans-serif;
  font-size:clamp(30px,3.2vw,46px);
  font-weight:900;line-height:1.08;
  color:var(--text-dark);
  letter-spacing:-1.5px;
  margin-bottom:18px;
}
.cj-headline em{
  color:var(--blue-accent);font-style:normal;
}

.cj-divider{
  width:36px;height:3px;border-radius:2px;
  background:var(--blue-accent);margin-bottom:20px;
}

.cj-tagline {
  font-size:13px;color:var(--text-mid);line-height:1.72;
  margin-bottom:12px;
  max-width:280px;
}


.cj-info-card {
  background:transparent;
  border:none;
  border-radius:0;
  padding:0;
  box-shadow:none;
  margin-bottom:20px;
  flex-shrink:0;
}
.cj-info-card-header{
  display:flex;align-items:center;gap:10px;margin-bottom:14px;
}
.cj-info-badge{
  width:34px;height:34px;border-radius:50%;
  background:var(--blue-grad);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:13px;
  box-shadow:0 3px 10px rgba(37,99,174,.28);
}
.cj-info-label{
  font-family:'Outfit',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:.18em;text-transform:uppercase;color:var(--blue-accent);
}

.cj-info-row{
  display:flex;align-items:flex-start;gap:11px;padding:7px 0;
  border-bottom:1px solid rgba(180,210,240,.22);
}
.cj-info-row:last-child{border-bottom:none;padding-bottom:0}
.cj-info-icon{
  width:30px;height:30px;border-radius:50%;flex-shrink:0;
  background:rgba(30,115,208,.10);border:1.5px solid rgba(30,115,208,.18);
  display:flex;align-items:center;justify-content:center;
  color:var(--blue-accent);font-size:11px;margin-top:1px;
}
.cj-info-text strong{
  display:block;font-size:12px;font-weight:700;color:var(--text-dark);margin-bottom:1px;
}
.cj-info-text span{font-size:10.5px;color:var(--text-soft)}

.cj-socials-label{
  font-family:'Outfit',sans-serif;font-size:9.5px;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;color:var(--text-mid);
  margin-bottom:10px;
}
.cj-socials{display:flex;gap:10px;}
.cj-social-btn{
  width:42px;height:42px;border-radius:var(--r-sm);
  background:rgba(255,255,255,.72);
  border:1.5px solid rgba(255,255,255,.95);
  display:flex;align-items:center;justify-content:center;
  color:var(--blue-accent);font-size:15px;text-decoration:none;
  box-shadow:0 2px 8px rgba(80,140,200,.12);
  transition:all .22s;
}
.cj-social-btn:hover{
  background:#fff;transform:translateY(-3px);
  box-shadow:0 6px 20px rgba(80,140,200,.22);
}

.cj-center {
  background:rgba(255,255,255,.72);
  border:1.5px solid rgba(255,255,255,.95);
  border-radius:var(--r-lg);
  padding:38px 36px 38px 32px;
  display:flex;flex-direction:column;
  justify-content:center;
  align-items:flex-start;
  box-shadow:0 4px 18px rgba(80,140,200,.12);
}


.cj-form-header{
  display:flex;align-items:center;gap:14px;margin-bottom:8px;
}
.cj-form-icon{
  width:46px;height:46px;border-radius:50%;flex-shrink:0;
  background:var(--blue-grad);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:18px;
  box-shadow:0 4px 16px rgba(37,99,174,.32);
}
.cj-form-title{
  font-family:'Outfit',sans-serif;font-size:14px;font-weight:800;
  letter-spacing:.14em;text-transform:uppercase;color:var(--text-dark);
}
.cj-form-sub{
  font-size:11.5px;color:var(--text-soft);line-height:1.65;
  margin-bottom:22px;
}

.cj-form{display:flex;flex-direction:column;gap:12px;flex:1}

.cj-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}

.cj-field{
  position:relative;display:flex;flex-direction:column;
}
.cj-field-icon{
  position:absolute;left:14px;top:50%;transform:translateY(-50%);
  color:var(--text-muted);font-size:13px;pointer-events:none;
  transition:color .2s;
}
.cj-field:focus-within .cj-field-icon{color:var(--blue-accent)}

.cj-input{
  width:100%;padding:13px 14px 13px 38px;
  background:var(--input-bg);
  border:1.5px solid var(--input-border);
  border-radius:var(--r-md);
  font-family:'Nunito',sans-serif;font-size:12.5px;color:var(--text-dark);
  outline:none;transition:border-color .22s,box-shadow .22s,background .22s;
  box-shadow:0 2px 6px rgba(80,140,200,.06);
}
.cj-input::placeholder{color:var(--text-muted)}
.cj-input:focus{
  border-color:rgba(30,115,208,.55);
  box-shadow:0 0 0 3px rgba(30,115,208,.12),0 2px 8px rgba(80,140,200,.10);
  background:rgba(255,255,255,.95);
}

.cj-select-wrap{position:relative}
.cj-select-wrap .cj-field-icon-right{
  position:absolute;right:14px;top:50%;transform:translateY(-50%);
  color:var(--text-muted);font-size:12px;pointer-events:none;
}
.cj-select{
  width:100%;padding:13px 38px 13px 14px;
  appearance:none;-webkit-appearance:none;
  background:var(--input-bg);
  border:1.5px solid var(--input-border);
  border-radius:var(--r-md);
  font-family:'Nunito',sans-serif;font-size:12.5px;color:var(--text-muted);
  outline:none;transition:border-color .22s,box-shadow .22s;
  cursor:pointer;
  box-shadow:0 2px 6px rgba(80,140,200,.06);
}
.cj-select:focus{
  border-color:rgba(30,115,208,.55);
  box-shadow:0 0 0 3px rgba(30,115,208,.12);
  color:var(--text-dark);
  background:rgba(255,255,255,.95);
}
.cj-select option{color:var(--text-dark)}

.cj-textarea{
  width:100%;padding:13px 14px;
  background:var(--input-bg);
  border:1.5px solid var(--input-border);
  border-radius:var(--r-md);
  font-family:'Nunito',sans-serif;font-size:12.5px;color:var(--text-dark);
  outline:none;resize:none;min-height:100px;
  transition:border-color .22s,box-shadow .22s,background .22s;
  box-shadow:0 2px 6px rgba(80,140,200,.06);
  line-height:1.6;
}
.cj-textarea::placeholder{color:var(--text-muted)}
.cj-textarea:focus{
  border-color:rgba(30,115,208,.55);
  box-shadow:0 0 0 3px rgba(30,115,208,.12);
  background:rgba(255,255,255,.95);
}
.cj-textarea-wrap{position:relative}
.cj-textarea-icon{
  position:absolute;right:13px;bottom:13px;
  color:var(--text-muted);font-size:12px;pointer-events:none;
}

.cj-attach{
  display:flex;align-items:center;gap:12px;
  padding:11px 16px;
  background:var(--input-bg);
  border:1.5px dashed rgba(30,115,208,.28);
  border-radius:var(--r-md);
  transition:border-color .22s,background .22s;
  cursor:pointer;
}
.cj-attach:hover{border-color:rgba(30,115,208,.55);background:rgba(255,255,255,.9)}
.cj-attach-icon{color:var(--blue-accent);font-size:15px;flex-shrink:0}
.cj-attach-text strong{display:block;font-size:12px;font-weight:600;color:var(--text-dark)}
.cj-attach-text span{font-size:10.5px;color:var(--text-soft)}
.cj-browse-btn{
  margin-left:auto;flex-shrink:0;
  padding:7px 16px;
  background:rgba(255,255,255,.85);
  border:1.5px solid rgba(30,115,208,.28);
  border-radius:var(--r-sm);
  font-family:'Outfit',sans-serif;font-size:11px;font-weight:700;
  color:var(--blue-accent);cursor:pointer;
  transition:all .2s;
}
.cj-browse-btn:hover{background:#fff;border-color:var(--blue-accent);box-shadow:0 2px 10px rgba(30,115,208,.15)}

.cj-submit{
  width:100%;padding:15px;
  background:var(--blue-grad);
  border:none;border-radius:var(--r-md);
  font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;
  color:#fff;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:10px;
  box-shadow:0 6px 24px rgba(30,115,208,.38),0 2px 8px rgba(30,115,208,.2);
  transition:transform .22s,box-shadow .22s,filter .22s;
  letter-spacing:.04em;
}
.cj-submit:hover:not(:disabled){
  transform:translateY(-2px);
  box-shadow:0 10px 32px rgba(30,115,208,.46),0 2px 10px rgba(30,115,208,.26);
  filter:brightness(1.06);
}
.cj-submit:active:not(:disabled){transform:translateY(0);filter:brightness(.97)}
.cj-submit:disabled{opacity:.7;cursor:not-allowed}

.cj-secure{
  text-align:center;font-size:10.5px;color:var(--text-muted);
  display:flex;align-items:center;justify-content:center;gap:5px;margin-top:2px;
}

/* error banner */
.cj-error{
  padding:10px 14px;
  background:rgba(220,50,50,.08);
  border:1.5px solid rgba(220,50,50,.22);
  border-radius:var(--r-md);
  font-size:11.5px;color:#c0392b;
  display:flex;align-items:center;gap:8px;
}

.cj-char-panel {
  position:relative;
  display:flex;align-items:center;justify-content:center;
  overflow:visible;
  padding-bottom:0;
}
.cj-char-glow{
  position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);
  width:220px;height:220px;border-radius:50%;
  background:radial-gradient(circle,rgba(175,212,248,.55) 0%,transparent 70%);
  pointer-events:none;
  animation:glowPulse 3.5s ease-in-out infinite;
}
@keyframes glowPulse{
  0%,100%{opacity:.6;transform:translateX(-50%) scale(1)}
  50%{opacity:1;transform:translateX(-50%) scale(1.08)}
}
.cj-char-img{
  position:relative;z-index:2;
  width:100%;max-width:320px;height:auto;
  object-fit:contain;object-position:bottom;
  filter:drop-shadow(0 30px 50px rgba(37,99,174,.18));
  animation:charBob 4s ease-in-out infinite;
  transform-origin:bottom center;
  transform: translateY(8px);
}

.cj-topbar-close{
  width:36px;height:36px;border-radius:50%;
  border:none;background:rgba(255,255,255,.72);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;color:var(--text-dark);
  box-shadow:0 2px 7px rgba(80,140,200,.14);transition:transform .18s,background .18s;
  position:absolute;
  right:26px;
  top:18px;
  z-index:30;
}
.cj-topbar-close:hover{transform:translateY(-2px);background:#fff;color:var(--blue-accent)}
@keyframes charBob{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-8px)}
}

.cj-success{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:12px;text-align:center;flex:1;padding:20px;
  animation:fadeIn .4s ease;
}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.cj-success-icon{
  width:64px;height:64px;border-radius:50%;
  background:var(--blue-grad);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:26px;
  box-shadow:0 8px 28px rgba(30,115,208,.36);
  animation:popIn .5s cubic-bezier(.34,1.4,.64,1) both;
}
@keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}
.cj-success h3{font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:var(--text-dark)}
.cj-success p{font-size:12.5px;color:var(--text-soft);line-height:1.7;max-width:260px}

@media(max-width:900px){
  /* Keep desktop layout unchanged; optimize tablet */
  .cj-modal{grid-template-columns:1fr;grid-template-rows:auto;min-height:auto}
  .cj-char-panel{display:none}

  .cj-left{border-right:none;border-bottom:1px solid rgba(255,255,255,.5);padding:30px 24px}
  .cj-center{border-right:none;padding:28px 24px}

  /* Prevent content from overflowing on shorter tablet heights */
  .cj-left{max-height:60vh}
  .cj-center{max-height:60vh;overflow:auto}

  /* Make close button not cover content */
  .cj-topbar-close{right:18px;top:14px}

  .cj-headline{font-size:clamp(26px,8vw,38px)}
}

@media(max-width:560px){
  /* Mobile */
.cj-modal{height:85vh;max-height:85vh;overflow:hidden}
  .cj-shell{padding:10px}

  .cj-row{grid-template-columns:1fr}

  /* Ensure body scroll/pan works on mobile and content is not locked */
  html,body{height:auto}
  .cj-shell{min-height:0}

  /* Allow page/inner scrolling if needed */
  .cj-left{padding:22px 16px;max-height:none;overflow:visible}
  .cj-center{padding:22px 16px;max-height:none;overflow:visible}


  .cj-topbar-close{right:14px;top:12px}

  .cj-form-sub{margin-bottom:16px}
  .cj-tagline{margin-bottom:10px}
}

`;

function Snow() {
  const flakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    dur: Math.random() * 12 + 10,
    delay: Math.random() * 18,
    left: Math.random() * 100,
  }));
  return (
    <div className="cj-snow">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="cj-flake"
          style={{
            width: f.size,
            height: f.size,
            left: `${f.left}%`,
            top: 0,
            animationDuration: `${f.dur}s`,
            animationDelay: `-${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function BenjaminContact({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  // Load EmailJS SDK once
  useEffect(() => {
    const id = "cj-css";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
    const faId = "cj-fa";
    if (!document.getElementById(faId)) {
      const l = document.createElement("link");
      l.id = faId;
      l.rel = "stylesheet";
      l.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(l);
    }
    // Load EmailJS SDK
    const ejsId = "emailjs-sdk";
    if (!document.getElementById(ejsId)) {
      const script = document.createElement("script");
      script.id = ejsId;
      script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => {
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      };
      document.head.appendChild(script);
    } else if (window.emailjs) {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError("");
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    setError("");

    try {
      // Template variables — these must match your EmailJS template
      const templateParams = {
        to_email: "csbenju76@gmail.com",
        from_name: form.name,
        from_email: form.email,
        service: form.service || "Not specified",
        message: form.message,
        reply_to: form.email,
      };

      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
      );

      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(
        err?.text ||
          "Oops! Something went wrong. Please try again or email directly at csbenju76@gmail.com",
      );
    } finally {
      setLoading(false);
    }
  }

  const infoRows = [
    { icon: "fas fa-envelope", val: "csbenju76@gmail.com", label: "Email" },
    { icon: "fas fa-map-marker-alt", val: "India", label: "Location" },
    { icon: "fas fa-phone", val: "+91 6238 123 456", label: "Phone" },
    {
      icon: "fas fa-clock",
      val: "Usually replies within 24 hrs",
      label: "Response Time",
    },
  ];

  const socials = [
    { icon: "fas fa-envelope", href: "mailto:csbenju76@gmail.com" },
    { icon: "fab fa-linkedin-in", href: "#" },
    { icon: "fab fa-instagram", href: "#" },
    { icon: "fab fa-dribbble", href: "#" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="cj-bg">
        <div className="cj-bokeh bk1" />
        <div className="cj-bokeh bk2" />
        <div className="cj-bokeh bk3" />
        <div className="cj-bokeh bk4" />
        <div className="cj-bokeh bk5" />
      </div>
      <Snow />

      <div className="cj-shell">
        <div className="cj-modal">
          <button
            className="cj-topbar-close"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="fas fa-times" />
          </button>

          {/* ── LEFT ── */}
          <div className="cj-left">
            <div className="cj-eyebrow">Let's Connect</div>
            <h1 className="cj-headline">
              Let's create something <em>amazing</em> together!
            </h1>
            <div className="cj-divider" />
            <p className="cj-tagline">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
            </p>

            <div className="cj-info-card">
              <div className="cj-info-card-header">
                <div className="cj-info-badge">
                  <i className="fas fa-user" />
                </div>
                <div className="cj-info-label">Contact Info</div>
              </div>
              {infoRows.map((r, i) => (
                <div key={i} className="cj-info-row">
                  <div className="cj-info-icon">
                    <i className={r.icon} />
                  </div>
                  <div className="cj-info-text">
                    <strong>{r.val}</strong>
                    <span>{r.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cj-socials-label">Find Me On</div>
            <div className="cj-socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="cj-social-btn">
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* ── CENTER / FORM ── */}
          <div className="cj-center">
            <div className="cj-form-header">
              <div className="cj-form-icon">
                <i className="fas fa-paper-plane" />
              </div>
              <div className="cj-form-title">Send Me a Message</div>
            </div>
            <p className="cj-form-sub">
              Have a project, idea, or creative mission? I'd love to hear about
              it. Fill out the form below and I'll get back to you soon!
            </p>

            {sent ? (
              <div className="cj-success">
                <div className="cj-success-icon">
                  <i className="fas fa-check" />
                </div>
                <h3>Message Sent!</h3>
                <p>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setForm({ name: "", email: "", service: "", message: "" });
                    setFileName("");
                    setSent(false);
                    setError("");
                  }}
                  style={{
                    marginTop: 8,
                    padding: "10px 24px",
                    background: "var(--blue-grad)",
                    border: "none",
                    borderRadius: "var(--r-md)",
                    color: "#fff",
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(30,115,208,.3)",
                  }}
                >
                  Send Another
                </button>
                <button
                  onClick={onClose}
                  style={{
                    marginTop: 8,
                    padding: "10px 24px",
                    background: "transparent",
                    border: "1px solid rgba(30,115,208,.14)",
                    borderRadius: "var(--r-md)",
                    color: "var(--text-dark)",
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                    boxShadow: "none",
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="cj-form" onSubmit={handleSubmit}>
                <div className="cj-row">
                  <div className="cj-field">
                    <i className="fas fa-user cj-field-icon" />
                    <input
                      className="cj-input"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="cj-field">
                    <i className="fas fa-envelope cj-field-icon" />
                    <input
                      className="cj-input"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="cj-select-wrap">
                  <select
                    className="cj-select"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      What are you looking for?
                    </option>
                    <option value="3D Modeling & Art">3D Modeling & Art</option>
                    <option value="Concept Art">Concept Art</option>
                    <option value="Motion Graphics / Animation">
                      Motion Graphics / Animation
                    </option>
                    <option value="Branding & Graphic Design">
                      Branding & Graphic Design
                    </option>
                    <option value="Other">Other</option>
                  </select>
                  <i className="fas fa-chevron-down cj-field-icon-right" />
                </div>

                <div className="cj-textarea-wrap">
                  <textarea
                    className="cj-textarea"
                    name="message"
                    placeholder="Tell me about your project"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                  <i className="fas fa-pen cj-textarea-icon" />
                </div>

                <div
                  className="cj-attach"
                  onClick={() => fileRef.current?.click()}
                >
                  <i className="fas fa-paperclip cj-attach-icon" />
                  <div className="cj-attach-text">
                    <strong>{fileName || "Attach Files (Optional)"}</strong>
                    <span>
                      {fileName ? "File selected" : "JPG, PNG, PDF up to 10MB"}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="cj-browse-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileRef.current?.click();
                    }}
                  >
                    Browse
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    style={{ display: "none" }}
                    onChange={handleFile}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="cj-error">
                    <i className="fas fa-exclamation-circle" />
                    {error}
                  </div>
                )}

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="submit"
                    className="cj-submit"
                    disabled={loading}
                    style={{ flex: 1 }}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane" />
                        Send Message
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      padding: "14px 18px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,.06)",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>

                <div className="cj-secure">
                  <i className="fas fa-lock" style={{ fontSize: 10 }} />
                  Your information is safe and secure.
                </div>
              </form>
            )}
          </div>

          {/* ── CHARACTER PANEL ── */}
          <div className="cj-char-panel">
            <div className="cj-char-glow" />
            <img
              className="cj-char-img"
              src="/assets/about/characters/anime.png"
              alt="Anime Benjamin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
