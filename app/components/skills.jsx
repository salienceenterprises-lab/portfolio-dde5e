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

const GROUP_ACCENTS = [GOLD, AMETHYST, CRIMSON, "#C4941A", "#5A3490"];

export default function PortfolioSkills({ data }) {
  const skills = data?.skills;
  if (!skills || (Array.isArray(skills) && skills.length === 0)) return null;
  if (typeof skills === "object" && !Array.isArray(skills) && Object.keys(skills).length === 0) return null;

  // Normalize: handle grouped {category, items[]} array OR flat string array
  const groups = (() => {
    if (
      Array.isArray(skills) && skills.length > 0 &&
      typeof skills[0] === "object" && skills[0] !== null &&
      (skills[0].items || skills[0].category || skills[0].skills)
    ) {
      return skills.map((g) => ({
        category: g.category || g.name || "Skills",
        items: Array.isArray(g.items) ? g.items : Array.isArray(g.skills) ? g.skills : [],
      })).filter((g) => g.items.length > 0);
    }
    return null; // flat
  })();
  const isGrouped = !!groups;

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
  const pill    = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="skills" style={{ background: IVORY, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#skills{padding:4rem 1.25rem!important;} .cr-skills-grid{grid-template-columns:1fr!important;}}`}</style>
      {/* Heraldic bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cline x1='30' y1='4' x2='30' y2='56' stroke='rgba(123%2C79%2C200%2C0.04)' stroke-width='0.5'/%3E%3Cline x1='4' y1='30' x2='56' y2='30' stroke='rgba(123%2C79%2C200%2C0.04)' stroke-width='0.5'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
      {/* Ghost numeral */}
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "20vw", fontWeight: 700, color: "rgba(212,175,55,0.05)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>V</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 600, color: `${GOLD}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>V</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 600, color: "#1A0E30", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Mastery</h2>
          </motion.div>
        </div>

        {isGrouped ? (
          <div className="cr-skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {groups.map((group, gi) => {
              const groupName   = group.category;
              const groupSkills = group.items;
              const accent = GROUP_ACCENTS[gi % GROUP_ACCENTS.length];
              const list   = Array.isArray(groupSkills) ? groupSkills : [groupSkills];
              return (
                <motion.div key={gi}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: gi * 0.07 }}
                  style={{
                    background: "#FFFFFF",
                    border: `1px solid rgba(212,175,55,0.15)`,
                    borderTop: `3px solid ${accent}`,
                    padding: "1.5rem",
                    boxShadow: "0 2px 20px rgba(42,26,68,0.05)",
                    position: "relative",
                  }}
                >
                  {/* Triangle accent */}
                  <div style={{ position: "absolute", top: "-1px", right: "24px", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `8px solid ${accent}` }} />

                  <p style={{ fontFamily: DISPLAY, fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: accent, marginBottom: "1.25rem", marginTop: 0 }}>
                    {groupName}
                  </p>
                  <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                    {list.map((skill, si) => {
                      const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                      return (
                        <motion.span key={si} variants={pill}
                          style={{
                            fontFamily: BODY, fontSize: "12px", fontWeight: 400,
                            padding: "5px 14px",
                            border: `1px solid ${accent}30`,
                            background: `${accent}07`,
                            color: "#2A1A44",
                            letterSpacing: "0.02em",
                          }}>{label}</motion.span>
                      );
                    })}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div>
            {/* Gold ornamental rule */}
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
              style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}50, ${AMETHYST}30, transparent)`, marginBottom: "3rem", transformOrigin: "center" }} />

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }}
              style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {(Array.isArray(skills) ? skills : []).map((skill, i) => {
                const accent = GROUP_ACCENTS[i % GROUP_ACCENTS.length];
                const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                return (
                  <motion.span key={i} variants={pill}
                    style={{
                      fontFamily: BODY, fontSize: "13px", fontWeight: 400,
                      padding: "7px 20px",
                      border: `1px solid ${accent}35`,
                      background: `${accent}07`,
                      color: "#2A1A44",
                      letterSpacing: "0.03em",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}15`; e.currentTarget.style.borderColor = `${accent}60`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${accent}07`; e.currentTarget.style.borderColor = `${accent}35`; }}
                  >{label}</motion.span>
                );
              })}
            </motion.div>

            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
              style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}50, ${AMETHYST}30, transparent)`, marginTop: "3rem", transformOrigin: "center" }} />
          </div>
        )}
      </div>
    </section>
  );
}
