"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname }         from "next/navigation";
import Link                    from "next/link";

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

  return (
    <header style={{
      height: "52px",
      background: "#111111",
      borderBottom: "1px solid #1A1A1A",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      gap: "12px",
      flexShrink: 0,
    }}>
      {/* Mobile: hamburger-style breadcrumb */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "0.6rem", color: "#444", letterSpacing: "0.1em" }}>~$</span>
        <span style={{ fontSize: "0.72rem", color: "#E8E8E8", letterSpacing: "0.12em" }}>
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
            fontSize: "0.6rem", color: pathname.startsWith(href) ? "#39FF14" : "#555",
            textDecoration: "none", letterSpacing: "0.08em",
          }}>
            {short}
          </Link>
        ))}
      </div>

      {/* User badge */}
      {session?.user && (
        <div style={{
          fontSize: "0.62rem", color: "#555",
          letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span style={{ color: "#39FF14" }}>●</span>
          <span>{session.user.name}</span>
        </div>
      )}

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        style={{
          fontFamily: "inherit",
          fontSize: "0.62rem",
          letterSpacing: "0.1em",
          color: "#666",
          background: "transparent",
          border: "1px solid #2A2A2A",
          padding: "5px 10px",
          cursor: "pointer",
          transition: "all 0.18s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5F57"; e.currentTarget.style.color = "#FF5F57"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2A2A2A"; e.currentTarget.style.color = "#666"; }}
      >
        LOGOUT ✕
      </button>
    </header>
  );
}
