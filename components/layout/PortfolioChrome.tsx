"use client";

import { usePathname } from "next/navigation";
import { useEffect }   from "react";
import ScanlineOverlay from "./ScanlineOverlay";
import CustomCursor    from "./CustomCursor";
import TopNavbar       from "./TopNavbar";
import Sidebar         from "./Sidebar";

/** Renders portfolio chrome only on non-admin routes.
 *  Also toggles `admin-page` class on <body> so globals.css
 *  can restore cursor: auto on admin pages.
 */
export default function PortfolioChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin  = pathname.startsWith("/admin");

  // Add / remove .admin-page on <body> based on route
  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add("admin-page");
    } else {
      document.body.classList.remove("admin-page");
    }
    return () => {
      document.body.classList.remove("admin-page");
    };
  }, [isAdmin]);

  if (isAdmin) {
    // Wrap in a div that forces cursor: auto so nothing inherits cursor:none
    return (
      <div style={{ cursor: "auto", minHeight: "100vh" }}>
        {children}
      </div>
    );
  }

  return (
    <>
      <ScanlineOverlay />
      <CustomCursor />
      <TopNavbar />
      <Sidebar />
      <main style={{ paddingTop: "56px" }}>
        {children}
      </main>
    </>
  );
}
