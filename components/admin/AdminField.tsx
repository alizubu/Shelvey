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
        color: "#39FF14",
        letterSpacing: "0.16em",
        marginBottom: "6px",
      }}>
        {label}
        {hint && (
          <span style={{ color: "#555", marginLeft: "8px", fontSize: "0.58rem", letterSpacing: "0.06em" }}>
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
        background: "#0A0A0A",
        border: "1px solid #2A2A2A",
        color: "#E8E8E8",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.84rem",
        padding: "9px 12px",
        outline: "none",
        transition: "border-color 0.2s",
        borderRadius: "0",
        ...props.style,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "#39FF14"; props.onFocus?.(e); }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = "#2A2A2A"; props.onBlur?.(e);  }}
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
        background: "#0A0A0A",
        border: "1px solid #2A2A2A",
        color: "#E8E8E8",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.84rem",
        padding: "9px 12px",
        outline: "none",
        resize: "vertical",
        minHeight: "100px",
        transition: "border-color 0.2s",
        borderRadius: "0",
        ...props.style,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "#39FF14"; props.onFocus?.(e); }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = "#2A2A2A"; props.onBlur?.(e);  }}
    />
  );
}
