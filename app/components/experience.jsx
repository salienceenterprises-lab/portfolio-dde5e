"use client";
import React from "react";
import { motion } from "framer-motion";

const DISPLAY   = '"Cinzel", Georgia, serif';
const HEADING   = '"Raleway", system-ui, sans-serif';
const BODY      = '"Lato", system-ui, sans-serif';
const GOLD      = "#D4AF37";
const CHAMPAGNE = "#F7E7CE";
const IVORY     = "#FAF7F2";
const AMETHYST  = "#7B4FC8";
const CRIMSON   = "#9B1A4A";

export default function PortfolioExperience({ data }) {
  const items = data?.experience;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="experience" style={{ background: IVORY, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#experience{padding:4rem 1.25rem!important;} .cr-exp-timeline{padding-left:2rem!important;} .cr-exp-dot{left:-2.35rem!important;}}`}</style>
      {/* Faint heraldic bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cline x1='30' y1='4' x2='30' y2='56' stroke='rgba(123%2C79%2C200%2C0.04)' stroke-width='0.5'/%3E%3Cline x1='4' y1='30' x2='56' y2='30' stroke='rgba(123%2C79%2C200%2C0.04)' stroke-width='0.5'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
      {/* Ghost numeral */}
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 700, color: "rgba(212,175,55,0.05)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>III</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 600, color: `${GOLD}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>III</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 600, color: "#1A0E30", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Experience</h2>
          </motion.div>
        </div>

        <div style={{ position: "relative" }}>
          {/* Vertical spine */}
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg, ${GOLD}, ${AMETHYST}60, transparent)`, transformOrigin: "top" }} />

          <div className="cr-exp-timeline" style={{ paddingLeft: "3rem" }}>
            {items.map((exp, i) => {
              const accent = i % 3 === 0 ? GOLD : i % 3 === 1 ? AMETHYST : CRIMSON;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  style={{ position: "relative", paddingBottom: i < items.length - 1 ? "4rem" : "0" }}
                >
                  {/* Crown-point marker on spine */}
                  <div className="cr-exp-dot" style={{ position: "absolute", left: "-3.55rem", top: "2px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                    <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: `7px solid ${accent}` }} />
                    <div style={{ width: "10px", height: "10px", background: accent, borderRadius: "1px" }} />
                  </div>

                  <div style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: `${accent}CC`, marginBottom: "0.5rem" }}>
                    {exp.period || exp.duration || exp.startDate}
                  </div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.05rem,2vw,1.4rem)", fontWeight: 600, color: "#1A0E30", margin: "0 0 4px", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                    {exp.role || exp.title || exp.position}
                  </h3>
                  <p style={{ fontFamily: HEADING, fontSize: "12px", fontWeight: 500, color: `${accent}CC`, margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {exp.company || exp.organization}
                  </p>
                  {exp.description && (
                    <p style={{ fontFamily: BODY, fontSize: "13.5px", color: "rgba(42,26,68,0.55)", lineHeight: 1.85, margin: "0 0 1rem", maxWidth: "640px" }}>{exp.description}</p>
                  )}
                  {(exp.highlights || exp.responsibilities || exp.bullets)?.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "flex", flexDirection: "column", gap: "6px", maxWidth: "640px" }}>
                      {(exp.highlights || exp.responsibilities || exp.bullets).map((r, j) => (
                        <li key={j} style={{ display: "flex", gap: "12px", fontFamily: BODY, fontSize: "13px", color: "rgba(42,26,68,0.5)", lineHeight: 1.7 }}>
                          <span style={{ color: `${GOLD}80`, flexShrink: 0, marginTop: "5px", fontSize: "7px" }}>◆</span>{r}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(Array.isArray(exp.stack) ? exp.stack : Array.isArray(exp.tech) ? exp.tech : Array.isArray(exp.tags) ? exp.tags : []).length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "0.75rem" }}>
                      {(Array.isArray(exp.stack) ? exp.stack : Array.isArray(exp.tech) ? exp.tech : Array.isArray(exp.tags) ? exp.tags : []).map((t, j) => {
                        const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                        return (
                          <span key={j} style={{ fontFamily: BODY, fontSize: "10px", padding: "3px 12px", border: "1px solid rgba(42,26,68,0.12)", color: "rgba(42,26,68,0.45)", letterSpacing: "0.02em" }}>{label}</span>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
