"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const DISPLAY   = '"Cinzel", Georgia, serif';
const HEADING   = '"Raleway", system-ui, sans-serif';
const BODY      = '"Lato", system-ui, sans-serif';
const GOLD      = "#D4AF37";
const CHAMPAGNE = "#F7E7CE";
const AMETHYST  = "#7B4FC8";
const CRIMSON   = "#9B1A4A";

const HERALD_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cline x1='30' y1='4' x2='30' y2='56' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Cline x1='4' y1='30' x2='56' y2='30' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Crect x='25' y='25' width='10' height='10' fill='none' stroke='rgba(212%2C175%2C55%2C0.04)' stroke-width='0.5' transform='rotate(45 30 30)'/%3E%3C/svg%3E")`;

const ACCENTS = [GOLD, AMETHYST, CRIMSON, "#C4941A", "#5A3490"];

export default function PortfolioCommunity({ data }) {
  const items = data?.community;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const card    = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="community" style={{ background: `linear-gradient(160deg, #0D0820 0%, #160830 100%)`, backgroundImage: HERALD_BG, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#community{padding:4rem 1.25rem!important;} .cr-comm-grid{grid-template-columns:1fr!important;}}`}</style>
      {/* Glow */}
      <div style={{ position: "absolute", right: "10%", bottom: "20%", width: "40vw", height: "40vh", background: "radial-gradient(ellipse, rgba(123,79,200,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Ghost numeral */}
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "19vw", fontWeight: 700, color: "rgba(212,175,55,0.03)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>VI</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 600, color: `${GOLD}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>VI</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 600, color: CHAMPAGNE, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Order</h2>
          </motion.div>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          className="cr-comm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {items.map((comm, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const title  = comm.role || comm.title || comm.name || comm.organization;
            const org    = comm.organization || comm.club || comm.group || comm.company;
            const period = comm.period || comm.duration || comm.year || comm.date;
            const desc   = comm.description;
            const link   = comm.link || comm.url || comm.website;

            return (
              <motion.div key={i} variants={card}>
                <div style={{
                  background: "rgba(247,231,206,0.02)",
                  border: `1px solid rgba(212,175,55,0.1)`,
                  borderLeft: `3px solid ${accent}80`,
                  padding: "1.75rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.04)"; e.currentTarget.style.borderLeftColor = accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(247,231,206,0.02)"; e.currentTarget.style.borderLeftColor = `${accent}80`; }}
                >
                  {/* Triangle top-right accent */}
                  <div style={{ position: "absolute", top: "0", right: "0", width: 0, height: 0, borderStyle: "solid", borderWidth: "0 20px 20px 0", borderColor: `transparent ${accent}30 transparent transparent` }} />

                  {period && (
                    <span style={{ display: "inline-block", marginBottom: "0.75rem", fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `${accent}90` }}>
                      {period}
                    </span>
                  )}

                  <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(0.95rem,1.8vw,1.2rem)", fontWeight: 600, color: CHAMPAGNE, margin: "0 0 4px", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.3 }}>
                    {title}
                  </h3>

                  {org && title !== org && (
                    <p style={{ fontFamily: HEADING, fontSize: "11px", fontWeight: 500, color: `${accent}CC`, margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {org}
                    </p>
                  )}

                  {desc && (
                    <p style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(247,231,206,0.45)", lineHeight: 1.8, margin: "0 0 1.25rem", flex: 1 }}>
                      {desc}
                    </p>
                  )}

                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: HEADING, fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: `${accent}90`, textDecoration: "none", marginTop: "auto", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = accent}
                      onMouseLeave={(e) => e.currentTarget.style.color = `${accent}90`}
                    >
                      <FaExternalLinkAlt style={{ fontSize: "9px" }} /> Attend
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
