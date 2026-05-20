"use client";

import { useEffect, useRef, useState } from "react";

interface Service {
  _id?: string;
  icon: string;
  title: string;
  desc: string;
  order: number;
}

const FALLBACK: Service[] = [
  { icon: "◈", title: "DIGITAL STRATEGY",     desc: "Audience research, channel planning, and campaign roadmaps aligned with business objectives and measurable KPIs.",                          order: 0 },
  { icon: "⬡", title: "SEO & SEM",             desc: "Technical and content SEO, keyword strategy, and paid search campaigns optimized for maximum ROI and ranking dominance.",                   order: 1 },
  { icon: "◉", title: "PERFORMANCE MARKETING", desc: "Data-driven paid media across Google, Meta, and programmatic — ruthlessly focused on conversions and cost efficiency.",                      order: 2 },
  { icon: "▦", title: "CONTENT MARKETING",     desc: "Blog strategy, social content, email sequences, and thought leadership that attract, engage, and convert audiences.",                        order: 3 },
  { icon: "⬟", title: "BRAND & SOCIAL",        desc: "Brand positioning, social media management, community building, and creative campaign direction for lasting impact.",                        order: 4 },
  { icon: "△", title: "ANALYTICS & CRO",       desc: "Funnel analysis, A/B testing, heatmaps, and conversion rate optimization to squeeze maximum value from traffic.",                           order: 5 },
];

export default function Services() {
  const [services, setServices] = useState<Service[]>(FALLBACK);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/public/services")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length > 0) setServices(d); })
      .catch(() => {/* use fallback */});
  }, []);

  useEffect(() => {
    const run = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll(".service-card"), {
          y: 36, opacity: 0, stagger: 0.1, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 68%" },
        });
      }
    };
    run();
  }, [services]);

  const goContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="services" className="section-pad" style={{ position: "relative" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <div style={{ marginBottom: "clamp(28px,4vw,48px)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-accent)", letterSpacing: "0.3em", marginBottom: "6px" }}>{"// 03"}</div>
          <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 700 }}>
            SERVICES<span style={{ color: "var(--color-accent)" }}>.sh</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(14px,2.5vw,20px)" }}>
          {services.map((s) => (
            <div key={s._id ?? s.title} className="service-card retro-card" style={{ padding: "clamp(20px,3vw,28px)", display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.75rem", color: "var(--color-accent)", lineHeight: 1 }}>{s.icon}</span>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--color-text)", fontWeight: 700, letterSpacing: "0.1em", lineHeight: 1.4 }}>{s.title}</h3>
              <div style={{ height: "1px", background: "linear-gradient(to right, var(--color-accent), transparent)", opacity: 0.4 }} />
              <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.75, flex: 1 }}>{s.desc}</p>
              <button className="retro-btn" style={{ alignSelf: "flex-start", fontSize: "0.68rem", padding: "6px 14px" }} onClick={goContact}>INQUIRE →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
