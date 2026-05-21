"use client";

import { useEffect, useRef, useState } from "react";
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
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    // Animate the fill bar
    if (fillRef.current) {
      fillRef.current.style.width = `${percent}%`;
    }

    // Animate the number counting up
    const duration = 1200;
    const startTime = performance.now();
    let rafId: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedPercent(Math.floor(eased * percent));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [inView, percent]);

  const accentColor = isDark ? color : "var(--color-accent)";

  return (
    <div ref={ref} style={{
      padding: "14px 16px",
      background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
      borderRadius: "6px",
      transition: "all 0.3s ease",
    }}>
      {/* Label row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span style={{
          color: "var(--color-text-muted)",
          fontWeight: 500,
          fontSize: "0.66rem",
          letterSpacing: "0.04em",
        }}>{label}</span>
        <span style={{
          color: accentColor,
          fontWeight: 800,
          fontSize: "0.75rem",
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-mono)",
          textShadow: isDark ? `0 0 8px ${color}50` : "none",
        }}>{animatedPercent}%</span>
      </div>

      {/* Track */}
      <div style={{
        height: "4px",
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Fill */}
        <div
          ref={fillRef}
          style={{
            height: "100%",
            width: "0%",
            background: isDark
              ? `linear-gradient(90deg, ${color}66 0%, ${color} 100%)`
              : `linear-gradient(90deg, var(--color-accent) 0%, ${color}CC 100%)`,
            borderRadius: "4px",
            transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
            position: "relative",
            boxShadow: isDark ? `0 0 8px ${color}40, 0 1px 3px ${color}30` : "none",
          }}
        >
          {/* Animated shimmer */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: inView ? "shimmer 2s ease-in-out 1.3s 1 forwards" : "none",
            borderRadius: "4px",
          }} />
        </div>
      </div>
    </div>
  );
}
