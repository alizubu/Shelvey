"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: compact ? "0" : "6px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        color: "var(--color-text-muted)",
        background: "transparent",
        border: "1px solid var(--color-border)",
        padding: compact ? "6px 8px" : "6px 12px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--color-accent)";
        el.style.color = "var(--color-accent)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--color-border)";
        el.style.color = "var(--color-text-muted)";
      }}
    >
      <span style={{ fontSize: "0.95rem", lineHeight: 1 }}>
        {isDark ? "☀" : "◑"}
      </span>
      {!compact && (
        <span style={{ marginLeft: "4px" }}>
          {isDark ? "LIGHT" : "DARK"}
        </span>
      )}
    </button>
  );
}
