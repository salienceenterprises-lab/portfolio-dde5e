"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaGlobe, FaMapMarkerAlt, FaDownload, FaPaperPlane } from "react-icons/fa";

const DISPLAY   = '"Cinzel", Georgia, serif';
const HEADING   = '"Raleway", system-ui, sans-serif';
const BODY      = '"Lato", system-ui, sans-serif';
const GOLD      = "#D4AF37";
const CHAMPAGNE = "#F7E7CE";
const ROYAL     = "#0A0618";
const AMETHYST  = "#7B4FC8";

const HERALD_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cline x1='30' y1='4' x2='30' y2='56' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Cline x1='4' y1='30' x2='56' y2='30' stroke='rgba(212%2C175%2C55%2C0.05)' stroke-width='0.5'/%3E%3Crect x='25' y='25' width='10' height='10' fill='none' stroke='rgba(212%2C175%2C55%2C0.04)' stroke-width='0.5' transform='rotate(45 30 30)'/%3E%3C/svg%3E")`;

export default function PortfolioContact({ data }) {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const hasContact = !!(data?.email || data?.github || data?.linkedin || data?.twitter || data?.website || data?.web3forms_key);
  if (!hasContact) return null;

  const WEB3FORMS_KEY = data?.web3forms_key || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const socials = [
    { icon: <FaEnvelope />,     label: "Email",    value: data?.email,    href: `mailto:${data?.email}` },
    { icon: <FaGithub />,       label: "GitHub",   value: data?.github ? "@" + data.github.split("/").pop() : null, href: data?.github },
    { icon: <FaLinkedin />,     label: "LinkedIn", value: data?.linkedin ? "LinkedIn" : null, href: data?.linkedin },
    { icon: <FaGlobe />,        label: "Website",  value: data?.website,  href: data?.website },
    { icon: <FaMapMarkerAlt />, label: "Location", value: data?.location, href: null },
  ].filter((s) => s.value);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!WEB3FORMS_KEY) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form }),
      });
      const json = await res.json();
      setStatus(json.success ? "sent" : "error");
      if (json.success) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", background: "rgba(247,231,206,0.04)", border: "1px solid rgba(212,175,55,0.18)",
    color: CHAMPAGNE, fontFamily: BODY, fontSize: "13px", padding: "12px 16px",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ background: `linear-gradient(160deg, #0A0618 0%, #160830 100%)`, backgroundImage: HERALD_BG, padding: "8rem 2rem 9rem", position: "relative", overflow: "hidden" }}>
      <style>{`.crown-root input::placeholder, .crown-root textarea::placeholder { color: rgba(247,231,206,0.2); font-family: ${BODY}; } @media(max-width:767px){#contact{padding:4rem 1.25rem 9rem!important;}}`}</style>
      {/* Glow */}
      <div style={{ position: "absolute", right: "15%", top: "30%", width: "40vw", height: "40vh", background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Ghost numeral */}
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "18vw", fontWeight: 700, color: "rgba(212,175,55,0.03)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>VII</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 600, color: `${GOLD}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>VII</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 600, color: CHAMPAGNE, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Audience</h2>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }} className="cr-contact-grid">
          <style>{`@media(max-width:767px){.cr-contact-grid{display:block!important;}.cr-contact-grid>*:first-child{margin-bottom:3rem;}}`}</style>

          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: BODY, fontSize: "14px", color: "rgba(247,231,206,0.45)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
              {data?.contactMessage || "Seeking new alliances, bold ventures, and worthy challenges. Send your decree and I shall respond."}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {socials.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 0", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
                  <span style={{ color: `${GOLD}80`, fontSize: "13px", flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontFamily: HEADING, fontSize: "8px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(247,231,206,0.25)", marginBottom: "3px" }}>{s.label}</div>
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(247,231,206,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                        onMouseLeave={(e) => e.currentTarget.style.color = "rgba(247,231,206,0.55)"}
                      >{s.value}</a>
                    ) : (
                      <span style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(247,231,206,0.55)" }}>{s.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {(data?.resumeBase64 || data?.resume || data?.resumeUrl) && (
              <a
                href={data.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : (data.resume || data.resumeUrl)}
                download="Resume.pdf"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "2rem",
                  fontFamily: HEADING, fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: GOLD, textDecoration: "none",
                  border: `1px solid rgba(212,175,55,0.3)`, padding: "10px 24px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.1)"; e.currentTarget.style.borderColor = GOLD; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)"; }}
              >
                <FaDownload style={{ fontSize: "10px" }} /> Royal Dossier
              </a>
            )}
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ background: "rgba(247,231,206,0.02)", border: "1px solid rgba(212,175,55,0.12)", borderTop: `2px solid ${GOLD}`, padding: "2.25rem", position: "relative" }}>
              {/* Crown accent on form */}
              <div style={{ position: "absolute", top: "-1px", right: "24px", width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: `9px solid ${GOLD}` }} />

              <div style={{ fontFamily: DISPLAY, fontSize: "9px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}70`, marginBottom: "1.75rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
                Dispatch a Message
              </div>

              {status === "sent" ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  {/* Mini crown */}
                  <svg width="32" height="23" viewBox="0 0 32 23" fill="none" style={{ margin: "0 auto 1.5rem", display: "block" }}>
                    <path d="M1 21 L1 14 L7 4 L16 10 L25 1 L31 14 L31 21 Z" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinejoin="round"/>
                    <line x1="1" y1="21" x2="31" y2="21" stroke={GOLD} strokeWidth="1.5"/>
                    <circle cx="7" cy="4" r="1.8" fill={GOLD}/>
                    <circle cx="16" cy="10" r="1.8" fill={GOLD}/>
                    <circle cx="25" cy="1" r="1.8" fill={GOLD}/>
                  </svg>
                  <p style={{ fontFamily: DISPLAY, fontSize: "20px", fontWeight: 600, color: CHAMPAGNE, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Decree Received</p>
                  <p style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(247,231,206,0.4)" }}>A royal response shall follow.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontFamily: HEADING, fontSize: "8px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(247,231,206,0.3)", marginBottom: "6px" }}>Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                      style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = `${GOLD}60`}
                      onBlur={(e) => e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)"}
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontFamily: HEADING, fontSize: "8px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(247,231,206,0.3)", marginBottom: "6px" }}>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = `${GOLD}60`}
                      onBlur={(e) => e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)"}
                    />
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontFamily: HEADING, fontSize: "8px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(247,231,206,0.3)", marginBottom: "6px" }}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Your message..."
                      style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                      onFocus={(e) => e.currentTarget.style.borderColor = `${GOLD}60`}
                      onBlur={(e) => e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)"}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ fontFamily: BODY, fontSize: "12px", color: "#C06060", marginBottom: "1rem" }}>The message could not be delivered. Please try again.</p>
                  )}

                  <button type="submit" disabled={status === "sending"}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                      padding: "13px 36px", background: GOLD, border: `1px solid ${GOLD}`,
                      color: ROYAL, fontFamily: HEADING, fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.22em", textTransform: "uppercase", transition: "all 0.3s ease",
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}}
                    onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = ROYAL; }}
                  >
                    <FaPaperPlane style={{ fontSize: "10px" }} />
                    {status === "sending" ? "Dispatching…" : "Send Decree"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
