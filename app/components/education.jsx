"use client";
import React from "react";
import { motion } from "framer-motion";

const DISPLAY   = '"Cinzel", Georgia, serif';
const HEADING   = '"Raleway", system-ui, sans-serif';
const BODY      = '"Lato", system-ui, sans-serif';
const GOLD      = "#D4AF37";
const CHAMPAGNE = "#F7E7CE";
const ROYAL     = "#0A0618";
const PURPLE    = "#2D1B69";
const AMETHYST  = "#7B4FC8";
const CRIMSON   = "#9B1A4A";

const HERALD_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cline x1='30' y1='4' x2='30' y2='56' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Cline x1='4' y1='30' x2='56' y2='30' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Crect x='25' y='25' width='10' height='10' fill='none' stroke='rgba(212%2C175%2C55%2C0.04)' stroke-width='0.5' transform='rotate(45 30 30)'/%3E%3C/svg%3E")`;

// Cycling accent colors for royal feel
const ACCENTS = [GOLD, AMETHYST, CRIMSON, "#C4941A", "#5A3490"];

export default function PortfolioEducation({ data }) {
  const items = data?.education;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const card    = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="education" style={{ background: `linear-gradient(160deg, #0D0820 0%, #160830 100%)`, backgroundImage: HERALD_BG, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Purple glow */}
      <div style={{ position: "absolute", right: "10%", top: "30%", width: "40vw", height: "40vh", background: "radial-gradient(ellipse, rgba(123,79,200,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Ghost numeral */}
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 700, color: "rgba(212,175,55,0.03)", lineHeight: 1, pointerEvents: "none", userSelect: "none", textTransform: "uppercase" }}>II</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 600, color: `${GOLD}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>II</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 600, color: CHAMPAGNE, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Education</h2>
          </motion.div>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
          {items.map((edu, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div key={i} variants={card}>
                <div style={{
                  background: "rgba(247,231,206,0.03)",
                  border: `1px solid rgba(212,175,55,0.12)`,
                  borderTop: `3px solid ${accent}`,
                  padding: "1.75rem", height: "100%",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.05)"; e.currentTarget.style.borderColor = `${accent}50`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(247,231,206,0.03)"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)"; }}
                >
                  {/* Triangle top accent (like a crown point) */}
                  <div style={{ position: "absolute", top: "-1px", right: "24px", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `8px solid ${accent}` }} />

                  <span style={{ display: "inline-block", marginBottom: "1rem", fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", padding: "3px 12px", border: `1px solid ${accent}40`, color: accent, textTransform: "uppercase" }}>
                    {edu.period || edu.year || edu.graduationYear || "—"}
                  </span>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 600, color: CHAMPAGNE, margin: "0 0 6px", letterSpacing: "0.06em", lineHeight: 1.3, textTransform: "uppercase" }}>
                    {edu.degree || edu.field || edu.program}
                  </h3>
                  <p style={{ fontFamily: HEADING, fontSize: "12px", fontWeight: 500, color: `${accent}CC`, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {edu.institution || edu.school}
                  </p>
                  {edu.location && <p style={{ fontFamily: BODY, fontSize: "11px", color: `${GOLD}50`, margin: "0 0 10px" }}>{edu.location}</p>}
                  {edu.description && <p style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(247,231,206,0.45)", lineHeight: 1.75, margin: "0 0 0.5rem" }}>{edu.description}</p>}
                  {(edu.achievements || edu.highlights)?.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0.5rem 0 0", display: "flex", flexDirection: "column", gap: "5px" }}>
                      {(edu.achievements || edu.highlights).map((a, j) => (
                        <li key={j} style={{ display: "flex", gap: "10px", fontFamily: BODY, fontSize: "12px", color: "rgba(247,231,206,0.4)", lineHeight: 1.7 }}>
                          <span style={{ color: `${accent}80`, flexShrink: 0, marginTop: "5px", fontSize: "6px" }}>◆</span>{a}
                        </li>
                      ))}
                    </ul>
                  )}
                  {edu.gpa && <p style={{ fontFamily: BODY, fontSize: "11px", color: `${GOLD}60`, marginTop: "10px" }}>GPA: {edu.gpa}</p>}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
