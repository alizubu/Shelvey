"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname }         from "next/navigation";
import Link                    from "next/link";
import { useTheme }            from "@/components/layout/ThemeProvider";

const NAV_LINKS = [
  { href: "/admin/dashboard",            icon: "◈", label: "DASHBOARD" },
  { href: "/admin/dashboard/hero",       icon: "▶", label: "HERO" },
  { href: "/admin/dashboard/about",      icon: "◉", label: "ABOUT" },
  { href: "/admin/dashboard/experience", icon: "⬡", label: "EXP" },
  { href: "/admin/dashboard/services",   icon: "▦", label: "SVC" },
  { href: "/admin/dashboard/social",     icon: "⬟", label: "SOC" },
  { href: "/admin/dashboard/seo",        icon: "△", label: "SEO" },
  { href: "/admin/dashboard/messages",   icon: "✉", label: "MSG" },
];

const LABELS: Record<string, string> = {
  "/admin/dashboard":             "DASHBOARD",
  "/admin/dashboard/hero":        "HERO",
  "/admin/dashboard/about":       "ABOUT",
  "/admin/dashboard/experience":  "EXPERIENCE",
  "/admin/dashboard/services":    "SERVICES",
  "/admin/dashboard/social":      "SOCIAL",
  "/admin/dashboard/seo":         "SEO",
  "/admin/dashboard/messages":    "MESSAGES",
};

export default function AdminHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const label    = LABELS[pathname] ?? "ADMIN";
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header style={{
        height: "52px",
        background: isDark ? "rgba(17,17,17,0.95)" : "rgba(255,255,255,0.95)",
        borderBottom: `1px solid ${isDark ? "#1A1A1A" : "#E8E8E4"}`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: "10px",
        flexShrink: 0,
        transition: "background 0.3s ease, border-color 0.3s ease",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "0.6rem", color: "var(--color-text-dim)", letterSpacing: "0.1em" }}>~$</span>
          <span style={{ fontSize: "0.72rem", color: "var(--color-text)", letterSpacing: "0.12em", fontWeight: 600 }}>
            {label}
          </span>
        </div>

        {/* Desktop nav links — hidden on mobile */}
        <nav className="hidden md:flex" style={{ marginLeft: "auto", gap: "2px", alignItems: "center" }}>
          {NAV_LINKS.map(({ href, label: navLabel }) => {
            const exact = href === "/admin/dashboard";
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{
                fontSize: "0.6rem",
                letterSpacing: "0.08em",
                color: active ? "var(--color-accent)" : "var(--color-text-dim)",
                textDecoration: "none",
                padding: "4px 8px",
                borderRadius: "3px",
                background: active ? "var(--color-accent-bg)" : "transparent",
                transition: "all 0.15s ease",
              }}>
                {navLabel}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }} className="md:ml-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              fontFamily: "inherit", fontSize: "0.6rem", letterSpacing: "0.08em",
              color: "var(--color-text-dim)",
              background: "transparent",
              border: `1px solid var(--color-border)`,
              padding: "4px 10px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              borderRadius: "3px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-dim)"; }}
          >
            <span style={{ fontSize: "0.8rem" }}>{isDark ? "☀" : "◑"}</span>
            <span className="hidden sm:inline">{isDark ? "LIGHT" : "DARK"}</span>
          </button>

          {/* User */}
          {session?.user && (
            <div className="hidden sm:flex" style={{
              fontSize: "0.58rem", color: "var(--color-text-dim)",
              alignItems: "center", gap: "6px",
            }}>
              <span style={{ color: "var(--color-accent)" }}>●</span>
              <span>{session.user.name}</span>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="hidden sm:block"
            style={{
              fontFamily: "inherit", fontSize: "0.58rem", letterSpacing: "0.1em",
              color: "var(--color-text-dim)", background: "transparent",
              border: `1px solid var(--color-border)`,
              padding: "4px 8px", cursor: "pointer",
              transition: "all 0.18s", borderRadius: "3px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5F57"; e.currentTarget.style.color = "#FF5F57"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-dim)"; }}
          >
            ✕
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            className="flex md:hidden"
            aria-label="Toggle menu"
            style={{
              background: mobileMenuOpen ? "var(--color-accent-bg)" : "transparent",
              border: `1px solid ${mobileMenuOpen ? "var(--color-accent)" : "var(--color-border)"}`,
              color: mobileMenuOpen ? "var(--color-accent)" : "var(--color-text-dim)",
              width: "32px", height: "32px",
              borderRadius: "4px", cursor: "pointer",
              alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease",
              fontSize: "0.85rem",
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile dropdown nav */}
      {mobileMenuOpen && (
        <div className="md:hidden" style={{
          background: isDark ? "rgba(17,17,17,0.98)" : "rgba(255,255,255,0.98)",
          borderBottom: `1px solid var(--color-border)`,
          padding: "8px 0",
          position: "sticky",
          top: "52px",
          zIndex: 99,
          backdropFilter: "blur(12px)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", padding: "0 8px" }}>
            {NAV_LINKS.map(({ href, icon, label: navLabel }) => {
              const exact = href === "/admin/dashboard";
              const active = exact ? pathname === href : pathname.startsWith(href);
              return (
                <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                  padding: "10px 4px",
                  fontSize: "0.55rem", letterSpacing: "0.06em",
                  color: active ? "var(--color-accent)" : "var(--color-text-dim)",
                  background: active ? "var(--color-accent-bg)" : "transparent",
                  borderRadius: "4px",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}>
                  <span style={{ fontSize: "0.9rem" }}>{icon}</span>
                  <span>{navLabel}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile logout */}
          <div style={{ padding: "8px 16px 4px", borderTop: `1px solid var(--color-border)`, marginTop: "8px" }}>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              style={{
                fontFamily: "inherit", fontSize: "0.6rem", letterSpacing: "0.1em",
                color: "#FF5F57", background: "transparent",
                border: "1px solid #FF5F57",
                padding: "6px 12px", cursor: "pointer",
                borderRadius: "3px", width: "100%",
              }}
            >
              LOGOUT ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
