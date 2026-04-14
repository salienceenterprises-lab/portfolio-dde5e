"use client";
import React from "react";
import portfolioData from "../profile.json";
import PortfolioNav from "./components/nav";
import PortfolioHero from "./components/hero";
import PortfolioAbout from "./components/about";
import PortfolioEducation from "./components/education";
import PortfolioExperience from "./components/experience";
import PortfolioProjects from "./components/projects";
import PortfolioSkills from "./components/skills";
import PortfolioCommunity from "./components/community";
import PortfolioContact from "./components/contact";
import PortfolioFooter from "./components/footer";

export default function DeployedPortfolio() {
  const data = portfolioData;
  if (!data) return <div style={{ color: "#F7E7CE", padding: "40px", background: "#0A0618" }}>Loading…</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 72px; }
        @keyframes cr-shimmer { 0%{background-position:200% center;} 100%{background-position:-200% center;} }
        @keyframes cr-fade-up { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes cr-glow { 0%,100%{opacity:0.6;} 50%{opacity:1;} }
        @keyframes cr-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @keyframes cr-crown-drop { from{opacity:0;transform:translateY(-20px);} to{opacity:1;transform:translateY(0);} }
        /* Responsive nav */
        .cr-desktop-links { display: flex; align-items: center; gap: 2rem; }
        .cr-hamburger { display: none; }
        @media (max-width: 767px) {
          .cr-desktop-links { display: none !important; }
          .cr-hamburger { display: flex !important; }
          .cr-nav-inner { padding: 0 1.25rem !important; }
          .cr-hero-photo { display: none !important; }
          .cr-two-col, .cr-contact-grid { display: block !important; }
          .cr-two-col > *, .cr-contact-grid > * { margin-bottom: 2.5rem; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#0A0618", color: "#F7E7CE" }}>
        <PortfolioNav data={data} />
        <PortfolioHero data={data} />
        <PortfolioAbout data={data} />
        <PortfolioEducation data={data} />
        <PortfolioExperience data={data} />
        <PortfolioProjects data={data} />
        <PortfolioSkills data={data} />
        <PortfolioCommunity data={data} />
        <PortfolioContact data={data} />
        <PortfolioFooter data={data} />
      </div>
    </>
  );
}
