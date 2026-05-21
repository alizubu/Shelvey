import type { Metadata } from "next";
import SessionWrapper from "@/components/admin/SessionWrapper";

export const metadata: Metadata = {
  title: "Admin Panel — Shelvey Portfolio",
  robots: "noindex, nofollow",
};

export default function AdminSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <div
        id="admin-root"
        style={{
          cursor: "auto",
          fontFamily: "'IBM Plex Mono', monospace",
          background: "var(--color-bg)",
          color: "var(--color-text)",
          minHeight: "100vh",
          position: "relative",
          isolation: "isolate",
          transition: "background 0.3s ease, color 0.3s ease",
        }}
      >
        {children}
      </div>
    </SessionWrapper>
  );
}
