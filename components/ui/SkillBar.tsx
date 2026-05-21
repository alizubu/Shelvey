"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@/components/layout/ThemeProvider";

interface SkillBarProps {
  label: string;
  percent: number;
  color?: string;
}

export default function SkillBar({ label, percent, color = "#39FF14" }: SkillBarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const fillRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView && fillRef.current) {
      fillRef.current.style.transform = `scaleX(${percent / 100})`;
    }
  }, [inView, percent]);

  return (
    <div ref={ref} style={{ padding: "2px 0" }}>
      {/* Label row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span style={{
          color: "var(--color-text-muted)",
          fontWeight: 500,
          fontSize: "0.68rem",
          letterSpacing: "0.04em",
        }}>{label}</span>
        <span style={{
          color: isDark ? color : "var(--color-accent)",
          fontWeight: 700,
          fontSize: "0.7rem",
          letterSpacing: "0.02em",
          textShadow: isDark ? `0 0 6px ${color}40` : "none",
          minWidth: "32px",
          textAlign: "right",
        }}>{percent}%</span>
      </div>

      {/* Track */}
      <div style={{
        height: "5px",
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Fill */}
        <div
          ref={fillRef}
          style={{
            height: "100%",
            background: isDark
              ? `linear-gradient(90deg, ${color}88, ${color})`
              : `linear-gradient(90deg, ${color}CC, var(--color-accent))`,
            boxShadow: isDark ? `0 0 6px ${color}40` : "none",
            transformOrigin: "left",
            transform: "scaleX(0)",
            transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "0.15s",
            borderRadius: "4px",
            position: "relative",
          }}
        >
          {/* Subtle shine */}
          {isDark && (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
              borderRadius: "4px 4px 0 0",
            }} />
          )}
        </div>
      </div>
    </div>
  );
}
