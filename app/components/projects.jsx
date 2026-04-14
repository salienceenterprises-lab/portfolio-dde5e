"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const DISPLAY   = '"Cinzel", Georgia, serif';
const HEADING   = '"Raleway", system-ui, sans-serif';
const BODY      = '"Lato", system-ui, sans-serif';
const GOLD      = "#D4AF37";
const CHAMPAGNE = "#F7E7CE";
const ROYAL     = "#0A0618";
const AMETHYST  = "#7B4FC8";
const CRIMSON   = "#9B1A4A";

const HERALD_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cline x1='30' y1='4' x2='30' y2='56' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Cline x1='4' y1='30' x2='56' y2='30' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Crect x='25' y='25' width='10' height='10' fill='none' stroke='rgba(212%2C175%2C55%2C0.04)' stroke-width='0.5' transform='rotate(45 30 30)'/%3E%3C/svg%3E")`;

const ACCENTS = [GOLD, AMETHYST, CRIMSON, "#C4941A", "#5A3490"];

export default function PortfolioProjects({ data }) {
  const items = data?.projects;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const [hovered, setHovered] = useState(null);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const card    = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="projects" style={{ background: `linear-gradient(160deg, #0D0820 0%, #160830 100%)`, backgroundImage: HERALD_BG, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", left: "20%", top: "40%", width: "50vw", height: "50vh", background: "radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Ghost numeral */}
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "20vw", fontWeight: 700, color: "rgba(212,175,55,0.03)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>IV</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 600, color: `${GOLD}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>IV</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 600, color: CHAMPAGNE, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Works</h2>
          </motion.div>
        </div>

        <style>{`@media(max-width:768px){.cr-proj-grid{grid-template-columns:1fr!important;}}`}</style>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          className="cr-proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {items.map((project, i) => {
            const title  = project.title || project.name;
            const desc   = project.description;
            const tags   = Array.isArray(project.stack) ? project.stack : Array.isArray(project.tech) ? project.tech : Array.isArray(project.technologies) ? project.technologies : Array.isArray(project.tags) ? project.tags : [];
            const github = project.github || project.repo || project.repository;
            const live   = project.live || project.url || project.link || project.demo;
            const accent = ACCENTS[i % ACCENTS.length];

            return (
              <motion.div key={i} variants={card}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: hovered === i ? "rgba(212,175,55,0.05)" : "rgba(247,231,206,0.02)",
                    border: `1px solid ${hovered === i ? `${accent}40` : "rgba(247,231,206,0.07)"}`,
                    borderTop: `2px solid ${hovered === i ? accent : `${accent}60`}`,
                    height: "100%", display: "flex", flexDirection: "column",
                    transition: "all 0.35s ease",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {/* Project image */}
                  {project.imageBase64 && (
                    <div style={{ width: "100%", paddingTop: "52%", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                      <img
                        src={project.imageBase64}
                        alt={title}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: "brightness(0.8) saturate(0.75)", transition: "transform 0.5s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                  )}

                  <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Roman numeral badge */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <span style={{ fontFamily: DISPLAY, fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: `${accent}60`, textTransform: "uppercase" }}>
                        {["I","II","III","IV","V","VI","VII","VIII","IX","X"][i] || String(i+1)}
                      </span>
                      {/* Triangle top accent */}
                      <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: `7px solid ${accent}50` }} />
                    </div>

                    <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(0.95rem,1.8vw,1.2rem)", fontWeight: 600, color: CHAMPAGNE, margin: "0 0 0.75rem", letterSpacing: "0.07em", textTransform: "uppercase", lineHeight: 1.3 }}>
                      {title}
                    </h3>

                    {desc && (
                      <p style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(247,231,206,0.45)", lineHeight: 1.8, margin: "0 0 1.25rem", flex: 1 }}>
                        {desc}
                      </p>
                    )}

                    {tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.25rem" }}>
                        {tags.map((t, j) => {
                          const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                          return (
                            <span key={j} style={{ fontFamily: BODY, fontSize: "10px", padding: "3px 10px", border: `1px solid ${accent}25`, color: `${accent}90`, letterSpacing: "0.02em" }}>{label}</span>
                          );
                        })}
                      </div>
                    )}

                    {(github || live) && (
                      <div style={{ display: "flex", gap: "14px", marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(247,231,206,0.06)" }}>
                        {github && (
                          <a href={github} target="_blank" rel="noopener noreferrer"
                            style={{ display: "flex", alignItems: "center", gap: "7px", fontFamily: HEADING, fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(247,231,206,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = CHAMPAGNE}
                            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(247,231,206,0.4)"}
                          >
                            <FaGithub style={{ fontSize: "12px" }} /> Source
                          </a>
                        )}
                        {live && (
                          <a href={live} target="_blank" rel="noopener noreferrer"
                            style={{ display: "flex", alignItems: "center", gap: "7px", fontFamily: HEADING, fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: `${GOLD}90`, textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                            onMouseLeave={(e) => e.currentTarget.style.color = `${GOLD}90`}
                          >
                            <FaExternalLinkAlt style={{ fontSize: "10px" }} /> Royal Preview
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
