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
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    if (fillRef.current) {
      fillRef.current.style.width = `${percent}%`;
    }

    const duration = 1100;
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

  return (
    <div ref={ref} style={{
      padding: "14px 0",
      borderBottom: "1px solid var(--color-border)",
    }}>
      {/* Label + percent */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        fontFamily: "var(--font-mono)",
      }}>
        <span style={{
          color: "var(--color-text-muted)",
          fontWeight: 500,
          fontSize: "0.78rem",
          letterSpacing: "0.02em",
        }}>{label}</span>
        <span style={{
          color: isDark ? color : "var(--color-accent)",
          fontWeight: 800,
          fontSize: "0.82rem",
          fontFamily: "var(--font-mono)",
          textShadow: isDark ? `0 0 8px ${color}50` : "none",
          minWidth: "36px",
          textAlign: "right",
        }}>{animatedPercent}%</span>
      </div>

      {/* Track */}
      <div style={{
        height: "8px",
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
        borderRadius: "4px",
        overflow: "hidden",
      }}>
        <div
          ref={fillRef}
          style={{
            height: "100%",
            width: "0%",
            background: isDark
              ? `linear-gradient(90deg, ${color}55, ${color})`
              : `linear-gradient(90deg, var(--color-accent), ${color}BB)`,
            borderRadius: "4px",
            transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
            boxShadow: isDark ? `0 0 10px ${color}40` : "none",
          }}
        />
      </div>
    </div>
  );
}
