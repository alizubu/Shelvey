"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatCounterProps {
  end: number | string;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function StatCounter({
  end,
  label,
  suffix = "",
  prefix = "",
  duration = 2000,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (!inView || started || typeof end !== "number") return;
    setStarted(true);

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (end as number)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration, started]);

  const display = typeof end === "string" ? end : count;

  return (
    <div ref={ref} className="text-center">
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          color: "var(--color-accent)",
          fontWeight: 800,
          lineHeight: 1,
          textShadow: "0 0 24px rgba(57,255,20,0.35), 0 0 48px rgba(57,255,20,0.1)",
          letterSpacing: "-0.02em",
        }}
      >
        {prefix}{display}{suffix}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          color: "var(--color-text-dim)",
          letterSpacing: "0.18em",
          marginTop: "10px",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}
