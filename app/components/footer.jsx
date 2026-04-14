"use client";
import React from "react";

const DISPLAY   = '"Cinzel", Georgia, serif';
const HEADING   = '"Raleway", system-ui, sans-serif';
const BODY      = '"Lato", system-ui, sans-serif';
const GOLD      = "#D4AF37";
const CHAMPAGNE = "#F7E7CE";
const ROYAL     = "#0A0618";

export default function PortfolioFooter({ data }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: ROYAL, borderTop: "1px solid rgba(212,175,55,0.12)", padding: "2.5rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>

        {/* Brand — crown + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ opacity: 0.5 }}>
            <path d="M1 13 L1 9 L5 3 L10 7 L15 1 L19 9 L19 13 Z" fill="none" stroke={GOLD} strokeWidth="1.2" strokeLinejoin="round"/>
            <line x1="1" y1="13" x2="19" y2="13" stroke={GOLD} strokeWidth="1.2"/>
            <circle cx="5" cy="3" r="1.2" fill={GOLD}/>
            <circle cx="10" cy="7" r="1.2" fill={GOLD}/>
            <circle cx="15" cy="1" r="1.2" fill={GOLD}/>
          </svg>
          <span style={{ fontFamily: DISPLAY, fontSize: "16px", fontWeight: 600, color: `${CHAMPAGNE}60`, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {data?.name?.split(" ")[0] || "Portfolio"}
          </span>
          <span style={{ fontFamily: HEADING, fontSize: "8px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: `${GOLD}50`, border: `1px solid rgba(212,175,55,0.2)`, padding: "2px 8px" }}>Crown</span>
        </div>

        {/* Center ornament */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "20px", height: "1px", background: "rgba(212,175,55,0.2)" }} />
          <div style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: `6px solid rgba(212,175,55,0.3)` }} />
          <div style={{ width: "20px", height: "1px", background: "rgba(212,175,55,0.2)" }} />
        </div>

        {/* Copyright + Salience */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
          <p style={{ fontFamily: BODY, fontSize: "11px", color: "rgba(247,231,206,0.2)", margin: 0, letterSpacing: "0.04em" }}>
            &copy; {year} {data?.name || "Portfolio"} — All Rights Reserved
          </p>
          <p style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(247,231,206,0.12)", margin: 0 }}>
            Built with <span style={{ color: "rgba(212,175,55,0.4)" }}>Salience</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
