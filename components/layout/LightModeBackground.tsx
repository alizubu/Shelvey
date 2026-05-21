"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";

/**
 * Light-mode-only background with:
 * 1. Warm paper grain texture (canvas rendered)
 * 2. Animated graph-paper grid lines (GSAP + SVG)
 * 3. Warm amber connecting-dots particle network
 * 
 * Completely hidden in dark mode.
 */

interface WarmParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number; // 25-45 range for warm amber/gold
}

export default function LightModeBackground() {
  const { theme } = useTheme();
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animIdRef = useRef<number>(0);

  // ═══ Paper Grain Texture ═══
  useEffect(() => {
    if (theme !== "light") return;
    const canvas = grainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderGrain = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Base warm paper color
      ctx.fillStyle = "rgba(250, 248, 244, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Generate grain noise
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 20 - 10;
        // Warm-tinted grain (slightly amber)
        data[i] = 180 + noise;     // R
        data[i + 1] = 165 + noise; // G
        data[i + 2] = 140 + noise; // B
        data[i + 3] = 8;           // Very low alpha for subtlety
      }

      ctx.putImageData(imageData, 0, 0);
    };

    renderGrain();
    window.addEventListener("resize", renderGrain);
    return () => window.removeEventListener("resize", renderGrain);
  }, [theme]);

  // ═══ Animated Graph Paper Grid (GSAP + SVG) ═══
  useEffect(() => {
    if (theme !== "light") return;
    const svg = svgRef.current;
    if (!svg) return;

    let gsapInstance: typeof import("gsap").default | null = null;

    const animateGrid = async () => {
      const gsap = (await import("gsap")).default;
      gsapInstance = gsap;

      const w = window.innerWidth;
      const h = window.innerHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

      // Clear existing lines
      svg.innerHTML = "";

      const spacing = 60;
      const lines: SVGLineElement[] = [];

      // Horizontal lines
      for (let y = spacing; y < h; y += spacing) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", String(y));
        line.setAttribute("x2", String(w));
        line.setAttribute("y2", String(y));
        line.setAttribute("stroke", "rgba(180, 140, 80, 0.08)");
        line.setAttribute("stroke-width", "0.5");
        line.setAttribute("stroke-dasharray", `${w}`);
        line.setAttribute("stroke-dashoffset", `${w}`);
        svg.appendChild(line);
        lines.push(line);
      }

      // Vertical lines
      for (let x = spacing; x < w; x += spacing) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(x));
        line.setAttribute("y1", "0");
        line.setAttribute("x2", String(x));
        line.setAttribute("y2", String(h));
        line.setAttribute("stroke", "rgba(180, 140, 80, 0.06)");
        line.setAttribute("stroke-width", "0.5");
        line.setAttribute("stroke-dasharray", `${h}`);
        line.setAttribute("stroke-dashoffset", `${h}`);
        svg.appendChild(line);
        lines.push(line);
      }

      // Animate lines drawing in
      gsap.to(lines, {
        strokeDashoffset: 0,
        duration: 2.5,
        stagger: 0.02,
        ease: "power2.out",
      });

      // Subtle pulse animation on grid lines
      gsap.to(lines, {
        opacity: 0.4,
        duration: 3,
        stagger: { each: 0.05, repeat: -1, yoyo: true },
        ease: "sine.inOut",
        delay: 3,
      });
    };

    animateGrid();

    const handleResize = () => animateGrid();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (gsapInstance && svg) {
        gsapInstance.killTweensOf(svg.querySelectorAll("line"));
      }
    };
  }, [theme]);

  // ═══ Warm Amber Particle Network ═══
  useEffect(() => {
    if (theme !== "light") {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      return;
    }

    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 90;
    const MAX_DIST = 140;
    const particles: WarmParticle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.4 + 0.2,
          hue: 25 + Math.random() * 20, // warm amber range
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Gentle mouse attraction (not repel — feels warmer)
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          p.x += (dx / dist) * 0.15;
          p.y += (dy / dist) * 0.15;
        }
      }

      // Draw connections — warm amber/gold
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(180, 130, 50, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles — warm dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // HSL for warm amber tones
        ctx.fillStyle = `hsla(${p.hue}, 70%, 45%, ${p.opacity})`;
        ctx.fill();
      }

      animIdRef.current = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => { resize(); init(); };

    resize();
    init();
    draw();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [theme]);

  // Don't render anything in dark mode
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
      {/* Layer 1: Paper grain texture */}
      <canvas
        ref={grainCanvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 1,
        }}
      />

      {/* Layer 2: Animated graph paper grid */}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 1,
        }}
      />

      {/* Layer 3: Warm amber particle network */}
      <canvas
        ref={particleCanvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
