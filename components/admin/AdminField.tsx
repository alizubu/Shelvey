"use client";

interface AdminFieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function AdminField({ label, hint, children }: AdminFieldProps) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <div style={{
        fontSize: "0.62rem",
        color: "var(--color-accent)",
        letterSpacing: "0.16em",
        marginBottom: "6px",
      }}>
        {label}
        {hint && (
          <span style={{ color: "var(--color-text-dim)", marginLeft: "8px", fontSize: "0.58rem", letterSpacing: "0.06em" }}>
            ({hint})
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export function AdminInput(props: InputProps) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        background: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text)",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.84rem",
        padding: "9px 12px",
        outline: "none",
        transition: "border-color 0.2s",
        borderRadius: "4px",
        ...props.style,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; props.onFocus?.(e); }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--color-border)"; props.onBlur?.(e);  }}
    />
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export function AdminTextarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        background: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text)",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.84rem",
        padding: "9px 12px",
        outline: "none",
        resize: "vertical",
        minHeight: "100px",
        transition: "border-color 0.2s",
        borderRadius: "4px",
        ...props.style,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; props.onFocus?.(e); }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--color-border)"; props.onBlur?.(e);  }}
    />
  );
}
