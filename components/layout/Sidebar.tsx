"use client";

import { useEffect, useState, useCallback } from "react";
import { getLenis } from "@/lib/lenis-config";

const NAV_ITEMS = [
  { id: "hero",       label: "HERO"       },
  { id: "about",      label: "ABOUT"      },
  { id: "experience", label: "EXPERIENCE" },
  { id: "services",   label: "SERVICES"   },
  { id: "contact",    label: "CONTACT"    },
];

export default function Sidebar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(id); }); },
        { threshold: 0.4 }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(`#${id}`, { duration: 1.2 });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-5"
      aria-label="Section dot navigation"
    >
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${label}`}
          >
            {/* Dot */}
            <span style={{
              display: "inline-block",
              width: "9px", height: "9px",
              borderRadius: "50%",
              border: `1px solid ${isActive ? "var(--color-accent)" : "var(--color-text-dim)"}`,
              backgroundColor: isActive ? "var(--color-accent)" : "transparent",
              boxShadow: isActive ? "0 0 7px var(--color-accent)" : "none",
              flexShrink: 0,
              transition: "all 0.25s ease",
            }} />
            {/* Label — shown when active or on hover */}
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: isActive ? "var(--color-accent)" : "var(--color-text-dim)",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateX(0)" : "translateX(-6px)",
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
              className="group-hover:!opacity-100 group-hover:!translate-x-0"
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
