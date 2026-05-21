"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname }         from "next/navigation";
import Link                    from "next/link";
import { useTheme }            from "@/components/layout/ThemeProvider";

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

  return (
    <header style={{
      height: "52px",
      background: isDark ? "#111111" : "#FFFFFF",
      borderBottom: `1px solid ${isDark ? "#1A1A1A" : "#E8E8E4"}`,
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      gap: "12px",
      flexShrink: 0,
      transition: "background 0.3s ease, border-color 0.3s ease",
    }}>
      {/* Breadcrumb */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "0.6rem", color: isDark ? "#444" : "#999", letterSpacing: "0.1em" }}>~$</span>
        <span style={{ fontSize: "0.72rem", color: isDark ? "#E8E8E8" : "#1A1A1A", letterSpacing: "0.12em" }}>
          {label}
        </span>
      </div>

      {/* Mobile nav links */}
      <div className="flex md:hidden gap-3">
        {[
          { href: "/admin/dashboard/hero",       short: "HERO" },
          { href: "/admin/dashboard/about",      short: "ABOUT" },
          { href: "/admin/dashboard/experience", short: "EXP" },
          { href: "/admin/dashboard/services",   short: "SVC" },
          { href: "/admin/dashboard/social",     short: "SOC" },
          { href: "/admin/dashboard/seo",        short: "SEO" },
          { href: "/admin/dashboard/messages",   short: "MSG" },
        ].map(({ href, short }) => (
          <Link key={href} href={href} style={{
            fontSize: "0.6rem",
            color: pathname.startsWith(href) ? "var(--color-accent)" : (isDark ? "#555" : "#999"),
            textDecoration: "none", letterSpacing: "0.08em",
          }}>
            {short}
          </Link>
        ))}
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontFamily: "inherit",
          fontSize: "0.62rem",
          letterSpacing: "0.08em",
          color: isDark ? "#888" : "#666",
          background: "transparent",
          border: `1px solid ${isDark ? "#2A2A2A" : "#E2E2DC"}`,
          padding: "5px 10px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          borderRadius: "3px",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? "#2A2A2A" : "#E2E2DC"; e.currentTarget.style.color = isDark ? "#888" : "#666"; }}
      >
        <span style={{ fontSize: "0.85rem" }}>{isDark ? "☀" : "◑"}</span>
        <span>{isDark ? "LIGHT" : "DARK"}</span>
      </button>

      {/* User badge */}
      {session?.user && (
        <div style={{
          fontSize: "0.62rem", color: isDark ? "#555" : "#999",
          letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span style={{ color: "var(--color-accent)" }}>●</span>
          <span className="hidden sm:inline">{session.user.name}</span>
        </div>
      )}

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        style={{
          fontFamily: "inherit",
          fontSize: "0.62rem",
          letterSpacing: "0.1em",
          color: isDark ? "#666" : "#999",
          background: "transparent",
          border: `1px solid ${isDark ? "#2A2A2A" : "#E2E2DC"}`,
          padding: "5px 10px",
          cursor: "pointer",
          transition: "all 0.18s",
          borderRadius: "3px",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5F57"; e.currentTarget.style.color = "#FF5F57"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? "#2A2A2A" : "#E2E2DC"; e.currentTarget.style.color = isDark ? "#666" : "#999"; }}
      >
        LOGOUT ✕
      </button>
    </header>
  );
}
