"use client";

interface AdminSectionProps {
  title: string;
  subtitle?: string;
  icon?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function AdminSection({ title, subtitle, icon = "◈", children, actions }: AdminSectionProps) {
  return (
    <div style={{
      background: "#111111",
      border: "1px solid #1A1A1A",
      borderRadius: "0",
      marginBottom: "28px",
      overflow: "hidden",
    }}>
      {/* Section header bar */}
      <div style={{
        background: "#161616",
        borderBottom: "1px solid #1A1A1A",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#39FF14", fontSize: "1rem" }}>{icon}</span>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#E8E8E8", letterSpacing: "0.14em", fontWeight: 600 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: "0.58rem", color: "#555", letterSpacing: "0.08em", marginTop: "1px" }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
        {actions && <div>{actions}</div>}
      </div>

      {/* Body */}
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

interface SaveButtonProps {
  saving: boolean;
  onClick: () => void;
  label?: string;
}
export function SaveButton({ saving, onClick, label = "SAVE CHANGES" }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.72rem",
        letterSpacing: "0.12em",
        color: saving ? "#444" : "#39FF14",
        background: "transparent",
        border: `1px solid ${saving ? "#2A2A2A" : "#39FF14"}`,
        padding: "8px 20px",
        cursor: saving ? "not-allowed" : "pointer",
        transition: "all 0.18s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!saving) { e.currentTarget.style.background = "#39FF14"; e.currentTarget.style.color = "#0A0A0A"; }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = saving ? "#444" : "#39FF14";
      }}
    >
      {saving ? "SAVING ..." : `${label} ▶`}
    </button>
  );
}

export function AddButton({ onClick, label = "ADD NEW" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.68rem",
        letterSpacing: "0.1em",
        color: "#F5A623",
        background: "transparent",
        border: "1px solid #F5A623",
        padding: "6px 14px",
        cursor: "pointer",
        transition: "all 0.18s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#F5A623"; e.currentTarget.style.color = "#0A0A0A"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F5A623"; }}
    >
      + {label}
    </button>
  );
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.1em",
        color: "#666",
        background: "transparent",
        border: "1px solid #2A2A2A",
        padding: "4px 10px",
        cursor: "pointer",
        transition: "all 0.18s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5F57"; e.currentTarget.style.color = "#FF5F57"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2A2A2A"; e.currentTarget.style.color = "#666"; }}
    >
      ✕ DELETE
    </button>
  );
}
