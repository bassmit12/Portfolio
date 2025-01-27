import "./globals.css";
import { Inter } from "next/font/google";
import FloatingNavbar from "./components/FloatingNavbar";
import TracingBeam from "./components/TracingBeam";

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
        className={`${inter.className} bg-[#0d1117] text-[#c9d1d9] md:pl-16 pl-0`}
      >
        <FloatingNavbar />
        <TracingBeam />
        {children}
      </body>
    </html>
  );
}
