// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import FloatingNavbar from "./components/FloatingNavbar";
import TracingBeam from "./components/TracingBeam";
import StarBackground from "./components/StarBackground";

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
      <body
        className={`${inter.className} text-[#c9d1d9] md:pl-16 pl-0 relative`}
      >
        <StarBackground count={350} />
        <div className="relative z-[1]">
          <FloatingNavbar />
          <TracingBeam />
          {children}
        </div>
      </body>
    </html>
  );
}
