// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import FloatingNavbar from "./components/FloatingNavbar";
import TracingBeam from "./components/TracingBeam";
import StarBackground from "./components/StarBackground";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Junior Software Engineer Portfolio",
  description:
    "Showcase of my projects and skills as a junior software engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.className} text-[#c9d1d9] md:pl-16 pl-0 relative`}
      >
        <StarBackground count={350} />
        <Analytics />
        <div className="relative z-[1]">
          <FloatingNavbar />
          <TracingBeam />
          {children}
        </div>
      </body>
    </html>
  );
}
