"use client";

import { useEffect, useRef, useState } from "react";
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
        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out",
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
      style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}
    >
      {/* ── Section header ── */}
      <div className="about-animate" style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            color: "var(--color-accent)", letterSpacing: "0.3em",
            background: "var(--color-accent-bg)", padding: "3px 10px",
            border: "1px solid var(--color-border)",
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
          fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-text-dim)",
          letterSpacing: "0.08em", marginTop: "8px",
        }}>
          {"// who i am & what i do"}
        </p>
      </div>

      {/* ── Bio ── */}
      <div className="about-animate" style={{ marginBottom: "clamp(28px,4vw,40px)" }}>
        <p style={{
          fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: 2,
          fontFamily: "var(--font-body)", fontWeight: 400,
          maxWidth: "720px",
          borderLeft: "2px solid var(--color-accent)",
          paddingLeft: "20px",
        }}>
          {data.bio}
        </p>
      </div>

      {/* ── Info row: location + email + stats ── */}
      <div className="about-animate" style={{
        display: "flex", flexWrap: "wrap", alignItems: "center",
        gap: "16px", marginBottom: "clamp(36px,5vw,52px)",
      }}>
        {[
          { icon: "📍", text: data.location },
          { icon: "✉",  text: data.email    },
        ].map(({ icon, text }) => (
          <div key={text} style={{
            display: "flex", alignItems: "center", gap: "8px",
            fontFamily: "var(--font-mono)", fontSize: "0.66rem",
            color: "var(--color-text-muted)", letterSpacing: "0.04em",
          }}>
            <span style={{ fontSize: "0.8rem" }}>{icon}</span>
            <span>{text}</span>
          </div>
        ))}

        {/* Divider */}
        <div style={{ width: "1px", height: "20px", background: "var(--color-border)", margin: "0 4px" }} />

        {/* Inline stats */}
        {[
          { val: `${data.yearsExp}+`, label: "yrs" },
          { val: `${data.companies}`, label: "companies" },
        ].map(s => (
          <div key={s.label} style={{
            display: "flex", alignItems: "baseline", gap: "4px",
            fontFamily: "var(--font-mono)",
          }}>
            <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--color-accent)" }}>{s.val}</span>
            <span style={{ fontSize: "0.58rem", color: "var(--color-text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Two-column: Disciplines + Proficiency ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
        gap: "clamp(32px,4vw,48px)",
        alignItems: "start",
      }}>

        {/* ─ Core Disciplines ─ */}
        <div className="about-animate">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-text-dim)", letterSpacing: "0.2em" }}>{"// CORE DISCIPLINES"}</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--color-border), transparent)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {disciplines.map((d, idx) => (
              <div key={d.title} style={{
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
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--color-border)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Accent top line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: idx % 2 === 0
                    ? "linear-gradient(to right, var(--color-accent), transparent)"
                    : "linear-gradient(to right, #BD93F9, transparent)",
                  opacity: 0.5,
                }} />

                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "1.2rem",
                  marginBottom: "10px", lineHeight: 1,
                  color: idx % 2 === 0 ? "var(--color-accent)" : "#BD93F9",
                }}>{d.icon}</div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                  color: "var(--color-text)", fontWeight: 700,
                  marginBottom: "6px", letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}>{d.title}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", lineHeight: 1.7, fontFamily: "var(--font-body)" }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─ Proficiency ─ */}
        <div className="about-animate">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-text-dim)", letterSpacing: "0.2em" }}>{"// PROFICIENCY"}</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--color-border), transparent)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {SKILLS.map(s => (
              <SkillBar key={s.label} label={s.label} percent={s.percent} color={s.color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
