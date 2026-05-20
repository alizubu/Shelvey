"use client";

import { ReactNode } from "react";

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
        <span style={{ color: "#8BE9FD" }}>{user}</span>
        <span style={{ color: "rgba(139,233,253,0.4)" }}>@</span>
        <span style={{ color: "var(--color-accent)", fontWeight: 600, textShadow: "0 0 8px rgba(57,255,20,0.6)" }}>{host}</span>
        <span style={{ color: "rgba(139,233,253,0.4)" }}>:</span>
        <span style={{ color: "#BD93F9", fontWeight: 500 }}>{path}</span>
      </span>
    );
  };

  return (
    <div
      className={`terminal-window ${className}`}
      id={id}
      style={{
        boxShadow: glow
          ? "0 0 0 1px rgba(57,255,20,0.15), 0 4px 24px rgba(0,0,0,0.5), 0 0 80px rgba(57,255,20,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "0 4px 20px rgba(0,0,0,0.4)",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* ── Title bar chrome ── */}
      <div
        className="terminal-header"
        style={{
          background: "linear-gradient(180deg, rgba(30,30,30,0.98) 0%, rgba(20,20,20,0.98) 100%)",
          borderBottom: "1px solid rgba(57,255,20,0.08)",
          padding: "11px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          userSelect: "none",
        }}
      >
        {/* Traffic-light dots */}
        <span className="terminal-dot" style={{ backgroundColor: "#FF5F57", boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 6px rgba(255,95,87,0.5)" }} />
        <span className="terminal-dot" style={{ backgroundColor: "#FFBD2E", boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 6px rgba(255,189,46,0.4)" }} />
        <span className="terminal-dot" style={{ backgroundColor: "#28C840", boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 6px rgba(40,200,64,0.5)" }} />

        {/* Separator */}
        <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.06)", margin: "0 8px", flexShrink: 0 }} />

        {/* Title */}
        {title && renderTitle(title)}

        {/* Right decorative element */}
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(57,255,20,0.25)", letterSpacing: "0.12em" }}>zsh</span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(57,255,20,0.4)", boxShadow: "0 0 4px rgba(57,255,20,0.4)" }} />
        </span>
      </div>

      {/* ── Body ── */}
      <div
        style={{
          padding: "clamp(20px, 3vw, 32px) clamp(20px, 3vw, 28px)",
          position: "relative",
          background: "linear-gradient(180deg, rgba(17,17,17,1) 0%, rgba(10,10,10,1) 100%)",
        }}
      >
        {/* CRT scanline overlay */}
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

        {/* Vignette */}
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

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
