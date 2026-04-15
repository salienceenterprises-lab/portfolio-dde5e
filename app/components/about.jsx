"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const DISPLAY   = '"Cinzel", Georgia, serif';
const HEADING   = '"Raleway", system-ui, sans-serif';
const BODY      = '"Lato", system-ui, sans-serif';
const GOLD      = "#D4AF37";
const CHAMPAGNE = "#F7E7CE";
const ROYAL     = "#0A0618";
const AMETHYST  = "#7B4FC8";
const IVORY     = "#FAF7F2";
const PARCHMENT = "#F0E8D8";

// Ornamental divider
const RoyalDivider = ({ color = GOLD }) => (
  <svg width="160" height="20" viewBox="0 0 160 20" fill="none">
    <line x1="0" y1="10" x2="68" y2="10" stroke={color} strokeWidth="0.75" strokeOpacity="0.4"/>
    <polygon points="72,4 80,10 72,16" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.6"/>
    <rect x="76" y="7" width="8" height="6" fill={color} fillOpacity="0.5" transform="rotate(45 80 10)"/>
    <polygon points="88,4 80,10 88,16" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.6"/>
    <line x1="92" y1="10" x2="160" y2="10" stroke={color} strokeWidth="0.75" strokeOpacity="0.4"/>
  </svg>
);

export default function PortfolioAbout({ data }) {
  if (!data) return null;

  const infoRows = [
    { label: "Location", value: data.location,  icon: <FaMapMarkerAlt />, link: null },
    { label: "Email",    value: data.email,      icon: <FaEnvelope />,    link: `mailto:${data.email}` },
    { label: "GitHub",   value: data.github ? "@" + data.github.split("/").pop() : null, icon: <FaGithub />, link: data.github },
    { label: "LinkedIn", value: data.linkedin ? "LinkedIn" : null, icon: <FaLinkedin />, link: data.linkedin },
    { label: "Website",  value: data.website,   icon: <FaGlobe />,       link: data.website },
  ].filter((r) => r.value);

  return (
    <section id="about" style={{ background: IVORY, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Heraldic bg faint */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cline x1='30' y1='4' x2='30' y2='56' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Cline x1='4' y1='30' x2='56' y2='30' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Crect x='25' y='25' width='10' height='10' fill='none' stroke='rgba(212%2C175%2C55%2C0.04)' stroke-width='0.5' transform='rotate(45 30 30)'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
      {/* Ghost number */}
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 700, color: "rgba(123,79,200,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none", textTransform: "uppercase" }}>I</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
              <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 600, color: `${GOLD}90`, letterSpacing: "0.35em", textTransform: "uppercase" }}>I</span>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 600, color: "#1A0E30", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>About</h2>
            </div>
            <RoyalDivider />
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="cr-two-col">
          <style>{`@media(max-width:767px){.cr-two-col{display:block!important;}.cr-two-col>*:first-child{margin-bottom:3rem;}}`}</style>

          {/* Bio + Skills */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ borderLeft: `2px solid ${GOLD}50`, paddingLeft: "1.75rem", marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: BODY, fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)", fontWeight: 300, color: "#2A1A44", lineHeight: 1.95, margin: 0 }}>
                {data.bio}
              </p>
            </div>

            {data.skills?.length > 0 && (() => {
              const flatSkills = data.skills.flatMap((s) =>
                typeof s === "object" && s !== null && Array.isArray(s.items) ? s.items
                : typeof s === "object" && s !== null && Array.isArray(s.skills) ? s.skills
                : [s]
              ).filter(Boolean);
              if (!flatSkills.length) return null;
              return (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
                    <div style={{ width: "4px", height: "4px", background: GOLD, transform: "rotate(45deg)" }} />
                    <p style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: `${AMETHYST}90`, margin: 0 }}>Royal Skills</p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {flatSkills.slice(0, 8).map((skill, i) => {
                      const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                      return (
                        <span key={i} style={{
                          padding: "5px 16px", fontFamily: BODY, fontSize: "12px", fontWeight: 400,
                          border: `1px solid ${i % 2 === 0 ? "rgba(212,175,55,0.4)" : "rgba(123,79,200,0.3)"}`,
                          color: i % 2 === 0 ? "#7A5A10" : "#4A2A80",
                          background: i % 2 === 0 ? "rgba(212,175,55,0.06)" : "rgba(123,79,200,0.05)",
                          letterSpacing: "0.02em",
                        }}>{label}</span>
                      );
                    })}
                    {flatSkills.length > 8 && (
                      <span style={{ padding: "5px 16px", border: "1px solid rgba(42,26,68,0.15)", color: "rgba(42,26,68,0.35)", fontFamily: BODY, fontSize: "12px" }}>+{flatSkills.length - 8}</span>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>

          {/* Contact info card */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{
              background: "#FFFFFF",
              border: "1px solid rgba(212,175,55,0.2)",
              borderTop: `3px solid ${GOLD}`,
              padding: "2.25rem",
              boxShadow: "0 4px 40px rgba(42,26,68,0.07)",
              position: "relative",
            }}>
              {/* Corner crown accents */}
              <div style={{ position: "absolute", top: "-1px", right: "20px", width: "12px", height: "12px", background: GOLD, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />

              <div style={{ fontFamily: DISPLAY, fontSize: "9px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}90`, marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
                Royal Court
              </div>
              {infoRows.map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "11px 0", borderBottom: i < infoRows.length - 1 ? "1px solid rgba(212,175,55,0.08)" : "none" }}>
                  <span style={{ color: `${GOLD}90`, fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>{row.icon}</span>
                  <div>
                    <div style={{ fontFamily: HEADING, fontSize: "8px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(42,26,68,0.35)", marginBottom: "3px" }}>{row.label}</div>
                    {row.link ? (
                      <a href={row.link} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: BODY, fontSize: "13px", color: "#2A1A44", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = AMETHYST}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#2A1A44"}
                      >{row.value}</a>
                    ) : (
                      <span style={{ fontFamily: BODY, fontSize: "13px", color: "#2A1A44" }}>{row.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
