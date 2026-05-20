"use client";

interface GlowBadgeProps {
  children: React.ReactNode;
  amber?: boolean;
  className?: string;
}

export default function GlowBadge({ children, amber = false, className = "" }: GlowBadgeProps) {
  return (
    <span
      className={`glow-badge inline-block ${className}`}
      style={
        amber
          ? {
              background: "rgba(245,166,35,0.1)",
              border: "1px solid rgba(245,166,35,0.3)",
              color: "#F5A623",
            }
          : {}
      }
    >
      {children}
    </span>
  );
}
