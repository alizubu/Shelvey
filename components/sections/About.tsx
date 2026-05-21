"use client";

import { useEffect, useRef, useState } from "react";
import StatCounter from "@/components/ui/StatCounter";
import SkillBar    from "@/components/ui/SkillBar";

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
  bio: "I'm a Digital Marketing Specialist with a proven track record of leveraging analytics to drive measurable brand growth. Currently serving as an R&D Executive at Hirdaramani Bangladesh — spanning performance marketing, SEO, content strategy, and CRO. Outside work I'm passionate about films, gaming, and creative side projects.",
  location: "Chittagong, Bangladesh", email: "shelveyelmodias@gmail.com",
  yearsExp: 7, companies: 3,
  disciplines: [
    { icon: "⬡", title: "SEO & SEM",            desc: "Technical search optimization, keyword mapping, and paid search strategies." },
    { icon: "◈", title: "Performance Marketing", desc: "High-ROI paid media across Google, Meta, and programmatic networks." },
    { icon: "▦", title: "Content Strategy",      desc: "Audience-focused content planning and thought leadership." },
    { icon: "◉", title: "Brand Growth",          desc: "Data-backed positioning, community building, and campaign direction." },
  ],
};

export default function About() {
  const [data, setData] = useState<AboutData>(FALLBACK);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

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
      gsap.from(leftRef.current,  { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
      gsap.from(rightRef.current, { y: 40, opacity: 0, duration: 0.9, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
    };
    run();
  }, []);

  const disciplines = data.disciplines?.length ? data.disciplines : FALLBACK.disciplines;

  return (
    <section id="about" ref={sectionRef} className="section-pad" style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

      {/* Subtle grid background */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* ── Section header ── */}
      <div style={{ marginBottom: "clamp(40px,6vw,72px)", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
          <span className="about-section-badge" style={{
            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
            color: "var(--color-accent)", letterSpacing: "0.3em",
            background: "var(--color-accent-bg)", padding: "3px 10px",
            border: "1px solid var(--color-accent)",
            borderColor: "color-mix(in srgb, var(--color-accent) 20%, transparent)",
          }}>01</span>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right, var(--color-accent), transparent)" }} />
        </div>
        <h2 style={{
          fontFamily: "var(--font-mono)", fontSize: "clamp(1.8rem,4.5vw,2.8rem)", fontWeight: 700, lineHeight: 1.1,
          color: "var(--color-text)",
        }}>
          ABOUT<span style={{ color: "var(--color-accent)" }}>.exe</span>
        </h2>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-text-dim)",
          letterSpacing: "0.08em", marginTop: "10px",
        }}>
          {"// who i am & what i do"}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "clamp(36px,5vw,64px)", alignItems: "start", position: "relative" }}>

        {/* ══ LEFT COLUMN ══ */}
        <div ref={leftRef} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Bio card — uses CSS variables for theme awareness */}
          <div className="about-bio-card" style={{
            position: "relative",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            padding: "clamp(24px, 3vw, 32px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}>
            {/* Corner decorations */}
            <div style={{ position: "absolute", top: "-1px", left: "-1px", width: "20px", height: "20px", borderTop: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)", borderRadius: "8px 0 0 0", opacity: 0.7 }} />
            <div style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "20px", height: "20px", borderBottom: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)", borderRadius: "0 0 8px 0", opacity: 0.7 }} />

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--color-accent)", letterSpacing: "0.2em", marginBottom: "16px", opacity: 0.7 }}>
              {"/* BIO */"}
            </div>
            <p style={{
              fontSize: "0.92rem", color: "var(--color-text-muted)", lineHeight: 2,
              fontFamily: "var(--font-body)", fontWeight: 400,
            }}>
              {data.bio}
            </p>
          </div>

          {/* Contact info chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { icon: "📍", text: data.location },
              { icon: "✉",  text: data.email    },
            ].map(({ icon, text }) => (
              <div key={text} style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "var(--color-accent-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
                padding: "8px 14px",
                fontFamily: "var(--font-mono)", fontSize: "0.66rem",
                letterSpacing: "0.04em",
                transition: "all 0.25s ease",
              }}>
                <span style={{ fontSize: "0.8rem" }}>{icon}</span>
                <span style={{ color: "var(--color-text-muted)" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            overflow: "hidden",
            transition: "background 0.3s ease, border-color 0.3s ease",
          }}>
            {[
              { end: data.yearsExp, suffix: "+", label: "YRS EXP" },
              { end: data.companies, suffix: "",  label: "COMPANIES" },
              { end: "∞",           suffix: "",  label: "CAMPAIGNS" },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: "clamp(18px, 2.5vw, 28px) 12px",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid var(--color-border)" : "none",
                position: "relative",
              }}>
                {/* Top accent line for each stat */}
                <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(to right, transparent, var(--color-accent), transparent)", opacity: 0.4 }} />
                <StatCounter end={s.end} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div ref={rightRef} style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

          {/* Core Disciplines */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-text-muted)", letterSpacing: "0.2em" }}>{"// CORE DISCIPLINES"}</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--color-border), transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {disciplines.map((d, idx) => (
                <div key={d.title} className="discipline-card" style={{
                  padding: "clamp(14px, 2vw, 20px)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "6px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-accent)";
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1), 0 0 20px var(--color-accent-bg)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-border)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Accent top border */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: idx % 2 === 0
                      ? "linear-gradient(to right, var(--color-accent), transparent)"
                      : "linear-gradient(to right, #BD93F9, transparent)",
                    opacity: 0.6,
                  }} />

                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "1.4rem",
                    marginBottom: "12px", lineHeight: 1,
                    color: idx % 2 === 0 ? "var(--color-accent)" : "#BD93F9",
                  }}>{d.icon}</div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                    color: "var(--color-text)", fontWeight: 700,
                    marginBottom: "8px", letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>{d.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", lineHeight: 1.7, fontFamily: "var(--font-body)" }}>{d.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill bars — upgraded */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-text-muted)", letterSpacing: "0.2em" }}>{"// PROFICIENCY"}</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--color-border), transparent)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {SKILLS.map(s => (
                <SkillBar key={s.label} label={s.label} percent={s.percent} color={s.color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
