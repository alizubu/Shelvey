"use client";

import { ReactNode } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  glow?: boolean;
}

export default function TerminalWindow({
  title = "terminal",
  children,
  className = "",
  id,
  glow = true,
}: TerminalWindowProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Parse "user@host:path" into coloured segments
  const renderTitle = (raw: string) => {
    const atIdx = raw.indexOf("@");
    const colonIdx = raw.indexOf(":");

    if (atIdx === -1 || colonIdx === -1) {
      return <span style={{ color: "var(--color-text-muted)", fontSize: "0.7rem" }}>{raw}</span>;
    }

    const user = raw.slice(0, atIdx);
    const host = raw.slice(atIdx + 1, colonIdx);
    const path = raw.slice(colonIdx + 1);

    return (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.04em" }}>
        <span style={{ color: isDark ? "#8BE9FD" : "#0969DA" }}>{user}</span>
        <span style={{ color: isDark ? "rgba(139,233,253,0.4)" : "rgba(9,105,218,0.4)" }}>@</span>
        <span style={{ color: "var(--color-accent)", fontWeight: 600, textShadow: isDark ? "0 0 8px rgba(57,255,20,0.6)" : "none" }}>{host}</span>
        <span style={{ color: isDark ? "rgba(139,233,253,0.4)" : "rgba(9,105,218,0.4)" }}>:</span>
        <span style={{ color: isDark ? "#BD93F9" : "#8250DF", fontWeight: 500 }}>{path}</span>
      </span>
    );
  };

  return (
    <div
      className={`terminal-window ${className}`}
      id={id}
      style={{
        boxShadow: isDark
          ? (glow
            ? "0 0 0 1px rgba(57,255,20,0.15), 0 4px 24px rgba(0,0,0,0.5), 0 0 80px rgba(57,255,20,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
            : "0 4px 20px rgba(0,0,0,0.4)")
          : "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        backdropFilter: isDark ? "blur(4px)" : "none",
        borderRadius: "12px",
      }}
    >
      {/* ── Title bar chrome ── */}
      <div
        className="terminal-header"
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(30,30,30,0.98) 0%, rgba(20,20,20,0.98) 100%)"
            : "linear-gradient(180deg, #F8F8F6 0%, #F0F0EC 100%)",
          borderBottom: isDark
            ? "1px solid rgba(57,255,20,0.08)"
            : "1px solid rgba(0,0,0,0.06)",
          padding: "11px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          userSelect: "none",
        }}
      >
        {/* Traffic-light dots */}
        <span className="terminal-dot" style={{ backgroundColor: "#FF5F57", boxShadow: isDark ? "inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 6px rgba(255,95,87,0.5)" : "inset 0 -1px 0 rgba(0,0,0,0.1)" }} />
        <span className="terminal-dot" style={{ backgroundColor: "#FFBD2E", boxShadow: isDark ? "inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 6px rgba(255,189,46,0.4)" : "inset 0 -1px 0 rgba(0,0,0,0.1)" }} />
        <span className="terminal-dot" style={{ backgroundColor: "#28C840", boxShadow: isDark ? "inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 6px rgba(40,200,64,0.5)" : "inset 0 -1px 0 rgba(0,0,0,0.1)" }} />

        {/* Separator */}
        <span style={{ width: "1px", height: "14px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)", margin: "0 8px", flexShrink: 0 }} />

        {/* Title */}
        {title && renderTitle(title)}

        {/* Right decorative element */}
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: isDark ? "rgba(57,255,20,0.25)" : "var(--color-text-dim)", letterSpacing: "0.12em" }}>zsh</span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-accent)", boxShadow: isDark ? "0 0 4px rgba(57,255,20,0.4)" : "none", opacity: isDark ? 0.4 : 0.6 }} />
        </span>
      </div>

      {/* ── Body ── */}
      <div
        className="terminal-body"
        style={{
          padding: "clamp(20px, 3vw, 32px) clamp(20px, 3vw, 28px)",
          position: "relative",
          background: isDark
            ? "linear-gradient(180deg, rgba(17,17,17,1) 0%, rgba(10,10,10,1) 100%)"
            : "#FFFFFF",
        }}
      >
        {/* CRT scanline overlay — dark only */}
        {isDark && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 1,
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
              opacity: 0.8,
            }}
          />
        )}

        {/* Vignette — dark only */}
        {isDark && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 1,
              background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        )}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
