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
        background: "#0A0A0A",
        color: "#E8E8E8",
        fontFamily: "'IBM Plex Mono', monospace",
        /* Prevent portfolio body styles leaking in */
        cursor: "auto",
        isolation: "isolate",
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
        theme="dark"
        toastOptions={{
          style: {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.78rem",
            background: "#111111",
            border: "1px solid #2A2A2A",
            color: "#E8E8E8",
            cursor: "auto",
          },
        }}
      />
    </div>
  );
}
