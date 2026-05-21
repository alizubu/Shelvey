"use client";

import { useEffect, useRef, useState } from "react";
import TerminalWindow from "@/components/ui/TerminalWindow";

interface SocialData {
  facebook: string; instagram: string; github: string;
  linkedin?: string; twitter?: string;
}
const FALLBACK_SOCIAL: SocialData = {
  facebook:  "https://facebook.com/shelveyelmodias",
  instagram: "https://instagram.com/shelveyelmodias",
  github:    "https://github.com/shelveyelmodias",
};

export default function Contact() {
  const [social, setSocial] = useState<SocialData>(FALLBACK_SOCIAL);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    fetch("/api/public/social")
      .then(r => r.json())
      .then(d => { if (d) setSocial({ ...FALLBACK_SOCIAL, ...d }); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const run = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(formRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } });
      gsap.from(infoRef.current, { y: 40, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } });
    };
    run();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const LBL = ({ children }: { children: React.ReactNode }) => (
    <label style={{
      fontFamily: "var(--font-mono)", fontSize: "0.6rem",
      color: "var(--color-accent)", letterSpacing: "0.18em",
      display: "block", marginBottom: "6px", fontWeight: 500,
      textTransform: "uppercase",
    }}>
      {children}
    </label>
  );

  const SOCIAL_LINKS = [
    { icon: "f",  label: "Facebook",  url: social.facebook,  handle: social.facebook?.split("/").pop()  ?? "" },
    { icon: "◈",  label: "Instagram", url: social.instagram, handle: social.instagram?.split("/").pop() ?? "" },
    { icon: "⬡",  label: "GitHub",    url: social.github,    handle: social.github?.split("/").pop()    ?? "" },
    ...(social.linkedin ? [{ icon: "in", label: "LinkedIn", url: social.linkedin, handle: social.linkedin?.split("/").pop() ?? "" }] : []),
    ...(social.twitter  ? [{ icon: "𝕏",  label: "Twitter",  url: social.twitter,  handle: social.twitter?.split("/").pop()  ?? "" }] : []),
  ].filter(s => s.url);

  return (
    <section id="contact" ref={sectionRef} className="section-pad" style={{ position: "relative", overflow: "hidden" }}>

      {/* Background treatment */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 20%, var(--color-surface) 80%, var(--color-bg) 100%)",
      }} />

      {/* Subtle grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.02,
        backgroundImage: "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* Ambient glow */}
      <div aria-hidden="true" className="contact-ambient-glow" style={{
        position: "absolute", top: "20%", left: "50%", width: "600px", height: "400px",
        transform: "translateX(-50%)", pointerEvents: "none",
        background: "radial-gradient(ellipse at center, var(--color-accent-bg) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* ── Section header ── */}
        <div style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              color: "var(--color-accent)", letterSpacing: "0.3em",
              background: "var(--color-accent-bg)", padding: "3px 10px",
              border: "1px solid var(--color-border)",
            }}>04</span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right, var(--color-accent), transparent)" }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-mono)", fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 700,
            color: "var(--color-text)",
          }}>
            CONTACT<span style={{ color: "var(--color-accent)", textShadow: "0 0 20px rgba(57,255,20,0.4)" }}>.init</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-text-dim)",
            letterSpacing: "0.08em", marginTop: "10px",
          }}>
            {"// let's build something together"}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "clamp(28px,4vw,44px)" }}>
          {/* ── FORM ── */}
          <div ref={formRef}>
            {status === "sent" ? (
              <TerminalWindow title="message_sent@log:~">
                <div style={{ textAlign: "center", padding: "clamp(28px,4vw,48px) 20px" }}>
                  {/* Success checkmark */}
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    border: "2px solid var(--color-accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 18px",
                    boxShadow: "0 0 20px rgba(57,255,20,0.3), inset 0 0 12px rgba(57,255,20,0.1)",
                  }}>
                    <span style={{ color: "var(--color-accent)", fontSize: "1.5rem", fontWeight: 700 }}>✓</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-accent)", marginBottom: "8px", letterSpacing: "0.1em", fontWeight: 600 }}>
                    MESSAGE TRANSMITTED
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-text-muted)", marginBottom: "24px", lineHeight: 1.6 }}>
                    I&apos;ll get back to you within 24 hours.
                  </div>
                  <button className="retro-btn" style={{ fontSize: "0.68rem", padding: "8px 20px" }} onClick={() => setStatus("idle")}>
                    <span>SEND ANOTHER ↩</span>
                  </button>
                </div>
              </TerminalWindow>
            ) : (
              <TerminalWindow title="contact@form:~">
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <LBL>&#47;&#47; NAME</LBL>
                    <input className="retro-input" type="text" placeholder="Your name" required value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <LBL>&#47;&#47; EMAIL</LBL>
                    <input className="retro-input" type="email" placeholder="your@email.com" required value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <LBL>&#47;&#47; MESSAGE</LBL>
                    <textarea className="retro-input" placeholder="Tell me about your project..." required rows={5}
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ resize: "none", lineHeight: 1.7 }} />
                  </div>
                  {status === "error" && (
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#FF5F57",
                      borderLeft: "2px solid #FF5F57",
                      background: "rgba(255,95,87,0.05)",
                      padding: "8px 12px 8px 14px",
                      borderRadius: "0 4px 4px 0",
                    }}>
                      ✕ Transmission failed. Please retry.
                    </div>
                  )}
                  <button type="submit" className="retro-btn" style={{ alignSelf: "flex-start" }} disabled={status === "sending"}>
                    <span>{status === "sending" ? "TRANSMITTING ..." : "SEND MESSAGE ▶"}</span>
                  </button>
                </form>
              </TerminalWindow>
            )}
          </div>

          {/* ── INFO PANEL ── */}
          <div ref={infoRef} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {/* Contact info card */}
            <div style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "clamp(20px, 3vw, 28px)",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}>
              {/* Status indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
                <span style={{
                  display: "inline-block", width: "8px", height: "8px", borderRadius: "50%",
                  background: "var(--color-accent)",
                  boxShadow: "0 0 8px var(--color-accent), 0 0 16px rgba(57,255,20,0.3)",
                  animation: "pulse_glow 2s ease-in-out infinite",
                }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-accent)", letterSpacing: "0.12em", fontWeight: 600 }}>
                  AVAILABLE FOR WORK
                </span>
              </div>

              {/* Info fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {[
                  { key: "email",         val: "shelveyelmodias@gmail.com" },
                  { key: "location",      val: "Chittagong, Bangladesh"    },
                  { key: "response_time", val: "< 24 hours"                },
                ].map(({ key, val }) => (
                  <div key={key}>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.56rem",
                      color: "var(--color-text-dim)", letterSpacing: "0.18em",
                      marginBottom: "4px", textTransform: "uppercase",
                    }}>{key}:</div>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                      color: "var(--color-text-muted)", fontWeight: 500,
                    }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-text-dim)", letterSpacing: "0.2em" }}>{"// SOCIAL_LINKS"}</span>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--color-border), transparent)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {SOCIAL_LINKS.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "12px 16px",
                      border: "1px solid var(--color-border)",
                      borderRadius: "6px",
                      background: "var(--color-surface)",
                      textDecoration: "none",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      fontFamily: "var(--font-mono)",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--color-accent)";
                      el.style.transform = "translateX(4px)";
                      el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--color-border)";
                      el.style.transform = "translateX(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <span style={{
                      width: "32px", height: "32px",
                      border: "1px solid var(--color-border)",
                      borderRadius: "4px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.85rem", color: "var(--color-accent)", flexShrink: 0,
                      background: "var(--color-accent-bg)",
                    }}>{s.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.6rem", color: "var(--color-text-dim)", letterSpacing: "0.1em", marginBottom: "2px" }}>{s.label}</div>
                      <div style={{ fontSize: "0.76rem", color: "var(--color-text-muted)", fontWeight: 500 }}>@{s.handle}</div>
                    </div>
                    <span style={{ color: "var(--color-accent)", fontSize: "0.8rem", opacity: 0.5, transition: "opacity 0.3s" }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{
          maxWidth: "100%", marginTop: "clamp(48px,6vw,72px)",
          paddingTop: "24px",
          borderTop: "1px solid var(--color-border)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-text-dim)", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} SHELVEY ELMO DIAS
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-text-dim)", display: "flex", alignItems: "center", gap: "6px" }}>
            BUILT WITH ❤️<span style={{ color: "var(--color-accent)", textShadow: "0 0 6px rgba(57,255,20,0.4)" }}>@alizubu</span> ⬡ VERCEL
          </span>
        </div>
      </div>
    </section>
  );
}
