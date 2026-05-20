import type { Metadata } from "next";
import SessionWrapper from "@/components/admin/SessionWrapper";

export const metadata: Metadata = {
  title: "Admin Panel — Shelvey Portfolio",
  robots: "noindex, nofollow",
};

/**
 * Admin segment layout.
 * – Shares root <html>/<body> from app/layout.tsx.
 * – Wraps children in SessionWrapper for next-auth/react hooks.
 * – The div below pins cursor:auto so the portfolio's cursor:none
 *   (set on <body>) does NOT affect admin pages.
 */
export default function AdminSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      {/* Full-height wrapper that resets every portfolio-specific style */}
      <div
        id="admin-root"
        style={{
          cursor: "auto",
          fontFamily: "'IBM Plex Mono', monospace",
          background: "#0A0A0A",
          color: "#E8E8E8",
          minHeight: "100vh",
          /* Remove any noise/overlay that bleeds from body::before */
          position: "relative",
          isolation: "isolate",         /* new stacking context */
        }}
      >
        {children}
      </div>
    </SessionWrapper>
  );
}
