"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { href: "/admin/dashboard/hero",       icon: "▶", label: "HERO",       desc: "Name, title, tagline, CTA buttons"  },
  { href: "/admin/dashboard/about",      icon: "◉", label: "ABOUT",      desc: "Bio, location, disciplines"         },
  { href: "/admin/dashboard/experience", icon: "⬡", label: "EXPERIENCE", desc: "Work history & timeline"            },
  { href: "/admin/dashboard/services",   icon: "▦", label: "SERVICES",   desc: "Service cards & descriptions"       },
  { href: "/admin/dashboard/social",     icon: "⬟", label: "SOCIAL",     desc: "Facebook, Instagram, GitHub URLs"   },
  { href: "/admin/dashboard/seo",        icon: "△", label: "SEO",        desc: "Meta title, description, OG image"  },
  { href: "/admin/dashboard/messages",   icon: "✉", label: "MESSAGES",   desc: "Contact form inbox from visitors"   },
];

interface Counts { experiences: number; services: number; messages: number; }

export default function DashboardPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [time,   setTime]   = useState("");

  /* Live clock */
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  /* Fetch counts — graceful: null / non-array is handled */
  useEffect(() => {
    const safe = (v: unknown): number =>
      Array.isArray(v) ? v.length : 0;

    Promise.allSettled([
      fetch("/api/admin/experience").then(r => r.json()),
      fetch("/api/admin/services").then(r => r.json()),
      fetch("/api/admin/messages").then(r => r.json()),
    ]).then(([exp, svc, msg]) => {
      setCounts({
        experiences: safe(exp.status === "fulfilled" ? exp.value : null),
        services:    safe(svc.status === "fulfilled" ? svc.value : null),
        messages:    safe(msg.status === "fulfilled" ? msg.value : null),
      });
    });
  }, []);

  const STAT_COLOR = "#39FF14";

  return (
    <div>
      {/* ── Terminal header ── */}
      <div style={{
        background: "#111111",
        border: "1px solid #1A1A1A",
        padding: "20px 24px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <div>
          <div style={{ fontSize: "0.6rem", color: "#39FF14", letterSpacing: "0.3em", marginBottom: "6px" }}>
            ~$ admin@portfolio — dashboard
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#E8E8E8", letterSpacing: "0.1em" }}>
            ADMIN PANEL<span style={{ color: "#39FF14" }}>_</span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.1em", marginTop: "4px" }}>
            SHELVEY ELMO DIAS — PORTFOLIO CONTROL CENTER
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.1em", fontVariantNumeric: "tabular-nums" }}>
            {time || "00:00:00"}
          </div>
          <div style={{ fontSize: "0.58rem", color: "#444", letterSpacing: "0.08em", marginTop: "2px" }}>
            SYSTEM ONLINE
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: "10px",
        marginBottom: "24px",
      }}>
        {[
          { label: "SECTIONS",    val: "7",                                        color: STAT_COLOR  },
          { label: "EXPERIENCES", val: counts ? String(counts.experiences) : "—",  color: "#F5A623"  },
          { label: "SERVICES",    val: counts ? String(counts.services)    : "—",  color: STAT_COLOR  },
          { label: "MESSAGES",    val: counts ? String(counts.messages)    : "—",  color: "#F5A623"  },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            background: "#111111",
            border: "1px solid #1A1A1A",
            padding: "14px 16px",
          }}>
            <div style={{ fontSize: "0.56rem", color: "#444", letterSpacing: "0.14em", marginBottom: "8px" }}>
              {label}
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color, fontFamily: "'IBM Plex Mono', monospace" }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* ── Section cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "12px",
      }}>
        {SECTIONS.map(({ href, icon, label, desc }) => (
          <Link
            key={href}
            href={href}
            style={{
              display: "block",
              background: "#111111",
              border: "1px solid #1A1A1A",
              padding: "20px",
              textDecoration: "none",
              transition: "border-color 0.18s ease, box-shadow 0.18s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#39FF14";
              (e.currentTarget as HTMLElement).style.boxShadow   = "2px 2px 0 #39FF14";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A";
              (e.currentTarget as HTMLElement).style.boxShadow   = "none";
            }}
          >
            <div style={{ fontSize: "1.4rem", color: "#39FF14", marginBottom: "10px" }}>{icon}</div>
            <div style={{
              fontSize: "0.78rem", color: "#E8E8E8",
              fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700,
              letterSpacing: "0.12em", marginBottom: "6px",
            }}>
              {label}
            </div>
            <div style={{ fontSize: "0.68rem", color: "#555", letterSpacing: "0.06em", lineHeight: 1.6 }}>
              {desc}
            </div>
            <div style={{ fontSize: "0.62rem", color: "#39FF14", marginTop: "14px", letterSpacing: "0.1em" }}>
              EDIT →
            </div>
          </Link>
        ))}
      </div>

      {/* ── Footer note ── */}
      <div style={{
        marginTop: "28px",
        padding: "14px 18px",
        border: "1px solid #1A1A1A",
        background: "#111111",
        fontSize: "0.65rem",
        color: "#333",
        letterSpacing: "0.08em",
        lineHeight: 1.8,
      }}>
        <span style={{ color: "#39FF14" }}>NOTE:</span> Connect MongoDB Atlas to persist changes.
        Without a DB connection, edits are not saved between sessions.
      </div>
    </div>
  );
}
