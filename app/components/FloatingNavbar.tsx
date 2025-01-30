"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#top" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function FloatingNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Navbar */}
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 hidden md:block"
      >
        <div className="mx-auto max-w-7xl">
          <div className="backdrop-blur-md bg-[#0d1117]/75 border border-[#30363d] rounded-full px-4 py-3 mt-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-white ml-3 flex items-center"
            >
              <span className="text-[#58a6ff]">Portfolio</span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="ml-2"
              >
                Bas Smit
              </motion.span>
            </Link>

            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleClick(item.href)}
                  className={`text-sm transition-colors rounded-md px-2 py-1 ${
                    activeSection === item.href.substring(1)
                      ? "text-[#58a6ff] bg-[#58a6ff]/10"
                      : "text-[#c9d1d9] hover:text-[#58a6ff] hover:bg-[#58a6ff]/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <div className="h-5 w-[1px] bg-[#30363d]" />
              <motion.a
                href="https://github.com/bassmit12"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors rounded-full p-1 hover:bg-[#58a6ff]/10"
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://x.com/SmitBas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors rounded-full p-1 hover:bg-[#58a6ff]/10"
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Mobile Hamburger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 text-[#c9d1d9] hover:text-[#58a6ff] transition-colors rounded-full p-2 backdrop-blur-md bg-[#0d1117]/75 border border-[#30363d]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Menu */}
      <motion.nav
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-[#161b22] border-l border-[#30363d] p-6 z-40 rounded-l-2xl shadow-xl md:hidden"
      >
        <div className="flex flex-col gap-6 h-full pt-20">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              onClick={() => handleClick(item.href)}
              className={`text-left text-lg transition-colors rounded-md px-2 py-1 ${
                activeSection === item.href.substring(1)
                  ? "text-[#58a6ff] bg-[#58a6ff]/10"
                  : "text-[#c9d1d9] hover:text-[#58a6ff] hover:bg-[#58a6ff]/10"
              }`}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.button>
          ))}
          <div className="h-[1px] w-full bg-[#30363d]" />
          <div className="flex gap-4">
            <motion.a
              href="https://github.com/bassmit12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors rounded-full p-2 hover:bg-[#58a6ff]/10"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors rounded-full p-2 hover:bg-[#58a6ff]/10"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter className="w-6 h-6" />
            </motion.a>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
