import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function revealFromLeft(selector: string, trigger: string) {
  gsap.from(selector, {
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: "top 70%",
    },
  });
}

export function revealFromRight(selector: string, trigger: string) {
  gsap.from(selector, {
    x: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: "top 70%",
    },
  });
}

export function revealFromBottom(
  selector: string,
  trigger: string,
  stagger = 0.15
) {
  gsap.from(selector, {
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: "top 65%",
    },
  });
}

export function drawTimelineLine(selector: string, trigger: string) {
  gsap.to(selector, {
    scaleY: 1,
    transformOrigin: "top center",
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
  });
}

export function heroLoadTimeline(
  borderEl: Element | null,
  textEl: Element | null,
  taglineEl: Element | null,
  ctaEl: Element | null,
  scrollEl: Element | null
) {
  const tl = gsap.timeline();

  if (borderEl) {
    tl.from(borderEl, { opacity: 0, scale: 0.96, duration: 0.6, ease: "power2.out" }, 0.3);
  }
  if (textEl) {
    tl.from(textEl, { opacity: 0, duration: 0.01 }, 0.8);
  }
  if (taglineEl) {
    gsap.set(taglineEl, { opacity: 0, y: 20 });
    tl.to(taglineEl, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 1.8);
  }
  if (ctaEl) {
    gsap.set(ctaEl, { opacity: 0, y: 20 });
    tl.to(ctaEl, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 2.2);
  }
  if (scrollEl) {
    gsap.set(scrollEl, { opacity: 0 });
    tl.to(scrollEl, { opacity: 1, duration: 0.4 }, 2.5);
  }

  return tl;
}
