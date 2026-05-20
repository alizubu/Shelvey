"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Msg {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function MessagesPage() {
  const [msgs,    setMsgs]    = useState<Msg[]>([]);
  const [loaded,  setLoaded]  = useState(false);
  const [active,  setActive]  = useState<Msg | null>(null);
  const [clearing,setClearing]= useState(false);

  const load = () =>
    fetch("/api/admin/messages")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setMsgs(d); })
      .catch(() => {})
      .finally(() => setLoaded(true));

  useEffect(() => { load(); }, []);

  const clearAll = async () => {
    if (!confirm("Delete ALL messages? This cannot be undone.")) return;
    setClearing(true);
    try {
      const res = await fetch("/api/admin/messages", { method: "DELETE" });
      if (res.ok) { toast.success("All messages deleted"); setMsgs([]); setActive(null); }
      else toast.error("Delete failed");
    } catch { toast.error("Network error"); }
    finally { setClearing(false); }
  };

  if (!loaded) return (
    <div style={{ color: "#555", fontFamily: "'IBM Plex Mono',monospace", padding: "40px", letterSpacing: "0.1em" }}>
      LOADING INBOX ...
    </div>
  );

  return (
    <div style={{ maxWidth: "1000px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.3em", marginBottom: "4px" }}>{"// INBOX"}</div>
          <h1 style={{ fontSize: "1.3rem", color: "#E8E8E8", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700 }}>
            MESSAGES<span style={{ color: "#39FF14" }}>.log</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.68rem", color: "#555" }}>
            {msgs.length} message{msgs.length !== 1 ? "s" : ""}
          </div>
          {msgs.length > 0 && (
            <button onClick={clearAll} disabled={clearing} style={{
              fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.68rem", letterSpacing: "0.1em",
              color: "#666", background: "transparent", border: "1px solid #2A2A2A",
              padding: "6px 14px", cursor: "pointer", transition: "all 0.18s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF5F57"; e.currentTarget.style.color = "#FF5F57"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2A2A2A"; e.currentTarget.style.color = "#666"; }}
            >
              {clearing ? "DELETING ..." : "✕ CLEAR ALL"}
            </button>
          )}
          <button onClick={load} style={{
            fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.68rem", letterSpacing: "0.1em",
            color: "#39FF14", background: "transparent", border: "1px solid #39FF14",
            padding: "6px 14px", cursor: "pointer", transition: "all 0.18s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#39FF14"; e.currentTarget.style.color = "#0A0A0A"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#39FF14"; }}
          >
            ↻ REFRESH
          </button>
        </div>
      </div>

      {msgs.length === 0 ? (
        <div style={{
          background: "#111111", border: "1px solid #1A1A1A",
          padding: "60px 20px", textAlign: "center",
          fontFamily: "'IBM Plex Mono',monospace",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "12px", opacity: 0.3 }}>📭</div>
          <div style={{ fontSize: "0.78rem", color: "#444", letterSpacing: "0.12em" }}>NO MESSAGES YET</div>
          <div style={{ fontSize: "0.62rem", color: "#333", marginTop: "8px" }}>
            Messages from the contact form will appear here.
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: active ? "1fr 1fr" : "1fr", gap: "16px" }}>

          {/* ── Message list ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {msgs.map(m => (
              <div key={m._id} onClick={() => setActive(active?._id === m._id ? null : m)}
                style={{
                  background: active?._id === m._id ? "rgba(57,255,20,0.06)" : "#111111",
                  border: `1px solid ${active?._id === m._id ? "rgba(57,255,20,0.3)" : "#1A1A1A"}`,
                  padding: "16px 18px", cursor: "pointer",
                  transition: "all 0.18s",
                  borderLeft: `3px solid ${active?._id === m._id ? "#39FF14" : "#1A1A1A"}`,
                }}
                onMouseEnter={e => { if (active?._id !== m._id) (e.currentTarget as HTMLElement).style.borderColor = "#2A2A2A"; }}
                onMouseLeave={e => { if (active?._id !== m._id) (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.8rem", color: "#E8E8E8", fontWeight: 600 }}>
                      {m.name}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "#555", marginTop: "2px" }}>
                      {m.email}
                    </div>
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", color: "#444", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {timeAgo(m.createdAt)}
                  </div>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#666", marginTop: "8px", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                  {m.message}
                </div>
              </div>
            ))}
          </div>

          {/* ── Message detail ── */}
          {active && (
            <div style={{ background: "#111111", border: "1px solid #1A1A1A", padding: "24px", position: "sticky", top: "16px", height: "fit-content" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.6rem", color: "#39FF14", letterSpacing: "0.2em" }}>
                  {"// MESSAGE_DETAIL"}
                </div>
                <button onClick={() => setActive(null)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "1rem" }}>✕</button>
              </div>

              {[
                { k: "FROM",    v: active.name    },
                { k: "EMAIL",   v: active.email   },
                { k: "RECEIVED",v: new Date(active.createdAt).toLocaleString("en-GB") },
              ].map(({ k, v }) => (
                <div key={k} style={{ marginBottom: "14px" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", color: "#39FF14", letterSpacing: "0.18em", marginBottom: "4px" }}>{k}:</div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.8rem", color: "#888" }}>{v}</div>
                </div>
              ))}

              <div style={{ marginTop: "20px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.58rem", color: "#39FF14", letterSpacing: "0.18em", marginBottom: "10px" }}>MESSAGE:</div>
                <div style={{
                  fontSize: "0.84rem", color: "#E8E8E8", lineHeight: 1.85,
                  background: "#0A0A0A", border: "1px solid #1A1A1A",
                  padding: "16px", whiteSpace: "pre-wrap",
                }}>
                  {active.message}
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <a href={`mailto:${active.email}?subject=Re: Your message&body=%0A%0A----%0AOriginal message from ${active.name}:%0A${active.message}`}
                  style={{
                    display: "inline-block", fontFamily: "'IBM Plex Mono',monospace",
                    fontSize: "0.7rem", letterSpacing: "0.1em",
                    color: "#39FF14", border: "1px solid #39FF14",
                    padding: "8px 18px", textDecoration: "none",
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#39FF14"; (e.currentTarget as HTMLElement).style.color = "#0A0A0A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#39FF14"; }}
                >
                  REPLY VIA EMAIL ↗
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
