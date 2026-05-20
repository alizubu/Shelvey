"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  lines: string[];
  speed?: number;
  startDelay?: number;
  className?: string;
}

export default function TypewriterText({
  lines,
  speed = 35,
  startDelay = 600,
  className = "",
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState<string[]>(lines.map(() => ""));
  const [activeLine, setActiveLine] = useState(0);
  const [done, setDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeChar = () => {
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const currentLine = lines[lineIdx];

      if (charIdx <= currentLine.length) {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIdx] = currentLine.slice(0, charIdx);
          return next;
        });
        setActiveLine(lineIdx);
        charIdx++;
        timeout = setTimeout(typeChar, speed);
      } else {
        lineIdx++;
        charIdx = 0;
        if (lineIdx < lines.length) {
          timeout = setTimeout(typeChar, speed * 6);
        } else {
          setDone(true);
        }
      }
    };

    const startTimeout = setTimeout(typeChar, startDelay);
    const blinkInterval = setInterval(() => setCursorVisible((c) => !c), 500);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
      clearInterval(blinkInterval);
    };
  }, [lines, speed, startDelay]);

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {lines.map((_, i) => {
        const isActive = !done && i === activeLine;
        const isLastDone = done && i === lines.length - 1;
        const showCursor = (isActive || isLastDone) && cursorVisible;

        // ── Line 0: Name — big, bold, white with glow
        // ── Line 1: Title — medium, accent green
        // ── Line 2: Subtitle — smaller, muted
        const isName = i === 0;
        const isTitle = i === 1;

        const fontSize = isName
          ? "clamp(1.8rem, 5vw, 3.2rem)"
          : isTitle
          ? "clamp(0.88rem, 2.2vw, 1.25rem)"
          : "clamp(0.75rem, 1.6vw, 0.95rem)";

        const fontWeight = isName ? 800 : isTitle ? 600 : 400;

        const color = isName
          ? "#FFFFFF"
          : isTitle
          ? "var(--color-accent)"
          : "var(--color-text-muted)";

        const letterSpacing = isName ? "0.04em" : isTitle ? "0.12em" : "0.08em";
        const lineHeight = isName ? 1.15 : 1.6;
        const marginBottom = isName ? "14px" : isTitle ? "8px" : "0";

        const textShadow = isName
          ? "0 0 30px rgba(57,255,20,0.4), 0 0 60px rgba(57,255,20,0.15), 0 2px 4px rgba(0,0,0,0.5)"
          : isTitle
          ? "0 0 12px rgba(57,255,20,0.3)"
          : "none";

        return (
          <div
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize,
              fontWeight,
              color,
              letterSpacing,
              lineHeight,
              textShadow,
              display: "flex",
              alignItems: "center",
              gap: isName ? "12px" : "8px",
              marginBottom,
              minHeight: "1.2em",
            }}
          >
            {/* Terminal prompt prefix */}
            <span
              style={{
                color: isName ? "var(--color-accent)" : isTitle ? "rgba(57,255,20,0.5)" : "rgba(57,255,20,0.3)",
                fontSize: isName ? "clamp(0.9rem, 2.2vw, 1.4rem)" : "0.8em",
                flexShrink: 0,
                userSelect: "none",
                opacity: displayed[i].length > 0 || i === 0 ? 1 : 0.2,
                transition: "opacity 0.4s ease",
                textShadow: isName ? "0 0 10px rgba(57,255,20,0.8)" : "none",
                fontWeight: 700,
              }}
            >
              {isName ? "~$" : ">"}
            </span>

            {/* Typed text */}
            <span style={isName ? {
              background: "linear-gradient(180deg, #FFFFFF 0%, #C8E6C9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(57,255,20,0.3))",
            } : {}}>
              {displayed[i]}
            </span>

            {/* Block cursor */}
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: isName ? "4px" : "2.5px",
                height: "0.85em",
                backgroundColor: "var(--color-accent)",
                marginLeft: "2px",
                opacity: showCursor ? 1 : 0,
                verticalAlign: "middle",
                boxShadow: "0 0 10px var(--color-accent), 0 0 20px rgba(57,255,20,0.6), 0 0 40px rgba(57,255,20,0.2)",
                transition: "opacity 0.06s",
                flexShrink: 0,
                borderRadius: "1px",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
