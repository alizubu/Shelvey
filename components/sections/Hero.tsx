"use client";

import { useEffect, useRef, useState, Suspense, lazy } from "react";
import TypewriterText from "@/components/ui/TypewriterText";
import TerminalWindow from "@/components/ui/TerminalWindow";
import GlowBadge      from "@/components/ui/GlowBadge";
import { getLenis }   from "@/lib/lenis-config";

const ParticleCanvas = lazy(() => import("./ParticleCanvas"));

interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  badgeText: string;
  location: string;
  statusText: string;
}

const FALLBACK: HeroData = {
  name:             "SHELVEY ELMO DIAS",
  title:            "Digital Marketing Specialist",
  subtitle:         "SEO & SEM Expert | Analytics & CRO",
  tagline:          "Driving measurable growth through data-driven strategy, performance marketing, and conversion optimization.",
  ctaPrimaryText:   "VIEW WORK ↓",
  ctaPrimaryLink:   "about",
  ctaSecondaryText: "HIRE ME →",
  ctaSecondaryLink: "contact",
  badgeText:        "SED v1.0",
  location:         "CHT, BD",
  statusText:       "ONLINE",
};

export default function Hero() {
  const [data, setData] = useState<HeroData>(FALLBACK);

  const terminalRef = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/public/hero")
      .then(r => r.json())
      .then(d => { if (d) setData({ ...FALLBACK, ...d }); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const run = async () => {
      const { heroLoadTimeline } = await import("@/lib/gsap-animations");
      heroLoadTimeline(
        terminalRef.current, null,
        taglineRef.current, ctaRef.current, scrollRef.current
      );
    };
    run();
  }, []);

  const goTo = (id: string) => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(`#${id}`, { duration: 1.2 });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(60px,8vw,120px) clamp(16px,4vw,40px)",
      }}
    >
      {/* Ambient radial glow behind terminal */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(900px, 90vw)",
          height: "600px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at center, rgba(57,255,20,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Suspense fallback={null}>
        <ParticleCanvas />
      </Suspense>

      {/* Version badge */}
      <div style={{ position: "absolute", top: "24px", left: "clamp(16px,4vw,80px)", zIndex: 20 }}>
        <GlowBadge>{data.badgeText}</GlowBadge>
      </div>

      {/* Main content */}
      <div ref={terminalRef} style={{ width: "100%", maxWidth: "min(780px, 92vw)", zIndex: 10 }}>
        <TerminalWindow title="shelvey@portfolio:~">
          <TypewriterText
            lines={[data.name, data.title, data.subtitle]}
            speed={32}
            startDelay={600}
          />
        </TerminalWindow>

        {/* Tagline */}
        <div ref={taglineRef} style={{ marginTop: "32px", opacity: 0 }}>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.88rem, 1.8vw, 1.02rem)",
            color: "var(--color-text-muted)",
            letterSpacing: "0.01em",
            lineHeight: 1.9,
            borderLeft: "2px solid var(--color-accent)",
            paddingLeft: "18px",
            fontWeight: 400,
            maxWidth: "600px",
            fontStyle: "italic",
          }}>
            &quot;{data.tagline}&quot;
          </p>
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap", opacity: 0 }}>
          <button className="retro-btn" onClick={() => goTo(data.ctaPrimaryLink)}>
            <span>{data.ctaPrimaryText}</span>
          </button>
          <button className="retro-btn retro-btn-amber" onClick={() => goTo(data.ctaSecondaryLink)}>
            <span>{data.ctaSecondaryText}</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        onClick={() => goTo(data.ctaPrimaryLink)}
        style={{
          position: "absolute", bottom: "32px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "8px", cursor: "pointer", opacity: 0, zIndex: 10,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--color-text-dim)", letterSpacing: "0.25em" }}>
          SCROLL
        </span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--color-accent), transparent)", animation: "pulse_glow 2.5s ease-in-out infinite" }} />
        <span style={{ color: "var(--color-accent)", fontSize: "0.7rem", animation: "float 3s ease-in-out infinite" }}>▼</span>
      </div>

      {/* Top-right status */}
      <div style={{
        position: "absolute", top: "24px", right: "clamp(16px,3vw,32px)",
        fontFamily: "var(--font-mono)", fontSize: "0.58rem",
        color: "var(--color-text-dim)", letterSpacing: "0.08em",
        textAlign: "right", lineHeight: 2.2, zIndex: 20,
      }}>
        <div style={{ opacity: 0.6 }}>📍 {data.location}</div>
        <div style={{ color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "5px" }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-accent)", boxShadow: "0 0 6px var(--color-accent)", display: "inline-block", animation: "pulse_glow 2s ease-in-out infinite" }} />
          {data.statusText}
        </div>
      </div>
    </section>
  );
}
