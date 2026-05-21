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
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "6px",
      marginBottom: "28px",
      overflow: "hidden",
    }}>
      <div style={{
        background: "var(--color-surface-2)",
        borderBottom: "1px solid var(--color-border)",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "var(--color-accent)", fontSize: "1rem" }}>{icon}</span>
          <div>
            <div style={{ fontSize: "0.72rem", color: "var(--color-text)", letterSpacing: "0.14em", fontWeight: 600 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: "0.58rem", color: "var(--color-text-dim)", letterSpacing: "0.08em", marginTop: "1px" }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
        {actions && <div>{actions}</div>}
      </div>
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
        color: saving ? "var(--color-text-dim)" : "var(--color-accent)",
        background: "transparent",
        border: `1px solid ${saving ? "var(--color-border)" : "var(--color-accent)"}`,
        padding: "8px 20px",
        cursor: saving ? "not-allowed" : "pointer",
        transition: "all 0.18s",
        borderRadius: "4px",
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
        color: "var(--color-accent-2)",
        background: "transparent",
        border: "1px solid var(--color-accent-2)",
        padding: "6px 14px",
        cursor: "pointer",
        transition: "all 0.18s",
        borderRadius: "4px",
      }}
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
        color: "var(--color-text-dim)",
        background: "transparent",
        border: "1px solid var(--color-border)",
        padding: "4px 10px",
        cursor: "pointer",
        transition: "all 0.18s",
        borderRadius: "3px",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5F57"; e.currentTarget.style.color = "#FF5F57"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-dim)"; }}
    >
      ✕ DELETE
    </button>
  );
}
