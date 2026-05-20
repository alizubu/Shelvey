import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  /* We drive theming via CSS custom properties on data-theme attr,
     not via Tailwind's dark: variant, so darkMode is set to 'class'
     purely as a fallback. */
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        bg:           "var(--color-bg)",
        surface:      "var(--color-surface)",
        "surface-2":  "var(--color-surface-2)",
        border:       "var(--color-border)",
        accent:       "var(--color-accent)",
        amber:        "var(--color-accent-2)",
        "text-main":  "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "text-dim":   "var(--color-text-dim)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow:         "0 0 8px var(--color-accent), 0 0 20px rgba(57,255,20,0.3)",
        "glow-sm":    "0 0 4px var(--color-accent)",
        retro:        "4px 4px 0px var(--color-accent)",
        "retro-amber":"4px 4px 0px var(--color-accent-2)",
      },
      animation: {
        blink:      "blink 1s step-end infinite",
        pulse_glow: "pulse_glow 2s ease-in-out infinite",
        float:      "float 3s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        pulse_glow: {
          "0%, 100%": { boxShadow: "0 0 4px var(--color-accent)" },
          "50%":       { boxShadow: "0 0 12px var(--color-accent), 0 0 28px rgba(57,255,20,0.35)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-7px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
