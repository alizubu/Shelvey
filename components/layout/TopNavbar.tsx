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

  /* ── close menu on scroll ── */
  useEffect(() => {
    if (!menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

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
          padding: "0 clamp(12px, 3vw, 20px)",
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.04)" : "none",
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
                  }} />
                )}
                {label}
              </button>
            );
          })}
        </nav>

        {/* Theme toggle — desktop */}
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
              background: menuOpen ? "var(--color-accent-bg)" : "transparent",
              border: "1px solid",
              borderColor: menuOpen ? "var(--color-accent)" : "var(--color-border)",
              color: menuOpen ? "var(--color-accent)" : "var(--color-text-muted)",
              padding: "6px 8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: menuOpen ? "0" : "4px",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "4px",
              transition: "all 0.2s ease",
            }}
          >
            {menuOpen ? (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", lineHeight: 1 }}>✕</span>
            ) : (
              <>
                <span style={{ display: "block", width: "14px", height: "1.5px", background: "currentColor", borderRadius: "1px", transition: "all 0.2s" }} />
                <span style={{ display: "block", width: "14px", height: "1.5px", background: "currentColor", borderRadius: "1px", transition: "all 0.2s" }} />
                <span style={{ display: "block", width: "9px", height: "1.5px", background: "currentColor", borderRadius: "1px", alignSelf: "flex-start", marginLeft: "3px", transition: "all 0.2s" }} />
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile dropdown menu ── */}
      <div
        className="flex md:hidden"
        style={{
          position: "fixed",
          top: "56px",
          left: 0,
          right: 0,
          zIndex: 199,
          background: "var(--nav-bg-scrolled)",
          borderBottom: menuOpen ? "1px solid var(--color-border)" : "none",
          backdropFilter: "blur(16px)",
          flexDirection: "column",
          padding: menuOpen ? "12px 0" : "0",
          maxHeight: menuOpen ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease, opacity 0.2s ease",
          opacity: menuOpen ? 1 : 0,
          boxShadow: menuOpen ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
        }}
      >
        {NAV_ITEMS.map(({ id, label }, idx) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                letterSpacing: "0.14em",
                color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                background: isActive ? "var(--color-accent-bg)" : "transparent",
                border: "none",
                borderLeft: `3px solid ${isActive ? "var(--color-accent)" : "transparent"}`,
                padding: "14px 24px",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.2s ease",
                transitionDelay: menuOpen ? `${idx * 0.03}s` : "0s",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: isActive ? "var(--color-accent)" : "var(--color-border)",
                flexShrink: 0,
                transition: "background 0.2s ease",
              }} />
              {label}
            </button>
          );
        })}
      </div>
    </>
  );
}
