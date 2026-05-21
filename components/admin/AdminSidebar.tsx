"use client";

import Link     from "next/link";
import { usePathname } from "next/navigation";
import { useTheme }    from "@/components/layout/ThemeProvider";

const NAV = [
  { href: "/admin/dashboard",            icon: "◈", label: "DASHBOARD"   },
  { href: "/admin/dashboard/hero",       icon: "▶", label: "HERO"        },
  { href: "/admin/dashboard/about",      icon: "◉", label: "ABOUT"       },
  { href: "/admin/dashboard/experience", icon: "⬡", label: "EXPERIENCE"  },
  { href: "/admin/dashboard/services",   icon: "▦", label: "SERVICES"    },
  { href: "/admin/dashboard/social",     icon: "⬟", label: "SOCIAL"      },
  { href: "/admin/dashboard/seo",        icon: "△", label: "SEO"         },
  { href: "/admin/dashboard/messages",   icon: "✉", label: "MESSAGES"    },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <aside style={{
      width: "220px",
      minWidth: "220px",
      background: isDark ? "#111111" : "#FAFAF8",
      borderRight: `1px solid ${isDark ? "#1A1A1A" : "#E8E8E4"}`,
      flexDirection: "column",
      padding: "0",
      flexShrink: 0,
      transition: "background 0.3s ease, border-color 0.3s ease",
    }}
    className="hidden md:flex"
    >
      {/* Logo */}
      <div style={{
        padding: "20px 20px 16px",
        borderBottom: `1px solid ${isDark ? "#1A1A1A" : "#E8E8E4"}`,
        marginBottom: "8px",
      }}>
        <div style={{ fontSize: "0.62rem", color: isDark ? "#444" : "#999", letterSpacing: "0.2em", marginBottom: "4px" }}>
          PORTFOLIO
        </div>
        <div style={{ fontSize: "0.88rem", color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.12em" }}>
          ADMIN PANEL
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 0" }}>
        {NAV.map(({ href, icon, label }) => {
          const exact  = href === "/admin/dashboard";
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                color:       active ? "var(--color-accent)" : (isDark ? "#666666" : "#888888"),
                background:  active ? "var(--color-accent-bg)" : "transparent",
                borderLeft:  active ? "2px solid var(--color-accent)" : "2px solid transparent",
                textDecoration: "none",
                transition: "all 0.18s ease",
              }}
            >
              <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${isDark ? "#1A1A1A" : "#E8E8E4"}` }}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: "0.6rem", color: isDark ? "#444" : "#999", letterSpacing: "0.1em", textDecoration: "none" }}
        >
          ↗ VIEW PORTFOLIO
        </a>
      </div>
    </aside>
  );
}
