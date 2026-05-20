"use client";

import { useState, useEffect }          from "react";
import { signIn }                        from "next-auth/react";
import { useRouter, useSearchParams }    from "next/navigation";

export default function LoginForm() {
  const router      = useRouter();
  const params      = useSearchParams();
  const [userId,   setUserId]   = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [lines,    setLines]    = useState<string[]>([]);

  useEffect(() => {
    const msgs = [
      "SYSTEM BOOT ...",
      "LOADING KERNEL MODULE ... OK",
      "MOUNTING FILESYSTEM ... OK",
      "STARTING PORTFOLIO_ADMIN_DAEMON ...",
      "AUTH_SERVICE: ACTIVE",
      "SESSION_MANAGER: ONLINE",
      "─────────────────────────────────",
      "ADMIN TERMINAL v1.0 — READY",
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < msgs.length) setLines((l) => [...l, msgs[i++]]);
      else clearInterval(iv);
    }, 160);
    return () => clearInterval(iv);
  }, []);

  const callbackUrl = params.get("callbackUrl") ?? "/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { userId, password, redirect: false, callbackUrl });
    setLoading(false);
    if (res?.ok) {
      router.push(callbackUrl);
    } else {
      setError(
        res?.error === "TOO_MANY_ATTEMPTS"
          ? "⚠ Too many attempts. Locked for 15 min."
          : "✕ Invalid credentials. Access denied."
      );
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0A",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'IBM Plex Mono', monospace", padding: "24px", position: "relative",
    }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />
      <div style={{ width: "100%", maxWidth: "480px", position: "relative", zIndex: 1 }}>
        <div style={{ background: "#111111", border: "1px solid #2A2A2A", borderRadius: "8px", overflow: "hidden" }}>
          {/* Title bar */}
          <div style={{ background: "#1A1A1A", padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #2A2A2A" }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
            <span style={{ marginLeft: 8, fontSize: "0.7rem", color: "#888", letterSpacing: "0.08em" }}>admin@portfolio — bash</span>
          </div>

          {/* Boot log */}
          <div style={{ padding: "20px 20px 0" }}>
            {lines.map((l, i) => (
              <div key={i} style={{ fontSize: "0.72rem", color: i === lines.length - 1 ? "#39FF14" : "#444444", lineHeight: 1.9, letterSpacing: "0.04em" }}>
                {l}
              </div>
            ))}
          </div>

          {lines.length >= 8 && (
            <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.14em", marginBottom: "6px" }}>LOGIN:~$</div>
                <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #2A2A2A", paddingBottom: "8px" }}>
                  <span style={{ color: "#39FF14", marginRight: "8px", fontSize: "0.82rem" }}>›</span>
                  <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="user_id"
                    autoComplete="username" required style={{ background: "transparent", border: "none", outline: "none", color: "#E8E8E8", fontFamily: "inherit", fontSize: "0.88rem", width: "100%", letterSpacing: "0.06em" }} />
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.14em", marginBottom: "6px" }}>PASSWORD:~$</div>
                <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #2A2A2A", paddingBottom: "8px" }}>
                  <span style={{ color: "#39FF14", marginRight: "8px", fontSize: "0.82rem" }}>›</span>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    autoComplete="current-password" required style={{ background: "transparent", border: "none", outline: "none", color: "#E8E8E8", fontFamily: "inherit", fontSize: "0.88rem", width: "100%", letterSpacing: "0.08em" }} />
                </div>
              </div>

              {error && (
                <div style={{ fontSize: "0.72rem", color: "#FF5F57", marginBottom: "16px", letterSpacing: "0.04em", borderLeft: "2px solid #FF5F57", paddingLeft: "10px" }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} style={{ width: "100%", background: "transparent", border: "1px solid #39FF14", color: loading ? "#444" : "#39FF14", fontFamily: "inherit", fontSize: "0.78rem", letterSpacing: "0.14em", padding: "10px", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "#39FF14"; e.currentTarget.style.color = "#0A0A0A"; } }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = loading ? "#444" : "#39FF14"; }}>
                {loading ? "AUTHENTICATING ..." : "ACCESS SYSTEM ▶"}
              </button>

              <div style={{ marginTop: "16px", fontSize: "0.6rem", color: "#444", textAlign: "center", letterSpacing: "0.08em" }}>
                MAX 5 ATTEMPTS — LOCKOUT 15 MIN
              </div>
            </form>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "16px", fontSize: "0.6rem", color: "#333", letterSpacing: "0.1em" }}>
          ← <a href="/" style={{ color: "#555", textDecoration: "none" }}>RETURN TO PORTFOLIO</a>
        </div>
      </div>
    </div>
  );
}
