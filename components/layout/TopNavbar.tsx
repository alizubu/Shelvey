"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/lib/lenis-config";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "hero",       label: "HERO",     icon: "▶" },
  { id: "about",      label: "ABOUT",    icon: "◉" },
  { id: "experience", label: "EXP",      icon: "⬡" },
  { id: "services",   label: "SERVICES", icon: "▦" },
  { id: "contact",    label: "CONTACT",  icon: "✉" },
];

export default function TopNavbar() {
  const [active, setActive]     = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typeText, setTypeText] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

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

  /* ── Typewriter effect for menu title ── */
  useEffect(() => {
    if (!menuOpen) { setTypeText(""); return; }
    const target = "MENU_";
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypeText(target.slice(0, i));
      if (i >= target.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [menuOpen]);

  /* ── Lock body scroll when menu open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
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
            background: "none",
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/assets/logos/shelvey-logo-white.svg"
            alt="Shelvey Logo"
            className="logo-dark"
            style={{ height: "28px", width: "auto" }}
          />
          <img
            src="/assets/logos/shelvey-logo-black.svg"
            alt="Shelvey Logo"
            className="logo-light"
            style={{ height: "28px", width: "auto" }}
          />
        </button>

        {/* ── Desktop nav links (md+) ── */}
        <nav
          style={{
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

        {/* ── Mobile: theme toggle + hamburger (top-right) ── */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <ThemeToggle compact />

          {/* Animated Burger → X */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              background: menuOpen ? "var(--color-accent-bg)" : "transparent",
              border: "1px solid",
              borderColor: menuOpen ? "var(--color-accent)" : "var(--color-border)",
              color: menuOpen ? "var(--color-accent)" : "var(--color-text-muted)",
              padding: 0,
              cursor: "pointer",
              width: "36px",
              height: "36px",
              borderRadius: "4px",
              transition: "all 0.25s ease",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 3 bars that morph to X */}
            <div style={{ width: "16px", height: "12px", position: "relative" }}>
              <span style={{
                position: "absolute", left: 0, width: "16px", height: "1.5px",
                background: "currentColor", borderRadius: "1px",
                transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
                top: menuOpen ? "5px" : "0px",
                transform: menuOpen ? "rotate(45deg)" : "rotate(0)",
              }} />
              <span style={{
                position: "absolute", left: 0, top: "5px", width: "16px", height: "1.5px",
                background: "currentColor", borderRadius: "1px",
                transition: "all 0.2s ease",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }} />
              <span style={{
                position: "absolute", left: 0, width: menuOpen ? "16px" : "10px", height: "1.5px",
                background: "currentColor", borderRadius: "1px",
                transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
                top: menuOpen ? "5px" : "10px",
                transform: menuOpen ? "rotate(-45deg)" : "rotate(0)",
              }} />
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer (Framer Motion) ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 198,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(4px)",
              }}
              className="md:hidden"
            />

            {/* Drawer panel — slides from right */}
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8,
              }}
              className="md:hidden"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(320px, 85vw)",
                zIndex: 250,
                background: "var(--color-surface)",
                borderLeft: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Scanline sweep — decorative */}
              <motion.div
                initial={{ top: "-100%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(to right, transparent, var(--color-accent), transparent)",
                  opacity: 0.3,
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              />

              {/* Corner brackets — retro targeting */}
              <div aria-hidden="true" style={{ position: "absolute", top: "12px", left: "12px", width: "16px", height: "16px", borderTop: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)", opacity: 0.4 }} />
              <div aria-hidden="true" style={{ position: "absolute", top: "12px", right: "12px", width: "16px", height: "16px", borderTop: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)", opacity: 0.4 }} />
              <div aria-hidden="true" style={{ position: "absolute", bottom: "12px", left: "12px", width: "16px", height: "16px", borderBottom: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)", opacity: 0.4 }} />
              <div aria-hidden="true" style={{ position: "absolute", bottom: "12px", right: "12px", width: "16px", height: "16px", borderBottom: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)", opacity: 0.4 }} />

              {/* Header */}
              <div style={{
                padding: "20px 24px 16px",
                borderBottom: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--color-text-dim)",
                    letterSpacing: "0.2em",
                    marginBottom: "4px",
                  }}>
                    {"// NAVIGATION"}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    letterSpacing: "0.08em",
                  }}>
                    {typeText}<span style={{ opacity: 0.5, animation: "pulse_glow 1s ease-in-out infinite" }}>▌</span>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    width: "32px", height: "32px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                    background: "transparent",
                    color: "var(--color-text-muted)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
                >
                  ✕
                </button>
              </div>

              {/* Nav links with stagger */}
              <nav style={{ flex: 1, padding: "16px 0", display: "flex", flexDirection: "column", gap: "2px" }}>
                {NAV_ITEMS.map(({ id, label, icon }, idx) => {
                  const isActive = active === id;
                  return (
                    <motion.button
                      key={id}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + idx * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => scrollTo(id)}
                      className="nav-drawer-link"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.82rem",
                        letterSpacing: "0.14em",
                        color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                        background: isActive ? "var(--color-accent-bg)" : "transparent",
                        border: "none",
                        borderLeft: `3px solid ${isActive ? "var(--color-accent)" : "transparent"}`,
                        padding: "16px 24px",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "var(--color-accent-bg)";
                          e.currentTarget.style.color = "var(--color-accent)";
                          e.currentTarget.style.borderLeftColor = "var(--color-accent)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--color-text-muted)";
                          e.currentTarget.style.borderLeftColor = "transparent";
                        }
                      }}
                    >
                      <span style={{
                        fontSize: "1rem",
                        opacity: isActive ? 1 : 0.5,
                        transition: "opacity 0.2s",
                      }}>{icon}</span>
                      <span>{label}</span>
                      {isActive && (
                        <span style={{
                          marginLeft: "auto",
                          fontSize: "0.6rem",
                          opacity: 0.6,
                          color: "var(--color-accent)",
                        }}>●</span>
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Status */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                  color: "var(--color-text-dim)", letterSpacing: "0.1em",
                }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "var(--color-accent)",
                    boxShadow: "0 0 6px var(--color-accent)",
                  }} />
                  ONLINE
                </div>

                {/* Theme toggle in drawer */}
                <ThemeToggle />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
