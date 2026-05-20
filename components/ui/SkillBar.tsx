"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface SkillBarProps {
  label: string;
  percent: number;
  color?: string;
}

export default function SkillBar({ label, percent, color = "#39FF14" }: SkillBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView && fillRef.current) {
      fillRef.current.style.transform = `scaleX(${percent / 100})`;
    }
  }, [inView, percent]);

  return (
    <div ref={ref}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "8px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.06em",
        }}
      >
        <span style={{ color: "var(--color-text-muted)", fontWeight: 500 }}>{label}</span>
        <span style={{
          color,
          fontWeight: 700,
          fontSize: "0.72rem",
          textShadow: `0 0 8px ${color}40`,
        }}>{percent}%</span>
      </div>
      <div style={{
        height: "6px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "3px",
        overflow: "hidden",
        position: "relative",
      }}>
        <div
          ref={fillRef}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}60, 0 0 16px ${color}20`,
            transformOrigin: "left",
            transform: "scaleX(0)",
            transition: "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "0.2s",
            borderRadius: "3px",
            position: "relative",
          }}
        >
          {/* Shine effect */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)",
            borderRadius: "3px 3px 0 0",
          }} />
        </div>
      </div>
    </div>
  );
}
