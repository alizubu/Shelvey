"use client";

import { useEffect, useState, useCallback } from "react";
import { getLenis } from "@/lib/lenis-config";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "hero",       label: "HERO" },
  { id: "about",      label: "ABOUT" },
  { id: "experience", label: "EXP" },
  { id: "services",   label: "SERVICES" },
  { id: "contact",    label: "CONTACT" },
];

export default function TopNavbar() {
  const [active, setActive]     = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(id); }); },
        { threshold: 0.35 }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  /* ── background blur on scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close menu on resize to desktop ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(`#${id}`, { duration: 1.2 });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ── NAV BAR ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: "56px",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          transition: "background 0.3s ease, border-color 0.3s ease",
          background: scrolled
            ? "var(--nav-bg-scrolled)"
            : "var(--nav-bg)",
          borderBottom: "1px solid var(--nav-border)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--color-accent)",
            letterSpacing: "0.12em",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
            padding: 0,
          }}
        >
          SED<span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>.portfolio</span>
        </button>

        {/* ── Desktop nav links (md+) ── */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginLeft: "auto",
            marginRight: "16px",
          }}
          className="hidden md:flex"
        >
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                  background: isActive ? "var(--color-accent-bg)" : "transparent",
                  border: "1px solid",
                  borderColor: isActive ? "var(--color-accent)" : "transparent",
                  padding: "4px 10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--color-text)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--color-text-muted)";
                    e.currentTarget.style.borderColor = "transparent";
                  }
                }}
              >
                {isActive && (
                  <span style={{
                    position: "absolute",
                    left: "50%",
                    bottom: "-1px",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "2px",
                    background: "var(--color-accent)",
                    boxShadow: "0 0 6px var(--color-accent)",
                  }} />
                )}
                {label}
              </button>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* ── Mobile: theme toggle + hamburger ── */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <ThemeToggle compact />

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              background: "transparent",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
              padding: "6px 8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
            }}
          >
            {menuOpen ? (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", lineHeight: 1 }}>✕</span>
            ) : (
              <>
                <span style={{ display: "block", width: "16px", height: "1px", background: "currentColor" }} />
                <span style={{ display: "block", width: "16px", height: "1px", background: "currentColor" }} />
                <span style={{ display: "block", width: "10px", height: "1px", background: "currentColor", alignSelf: "flex-start" }} />
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div
          className="flex md:hidden"
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            zIndex: 199,
            background: "var(--nav-bg-scrolled)",
            borderBottom: "1px solid var(--color-border)",
            backdropFilter: "blur(16px)",
            flexDirection: "column",
            padding: "8px 0",
          }}
        >
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.14em",
                  color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                  background: isActive ? "var(--color-accent-bg)" : "transparent",
                  border: "none",
                  borderLeft: `2px solid ${isActive ? "var(--color-accent)" : "transparent"}`,
                  padding: "12px 24px",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  transition: "all 0.2s ease",
                }}
              >
                {isActive ? "▶ " : "  "}{label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
