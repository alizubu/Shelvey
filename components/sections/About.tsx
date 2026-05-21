"use client";

import { useEffect, useRef, useState } from "react";
import SkillBar from "@/components/ui/SkillBar";

const SKILLS = [
  { label: "SEO & Technical Optimization",        percent: 95, color: "#39FF14" },
  { label: "Performance Marketing (Google/Meta)", percent: 92, color: "#39FF14" },
  { label: "Analytics & CRO",                    percent: 90, color: "#8BE9FD" },
  { label: "Content Strategy",                   percent: 85, color: "#F5A623" },
  { label: "Brand Growth & Social",              percent: 88, color: "#BD93F9" },
];

interface Discipline { icon: string; title: string; desc: string; }
interface AboutData {
  bio: string; location: string; email: string;
  yearsExp: number; companies: number; disciplines: Discipline[];
}
const FALLBACK: AboutData = {
  bio: "I'm a Digital Marketing Specialist with a proven track record of leveraging analytics to drive measurable brand growth. Currently serving as an R&D Executive at Hirdaramani Bangladesh — spanning performance marketing, SEO, content strategy, and CRO.",
  location: "Chittagong, Bangladesh", email: "shelveyelmodias@gmail.com",
  yearsExp: 7, companies: 3,
  disciplines: [
    { icon: "⬡", title: "SEO & SEM",            desc: "Technical search optimization, keyword mapping, and paid search strategies." },
    { icon: "◈", title: "Performance Marketing", desc: "High-ROI paid media across Google, Meta, and programmatic networks." },
    { icon: "▦", title: "Content Strategy",      desc: "Audience-focused content planning and thought leadership." },
    { icon: "◉", title: "Brand Growth",          desc: "Data-backed positioning, community building, and campaign direction." },
  ],
};

const FOCUS_ITEMS = [
  "Performance Growth",
  "SEO Scaling",
  "Conversion Optimization",
  "Brand Strategy",
];

