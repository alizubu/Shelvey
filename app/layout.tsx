import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider }   from "@/components/layout/ThemeProvider";
import LenisProvider        from "@/components/layout/LenisProvider";
import PortfolioChrome      from "@/components/layout/PortfolioChrome";

export const metadata: Metadata = {
  title: "Shelvey Elmo Dias — Digital Marketing Specialist",
  description:
    "Portfolio of Shelvey Elmo Dias — SEO & SEM Expert, Analytics & CRO Strategist. " +
    "Driving measurable growth through data-driven strategy and performance marketing.",
  keywords: [
    "digital marketing", "SEO", "SEM", "CRO",
    "performance marketing", "analytics", "Bangladesh", "Chittagong",
  ],
  authors: [{ name: "Shelvey Elmo Dias" }],
  openGraph: {
    title:       "Shelvey Elmo Dias — Digital Marketing Specialist",
    description: "Driving measurable growth through data-driven strategy, performance marketing, and conversion optimization.",
    type:        "website",
    locale:      "en_US",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>
            <PortfolioChrome>
              {children}
            </PortfolioChrome>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
