import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nitesh Kumar | Senior Frontend Engineer",
  description:
    "Senior-level frontend engineering powered by distributed systems thinking. Performance-first architecture, scalable UI systems, and production-grade delivery.",
  openGraph: {
    title: "Nitesh Kumar | Senior Frontend Engineer",
    description:
      "Building frontend systems that scale. React, Next.js, TypeScript, GSAP, Framer Motion, and architecture-first engineering.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