function CurrentFocus() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setActiveIdx(i % FOCUS_ITEMS.length);
      i++;
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      marginTop: "24px",
      borderTop: "1px solid var(--color-border)",
      paddingTop: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-text-dim)", letterSpacing: "0.2em" }}>{"// CURRENT FOCUS"}</span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--color-border), transparent)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {FOCUS_ITEMS.map((item, idx) => (
          <div key={item} style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1px solid",
            borderColor: activeIdx === idx ? "var(--color-accent)" : "var(--color-border)",
            background: activeIdx === idx ? "var(--color-accent-bg)" : "transparent",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            fontFamily: "var(--font-mono)",
          }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
              background: activeIdx === idx ? "var(--color-accent)" : "var(--color-border)",
              boxShadow: activeIdx === idx ? "0 0 8px var(--color-accent)" : "none",
              transition: "all 0.4s ease",
            }} />
            <span style={{
              fontSize: "0.76rem",
              color: activeIdx === idx ? "var(--color-accent)" : "var(--color-text-muted)",
              fontWeight: activeIdx === idx ? 600 : 400,
              letterSpacing: "0.04em",
              transition: "color 0.4s ease",
            }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const [data, setData] = useState<AboutData>(FALLBACK);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/public/about")
      .then(r => r.json())
      .then(d => { if (d) setData({ ...FALLBACK, ...d }); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const run = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;
      const els = sectionRef.current.querySelectorAll(".about-animate");
      gsap.from(els, {
        y: 28, opacity: 0, stagger: 0.1, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    };
    run();
  }, []);

  const disciplines = data.disciplines?.length ? data.disciplines : FALLBACK.disciplines;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad"
      style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}
    >
      {/* ── Section header ── */}
      <div className="about-animate" style={{ marginBottom: "clamp(32px,4vw,48px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
            color: "var(--color-accent)", letterSpacing: "0.3em",
            background: "var(--color-accent-bg)", padding: "3px 10px",
            border: "1px solid var(--color-border)",
          }}>01</span>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right, var(--color-accent), transparent)" }} />
        </div>
        <h2 style={{
          fontFamily: "var(--font-mono)", fontSize: "clamp(2rem,5vw,3rem)",
          fontWeight: 700, lineHeight: 1.1, color: "var(--color-text)",
        }}>
          ABOUT<span style={{ color: "var(--color-accent)" }}>.exe</span>
        </h2>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-text-dim)",
          letterSpacing: "0.08em", marginTop: "8px",
        }}>{"// who i am & what i do"}</p>
      </div>

      {/* ══ MAIN GRID ══ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
        gap: "clamp(20px,3vw,32px)",
        alignItems: "stretch",
      }}>

        {/* ─── LEFT COLUMN ─── */}
        <div className="about-animate" style={{
          display: "flex", flexDirection: "column", gap: "0",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "10px",
          overflow: "hidden",
        }}>

          {/* Top: Bio + Info */}
          <div style={{ padding: "clamp(24px,3vw,32px)", borderBottom: "1px solid var(--color-border)" }}>
            {/* Bio */}
            <p style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              color: "var(--color-text-muted)", lineHeight: 1.85,
              fontFamily: "var(--font-body)", fontWeight: 400,
              marginBottom: "24px",
              borderLeft: "2px solid var(--color-accent)",
              paddingLeft: "16px",
            }}>
              {data.bio}
            </p>

            {/* Info badges row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[
                { icon: "📍", text: data.location },
                { icon: "✉",  text: data.email    },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "6px", padding: "8px 14px",
                  fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                  color: "var(--color-text-muted)",
                  flex: "1 1 auto",
                  minWidth: "140px",
                }}>
                  <span style={{ fontSize: "0.85rem" }}>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}

              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "var(--color-accent-bg)",
                border: "1px solid var(--color-accent)",
                borderRadius: "8px", padding: "12px 22px",
                fontFamily: "var(--font-mono)",
                flex: "1 1 auto",
                minWidth: "120px",
              }}>
                <span style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800,
                  color: "var(--color-accent)",
                  textShadow: "0 0 16px rgba(57,255,20,0.4)",
                  lineHeight: 1,
                }}>{data.yearsExp}+</span>
                <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", letterSpacing: "0.12em", lineHeight: 1.3 }}>YRS<br/>EXP</span>
              </div>

              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "var(--color-accent-bg)",
                border: "1px solid var(--color-accent)",
                borderRadius: "8px", padding: "12px 22px",
                fontFamily: "var(--font-mono)",
                flex: "1 1 auto",
                minWidth: "120px",
              }}>
                <span style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800,
                  color: "var(--color-accent)",
                  textShadow: "0 0 16px rgba(57,255,20,0.4)",
                  lineHeight: 1,
                }}>{data.companies}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", letterSpacing: "0.12em", lineHeight: 1.3 }}>COMPA<br/>NIES</span>
              </div>
            </div>
          </div>

          {/* Bottom: Discipline Cards */}
          <div style={{ padding: "clamp(20px,3vw,28px)", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-text-dim)", letterSpacing: "0.2em" }}>{"// CORE DISCIPLINES"}</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--color-border), transparent)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {disciplines.map((d, idx) => (
                <div key={d.title} style={{
                  padding: "clamp(16px,2.5vw,22px)",
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  transition: "all 0.25s ease",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-accent)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-border)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: idx % 2 === 0
                      ? "linear-gradient(to right, var(--color-accent), transparent)"
                      : "linear-gradient(to right, #BD93F9, transparent)",
                    opacity: 0.6,
                  }} />
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "1.5rem",
                    marginBottom: "12px", lineHeight: 1,
                    color: idx % 2 === 0 ? "var(--color-accent)" : "#BD93F9",
                  }}>{d.icon}</div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.78rem",
                    color: "var(--color-text)", fontWeight: 700,
                    marginBottom: "8px", letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>{d.title}</div>
                  <div style={{
                    fontSize: "0.78rem", color: "var(--color-text-muted)",
                    lineHeight: 1.7, fontFamily: "var(--font-body)",
                  }}>{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: Proficiency Card ─── */}
        <div className="about-animate" style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "10px",
          padding: "clamp(24px,3vw,32px)",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-text-dim)", letterSpacing: "0.2em" }}>{"// PROFICIENCY"}</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--color-border), transparent)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
            {SKILLS.map(s => (
              <SkillBar key={s.label} label={s.label} percent={s.percent} color={s.color} />
            ))}
          </div>

          {/* Current Focus */}
          <CurrentFocus />
        </div>
      </div>
    </section>
  );
}
