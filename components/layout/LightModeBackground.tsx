"use client";

import { useTheme } from "@/components/layout/ThemeProvider";

/**
 * Light-mode-only ambient background with:
 * - Soft floating gradient orbs
 * - Subtle dot grid texture
 * - Gentle animated mesh gradient
 * Hidden completely in dark mode.
 */
export default function LightModeBackground() {
  const { theme } = useTheme();

  if (theme === "dark") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Dot grid texture ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(26,140,0,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.4,
        }}
      />

      {/* ── Floating gradient orb 1 — top right ── */}
      <div
        className="light-orb light-orb-1"
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,140,0,0.06) 0%, rgba(26,140,0,0.02) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Floating gradient orb 2 — bottom left ── */}
      <div
        className="light-orb light-orb-2"
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,140,0,0.05) 0%, rgba(192,120,0,0.03) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Floating gradient orb 3 — center ── */}
      <div
        className="light-orb light-orb-3"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(130,80,223,0.04) 0%, rgba(26,140,0,0.02) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Subtle diagonal lines texture ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            135deg,
            transparent,
            transparent 40px,
            rgba(26,140,0,0.015) 40px,
            rgba(26,140,0,0.015) 41px
          )`,
        }}
      />

      {/* ── Animated mesh gradient overlay ── */}
      <div
        className="light-mesh"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          background: `
            conic-gradient(from 0deg at 30% 20%, rgba(26,140,0,0.04) 0deg, transparent 60deg, transparent 360deg),
            conic-gradient(from 120deg at 70% 80%, rgba(192,120,0,0.03) 0deg, transparent 60deg, transparent 360deg),
            conic-gradient(from 240deg at 50% 50%, rgba(130,80,223,0.03) 0deg, transparent 60deg, transparent 360deg)
          `,
        }}
      />
    </div>
  );
}
