"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaEnvelope, FaDownload, FaArrowDown } from "react-icons/fa";

const DISPLAY   = '"Cinzel", Georgia, serif';
const HEADING   = '"Raleway", system-ui, sans-serif';
const BODY      = '"Lato", system-ui, sans-serif';
const GOLD      = "#D4AF37";
const CHAMPAGNE = "#F7E7CE";
const ROYAL     = "#0A0618";
const PURPLE    = "#2D1B69";
const AMETHYST  = "#7B4FC8";
const CRIMSON   = "#9B1A4A";

// Heraldic cross + diamond lattice background
const HERALD_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cline x1='30' y1='4' x2='30' y2='56' stroke='rgba(212%2C175%2C55%2C0.06)' stroke-width='0.5'/%3E%3Cline x1='4' y1='30' x2='56' y2='30' stroke='rgba(212%2C175%2C55%2C0.06)' stroke-width='0.5'/%3E%3Crect x='25' y='25' width='10' height='10' fill='none' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5' transform='rotate(45 30 30)'/%3E%3Ccircle cx='30' cy='30' r='1' fill='rgba(212%2C175%2C55%2C0.07)'/%3E%3Ccircle cx='0' cy='0' r='0.8' fill='rgba(212%2C175%2C55%2C0.05)'/%3E%3Ccircle cx='60' cy='0' r='0.8' fill='rgba(212%2C175%2C55%2C0.05)'/%3E%3Ccircle cx='0' cy='60' r='0.8' fill='rgba(212%2C175%2C55%2C0.05)'/%3E%3Ccircle cx='60' cy='60' r='0.8' fill='rgba(212%2C175%2C55%2C0.05)'/%3E%3C/svg%3E")`;

// Crown SVG component
const CrownMark = ({ size = 48, color = GOLD, opacity = 1 }) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 48 34" fill="none" style={{ opacity }}>
    <path d="M2 32 L2 22 L10 6 L24 16 L38 2 L46 22 L46 32 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <line x1="2" y1="32" x2="46" y2="32" stroke={color} strokeWidth="1.5"/>
    <circle cx="10" cy="6" r="2.5" fill={color}/>
    <circle cx="24" cy="16" r="2.5" fill={color}/>
    <circle cx="38" cy="2" r="2.5" fill={color}/>
    <line x1="14" y1="32" x2="14" y2="22" stroke={color} strokeWidth="0.75" strokeOpacity="0.5"/>
    <line x1="24" y1="32" x2="24" y2="18" stroke={color} strokeWidth="0.75" strokeOpacity="0.5"/>
    <line x1="34" y1="32" x2="34" y2="22" stroke={color} strokeWidth="0.75" strokeOpacity="0.5"/>
  </svg>
);

const letterVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 24, opacity: 0 },
  visible: (i) => ({
    clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1,
    transition: { duration: 0.8, delay: 0.7 + i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PortfolioHero({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fadeOut   = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const hasPhoto = !!(data?.heroImageBase64 || data?.profile_photo);
  const nameParts = (data?.name || "Portfolio").split(" ");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, #0A0618 0%, #160830 50%, #0A0618 100%)`,
      backgroundImage: HERALD_BG,
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: "72px",
    }}>
      <style>{`
        .cr-cta-primary {
          display:inline-flex; align-items:center; gap:10px; cursor:pointer;
          padding:13px 38px; background:${GOLD}; border:1px solid ${GOLD};
          color:${ROYAL}; font-family:${HEADING}; font-size:11px; font-weight:700;
          letter-spacing:0.22em; text-transform:uppercase; text-decoration:none;
          transition:all 0.3s ease;
        }
        .cr-cta-primary:hover { background:transparent; color:${GOLD}; }
        .cr-cta-secondary {
          display:inline-flex; align-items:center; gap:10px; cursor:pointer;
          padding:12px 32px; background:transparent; border:1px solid rgba(247,231,206,0.2);
          color:rgba(247,231,206,0.55); font-family:${HEADING}; font-size:11px; font-weight:500;
          letter-spacing:0.2em; text-transform:uppercase; text-decoration:none;
          transition:all 0.3s ease;
        }
        .cr-cta-secondary:hover { border-color:${CHAMPAGNE}; color:${CHAMPAGNE}; }
        .cr-scroll-btn { background:none; border:none; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:8px; }
        @media (max-width: 768px) {
          .cr-hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 3rem 1.25rem 4rem !important; }
          .cr-cta-primary, .cr-cta-secondary { width: 100%; justify-content: center; }
          #hero { padding-bottom: 7rem !important; }
        }
      `}</style>

      {/* Purple radial glow */}
      <div style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%,-50%)", width: "70vw", height: "60vh", background: "radial-gradient(ellipse, rgba(123,79,200,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Gold lower glow */}
      <div style={{ position: "absolute", bottom: "15%", left: "50%", transform: "translateX(-50%)", width: "50vw", height: "30vh", background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Ghost crown watermark */}
      <div style={{ position: "absolute", right: hasPhoto ? "44%" : "3%", bottom: "10%", pointerEvents: "none", userSelect: "none", opacity: 0.04 }}>
        <CrownMark size={Math.min(300, 26 * 10)} color={GOLD} opacity={1} />
      </div>

      {/* Ghost name watermark */}
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "20vw", fontWeight: 700, color: "rgba(212,175,55,0.025)", lineHeight: 1, pointerEvents: "none", userSelect: "none", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
        {data?.name?.split(" ")[0]?.slice(0, 3).toUpperCase() || "ROY"}
      </div>

      {/* Royal wave bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,40 C180,70 360,15 540,45 C720,75 900,10 1080,40 C1200,60 1360,25 1440,40 L1440 80 L0 80 Z" fill="rgba(212,175,55,0.03)" />
          <path d="M0,55 C240,30 480,70 720,50 C960,28 1200,68 1440,50 L1440 80 L0 80 Z" fill="rgba(123,79,200,0.03)" />
        </svg>
      </div>

      {/* Content */}
      <motion.div style={{ y: parallaxY, opacity: fadeOut, width: "100%", position: "relative", zIndex: 2 }}>
        <div className="cr-hero-grid" style={{
          maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem 6rem",
          display: "grid",
          gridTemplateColumns: hasPhoto ? "1fr 400px" : "1fr",
          gap: "5rem", alignItems: "center",
        }}>

          {/* Left — text */}
          <div>
            {/* Crown + ornament header */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", marginBottom: "2.5rem" }}>
              <CrownMark size={40} color={GOLD} opacity={0.9} />
              {/* Ornamental rule */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}60)` }} />
                <span style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: `${GOLD}CC` }}>
                  {data?.title || "Portfolio"}
                </span>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, ${GOLD}60, transparent)` }} />
              </div>
            </motion.div>

            {/* Name reveal */}
            <div style={{ marginBottom: "2rem" }}>
              {nameParts.map((word, i) => (
                <div key={i} style={{ overflow: "hidden", lineHeight: 1 }}>
                  <motion.div
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "clamp(3rem, 9vw, 7.5rem)",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: CHAMPAGNE,
                      display: "block",
                      lineHeight: 1.05,
                    }}
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Gold shimmer rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6 + nameParts.length * 0.18 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "2px",
                background: `linear-gradient(90deg, ${GOLD}, ${AMETHYST}80, transparent)`,
                marginBottom: "2rem", maxWidth: "320px", transformOrigin: "left",
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              style={{ fontFamily: BODY, fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", fontWeight: 300, color: "rgba(247,231,206,0.5)", lineHeight: 1.9, maxWidth: "500px", marginBottom: "3rem" }}
            >
              {data?.sloganHeroSection || (data?.bio ? data.bio.slice(0, 130) + "…" : "")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
            >
              <button onClick={() => scrollTo("contact")} className="cr-cta-primary">
                <FaEnvelope style={{ fontSize: "10px" }} /> Audience Granted
              </button>
              <button onClick={() => scrollTo("about")} className="cr-cta-secondary">
                View Chronicle
              </button>
              {(data?.resumeBase64 || data?.resume || data?.resumeUrl) && (
                <a href={data.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : (data.resume || data.resumeUrl)}
                  download="Resume.pdf" className="cr-cta-secondary">
                  <FaDownload style={{ fontSize: "10px" }} /> Résumé
                </a>
              )}
            </motion.div>
          </div>

          {/* Right — photo */}
          {hasPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative" }}
              className="cr-hero-photo"
            >
              {/* Decorative frame — double border */}
              <div style={{ position: "absolute", top: "12px", left: "12px", right: "-12px", bottom: "-12px", border: `1px solid ${GOLD}30`, zIndex: 0 }} />
              <div style={{ position: "absolute", top: "6px", left: "6px", right: "-6px", bottom: "-6px", border: `1px solid ${AMETHYST}30`, zIndex: 0 }} />

              {/* Corner L-brackets in gold */}
              {[
                { top: "-8px", left: "-8px", borderTop: true, borderLeft: true },
                { top: "-8px", right: "-8px", borderTop: true, borderRight: true },
                { bottom: "-8px", left: "-8px", borderBottom: true, borderLeft: true },
                { bottom: "-8px", right: "-8px", borderBottom: true, borderRight: true },
              ].map((c, i) => (
                <div key={i} style={{
                  position: "absolute", width: "28px", height: "28px", zIndex: 2,
                  ...c,
                  borderTop: c.borderTop ? `2px solid ${GOLD}` : undefined,
                  borderBottom: c.borderBottom ? `2px solid ${GOLD}` : undefined,
                  borderLeft: c.borderLeft ? `2px solid ${GOLD}` : undefined,
                  borderRight: c.borderRight ? `2px solid ${GOLD}` : undefined,
                }} />
              ))}

              <div style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
                <img
                  src={data.heroImageBase64 || data.profile_photo} alt={data.name}
                  style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "center top", aspectRatio: "3/4", filter: "brightness(0.9) saturate(0.85)" }}
                />
                {/* Royal name plate */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(10,6,24,0.92)", borderTop: `1px solid ${GOLD}40`, padding: "16px 20px" }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 600, letterSpacing: "0.1em", color: CHAMPAGNE, textTransform: "uppercase" }}>{data.name}</div>
                  {data?.title && <div style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginTop: "4px" }}>{data.title}</div>}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <button className="cr-scroll-btn" onClick={() => scrollTo("about")}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}>
            <FaArrowDown style={{ color: `${GOLD}60`, fontSize: "13px" }} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
