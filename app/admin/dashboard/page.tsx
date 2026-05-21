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

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const safe = (v: unknown): number => Array.isArray(v) ? v.length : 0;
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

  return (
    <div>
      {/* ── Terminal header ── */}
      <div style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        padding: "24px 28px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <div>
          <div style={{ fontSize: "0.6rem", color: "var(--color-accent)", letterSpacing: "0.3em", marginBottom: "6px" }}>
            ~$ admin@portfolio — dashboard
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-text)", letterSpacing: "0.1em" }}>
            ADMIN PANEL<span style={{ color: "var(--color-accent)" }}>_</span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--color-text-dim)", letterSpacing: "0.1em", marginTop: "4px" }}>
            SHELVEY ELMO DIAS — PORTFOLIO CONTROL CENTER
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.62rem", color: "var(--color-accent)", letterSpacing: "0.1em", fontVariantNumeric: "tabular-nums" }}>
            {time || "00:00:00"}
          </div>
          <div style={{ fontSize: "0.58rem", color: "var(--color-text-dim)", letterSpacing: "0.08em", marginTop: "2px" }}>
            SYSTEM ONLINE
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: "12px",
        marginBottom: "24px",
      }}>
        {[
          { label: "SECTIONS",    val: "7",                                        color: "var(--color-accent)" },
          { label: "EXPERIENCES", val: counts ? String(counts.experiences) : "—",  color: "var(--color-accent-2)" },
          { label: "SERVICES",    val: counts ? String(counts.services)    : "—",  color: "var(--color-accent)" },
          { label: "MESSAGES",    val: counts ? String(counts.messages)    : "—",  color: "var(--color-accent-2)" },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            padding: "16px 18px",
            transition: "border-color 0.2s ease, transform 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ fontSize: "0.56rem", color: "var(--color-text-dim)", letterSpacing: "0.14em", marginBottom: "8px" }}>
              {label}
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* ── Section cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "14px",
      }}>
        {SECTIONS.map(({ href, icon, label, desc }) => (
          <Link
            key={href}
            href={href}
            style={{
              display: "block",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "22px",
              textDecoration: "none",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-accent)";
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-border)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "1.4rem", color: "var(--color-accent)", marginBottom: "12px" }}>{icon}</div>
            <div style={{
              fontSize: "0.8rem", color: "var(--color-text)",
              fontWeight: 700, letterSpacing: "0.12em", marginBottom: "6px",
            }}>
              {label}
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--color-text-dim)", letterSpacing: "0.04em", lineHeight: 1.6 }}>
              {desc}
            </div>
            <div style={{ fontSize: "0.64rem", color: "var(--color-accent)", marginTop: "14px", letterSpacing: "0.1em" }}>
              EDIT →
            </div>
          </Link>
        ))}
      </div>

      {/* ── Footer note ── */}
      <div style={{
        marginTop: "28px",
        padding: "14px 18px",
        border: "1px solid var(--color-border)",
        borderRadius: "6px",
        background: "var(--color-surface)",
        fontSize: "0.65rem",
        color: "var(--color-text-dim)",
        letterSpacing: "0.08em",
        lineHeight: 1.8,
      }}>
        <span style={{ color: "var(--color-accent)" }}>NOTE:</span> Connect MongoDB Atlas to persist changes.
        Without a DB connection, edits are not saved between sessions.
      </div>
    </div>
  );
}
