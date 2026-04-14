"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const DISPLAY  = '"Cinzel", Georgia, serif';
const HEADING  = '"Raleway", system-ui, sans-serif';
const GOLD     = "#D4AF37";
const CHAMPAGNE = "#F7E7CE";
const ROYAL    = "#0A0618";
const AMETHYST = "#7B4FC8";

export default function PortfolioNav({ data }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("");

  const allLinks = [
    { label: "About",      href: "#about",      key: "about" },
    { label: "Education",  href: "#education",  key: "education" },
    { label: "Experience", href: "#experience", key: "experience" },
    { label: "Projects",   href: "#projects",   key: "projects" },
    { label: "Skills",     href: "#skills",     key: "skills" },
    { label: "Community",  href: "#community",  key: "community" },
    { label: "Contact",    href: "#contact",    key: "contact" },
  ];

  const activeLinks = allLinks.filter((l) => {
    if (l.label === "About") return true;
    if (l.key === "contact") return !!(data?.email || data?.github || data?.linkedin);
    const d = data?.[l.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids    = activeLinks.map((l) => l.href.replace("#", ""));
      const sorted = ids.map((id) => document.getElementById(id)).filter(Boolean).sort((a, b) => a.offsetTop - b.offsetTop);
      let current  = sorted[0]?.id ?? "";
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].offsetTop - 120) { current = sorted[i].id; break; }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  const resumeHref = data?.resumeBase64
    ? `data:application/pdf;base64,${data.resumeBase64}`
    : (data?.resume || data?.resumeUrl || null);

  return (
    <>
      <style>{`
        .cr-nav-link {
          text-decoration: none; position: relative;
          font-family: ${HEADING}; font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(247,231,206,0.45); transition: color 0.25s;
          padding-bottom: 3px;
        }
        .cr-nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; background: linear-gradient(90deg, ${GOLD}, ${GOLD}80);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .cr-nav-link:hover, .cr-nav-link.cr-active { color: ${CHAMPAGNE}; }
        .cr-nav-link:hover::after, .cr-nav-link.cr-active::after { transform: scaleX(1); }
      `}</style>

      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(10,6,24,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(212,175,55,0.15)` : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <div className="cr-nav-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo — crown mark + name */}
          <a href="#about" onClick={(e) => go(e, "#about")} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M1 13 L1 9 L5 3 L10 7 L15 1 L19 9 L19 13 Z" fill="none" stroke={GOLD} strokeWidth="1.2" strokeLinejoin="round"/>
              <circle cx="5" cy="3" r="1.2" fill={GOLD}/>
              <circle cx="10" cy="7" r="1.2" fill={GOLD}/>
              <circle cx="15" cy="1" r="1.2" fill={GOLD}/>
            </svg>
            <span style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 600, letterSpacing: "0.12em", color: CHAMPAGNE, textTransform: "uppercase" }}>
              {data?.name?.split(" ")[0] || "Portfolio"}
            </span>
          </a>

          {/* Desktop links */}
          <div className="cr-desktop-links">
            {activeLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                className={`cr-nav-link${active === link.href.replace("#", "") ? " cr-active" : ""}`}>
                {link.label}
              </a>
            ))}
            {resumeHref && (
              <a href={resumeHref} download="Resume.pdf"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: HEADING, fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: GOLD, textDecoration: "none",
                  border: `1px solid rgba(212,175,55,0.35)`,
                  padding: "6px 16px", transition: "all 0.25s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.1)"; e.currentTarget.style.borderColor = GOLD; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)"; }}
              >
                <FaDownload style={{ fontSize: "9px" }} /> Résumé
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="cr-hamburger" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block", height: "1.5px",
                  background: i === 1 ? GOLD : CHAMPAGNE,
                  transition: "all 0.3s",
                  transform: i === 0 && mobileOpen ? "rotate(45deg) translate(5px,5px)" : i === 2 && mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none",
                  opacity: i === 1 && mobileOpen ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </div>

        {/* Mobile drawer — pure React state */}
        <div style={{ display: mobileOpen ? "block" : "none" }}>
          <div style={{ background: "rgba(10,6,24,0.98)", borderBottom: `1px solid rgba(212,175,55,0.12)`, padding: "1.5rem 1.25rem 2rem" }}>
            {activeLinks.map((link, i) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                  style={{
                    display: "block", padding: "12px 0",
                    borderBottom: i < activeLinks.length - 1 ? "1px solid rgba(247,231,206,0.06)" : "none",
                    borderLeft: isActive ? `2px solid ${GOLD}` : "2px solid transparent",
                    paddingLeft: "12px",
                    fontFamily: HEADING, fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase",
                    color: isActive ? GOLD : "rgba(247,231,206,0.5)", textDecoration: "none",
                    transition: "color 0.2s",
                  }}>
                  {link.label}
                </a>
              );
            })}
            {resumeHref && (
              <a href={resumeHref} download="Resume.pdf"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "1.5rem",
                  fontFamily: HEADING, fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: GOLD, textDecoration: "none",
                  border: `1px solid rgba(212,175,55,0.3)`, padding: "10px 20px",
                  background: "rgba(212,175,55,0.04)",
                }}
              >
                <FaDownload style={{ fontSize: "9px" }} /> Download Résumé
              </a>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
