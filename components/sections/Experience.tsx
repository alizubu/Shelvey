"use client";

import { useEffect, useRef, useState } from "react";
import GlowBadge from "@/components/ui/GlowBadge";

interface Job {
  _id?: string; role: string; company: string; period: string;
  focus: string[]; desc: string; current: boolean; order: number;
}
const FALLBACK: Job[] = [
  { role: "R&D Executive", company: "Hirdaramani Bangladesh", period: "Jan 2026 — Present", focus: ["Market Research","Digital Innovation","Growth Strategy"], desc: "Driving research and development initiatives to identify emerging digital market trends, optimize internal marketing technologies, and implement innovative growth strategies for the brand.", current: true, order: 0 },
  { role: "Senior Digital Marketing Officer", company: "Golden Son Ltd.", period: "2021 — Dec 2025", focus: ["Full-Funnel Strategy","Performance Marketing"], desc: "Led end-to-end digital marketing operations for a leading Bangladeshi manufacturer. Designed and executed comprehensive Google Ads and Meta campaigns, overhauled technical SEO, and implemented rigorous CRO testing.", current: false, order: 1 },
  { role: "Executive Advertisement", company: "Dainik Purbokone", period: "2018 — Nov 2021", focus: ["Digital Ad Sales","News Media Monetization"], desc: "Managed executive-level advertising and digital monetization for a prominent regional news media outlet. Utilized retargeting structures and technical SEO to boost audience retention.", current: false, order: 2 },
];

export default function Experience() {
  const [jobs, setJobs]       = useState<Job[]>(FALLBACK);
  const [expanded, setExpanded] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch("/api/public/experience")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length > 0) setJobs(d); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const run = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    };
    run();
  }, [jobs]);

  return (
    <section id="experience" ref={sectionRef} className="section-pad" style={{ position: "relative" }}>
      {/* Subtle grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--color-border) 1px,transparent 1px),linear-gradient(90deg,var(--color-border) 1px,transparent 1px)", backgroundSize: "60px 60px", opacity: 0.18, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
        {/* Section header */}
        <div style={{ marginBottom: "clamp(36px,5vw,60px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ width: "32px", height: "1px", background: "var(--color-accent)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-accent)", letterSpacing: "0.3em" }}>{"// 02"}</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, lineHeight: 1 }}>
            EXPERIENCE<span style={{ color: "var(--color-accent)" }}>.log</span>
          </h2>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(to right, var(--color-accent), transparent)", marginTop: "16px" }} />
        </div>

        {/* Timeline — vertical left line on desktop, plain stack on mobile */}
        <div style={{ position: "relative", paddingLeft: "clamp(0px, 5vw, 40px)" }}>

          {/* Left vertical line (desktop) */}
          <div className="hidden md:block" style={{
            position: "absolute", left: "0", top: "20px", bottom: "20px",
            width: "2px",
            background: "linear-gradient(to bottom, var(--color-accent), transparent)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {jobs.map((job, i) => (
              <div
                key={job._id ?? i}
                ref={el => { itemRefs.current[i] = el; }}
                style={{ position: "relative" }}
              >
                {/* Timeline dot (desktop) */}
                <div className="hidden md:block" style={{
                  position: "absolute", left: "-46px", top: "24px",
                  width: "14px", height: "14px", borderRadius: "50%",
                  background: job.current ? "var(--color-accent)" : "var(--color-bg)",
                  border: `2px solid ${job.current ? "var(--color-accent)" : "var(--color-border)"}`,
                  boxShadow: job.current ? "0 0 12px var(--color-accent)" : "none",
                  zIndex: 2,
                }} />

                {/* Card */}
                <div style={{
                  background: "var(--color-surface)",
                  border: `1px solid ${job.current ? "var(--color-accent)" : "var(--color-border)"}`,
                  padding: "clamp(20px,3vw,32px)",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                  position: "relative",
                  overflow: "hidden",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px var(--color-accent-bg)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = job.current ? "var(--color-accent)" : "var(--color-border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  {/* Top accent bar for current job */}
                  {job.current && (
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, var(--color-accent), transparent)" }} />
                  )}

                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                    <div>
                      {job.current && (
                        <div style={{ marginBottom: "8px" }}>
                          <GlowBadge>● CURRENT ROLE</GlowBadge>
                        </div>
                      )}
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1rem,2.5vw,1.2rem)", color: "var(--color-text)", fontWeight: 700, letterSpacing: "0.04em" }}>
                        {job.company}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-2)", marginTop: "4px" }}>
                        {job.role}
                      </div>
                    </div>
                    {/* Period badge */}
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                      color: "var(--color-text-dim)", letterSpacing: "0.1em",
                      background: "var(--color-surface-2)",
                      border: "1px solid var(--color-border)",
                      padding: "6px 12px", whiteSpace: "nowrap", flexShrink: 0,
                    }}>
                      {job.period}
                    </div>
                  </div>

                  {/* Focus tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {job.focus.map(f => (
                      <span key={f} style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.62rem",
                        color: "var(--color-accent)", letterSpacing: "0.08em",
                        background: "var(--color-accent-bg)",
                        border: "1px solid var(--color-border)",
                        padding: "3px 10px",
                      }}>{f}</span>
                    ))}
                  </div>

                  {/* Expandable description */}
                  {expanded === i ? (
                    <div>
                      <p style={{ fontSize: "0.84rem", color: "var(--color-text-muted)", lineHeight: 1.85, marginBottom: "16px", borderLeft: "2px solid var(--color-border)", paddingLeft: "14px" }}>
                        {job.desc}
                      </p>
                      <button className="retro-btn" style={{ fontSize: "0.68rem", padding: "6px 16px" }} onClick={() => setExpanded(null)}>
                        ▲ COLLAPSE
                      </button>
                    </div>
                  ) : (
                    <button className="retro-btn" style={{ fontSize: "0.68rem", padding: "6px 16px" }} onClick={() => setExpanded(i)}>
                      ▶ READ MORE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
