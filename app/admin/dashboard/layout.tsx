import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader  from "@/components/admin/AdminHeader";
import { Toaster }  from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--color-bg)",
        color: "var(--color-text)",
        fontFamily: "'IBM Plex Mono', monospace",
        cursor: "auto",
        isolation: "isolate",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/* ── Left sidebar (hidden on mobile, visible md+) ── */}
      <AdminSidebar />

      {/* ── Main content column ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminHeader />
        <main
          style={{
            flex: 1,
            padding: "clamp(16px, 3vw, 32px)",
            overflowY: "auto",
            overflowX: "hidden",
            cursor: "auto",
          }}
        >
          {children}
        </main>
      </div>

      {/* ── Toast notifications ── */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.78rem",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            cursor: "auto",
          },
        }}
      />
    </div>
  );
}
