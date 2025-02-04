// Hero.tsx
"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Code,
  ChevronDown,
} from "lucide-react";
import AnimatedCode from "./AnimatedCode";
import { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { useScroll } from "../hooks/useScroll";

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { isMounted } = useWindowSize();
  const { scrollY } = useScroll();

  useEffect(() => {
    if (isMounted) {
      setHasScrolled(scrollY > 100);
    }
  }, [scrollY, isMounted]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isMounted) return null;

  return (
    <section
      id="top"
      className="min-h-screen relative overflow-hidden pt-20 md:pt-32"
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-10 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                <span className="text-[#58a6ff]">Hello, </span>
                <br />
                My name is Bas Smit
              </h1>
              <p className="text-lg md:text-xl text-[#8b949e] mb-6 md:mb-8 leading-relaxed">
                And I&apos;m a software engineer passionate about building
                efficient and innovative solutions. Experienced in full-stack
                development with a focus on modern web technologies.
              </p>
              <div className="flex justify-center lg:justify-start items-center gap-4 md:gap-6 mb-8 md:mb-12">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/bassmit12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/bas-smit-914145340/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:bas.smit@live.nl"
                  className="text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="w-full sm:w-auto bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Code className="w-5 h-5" />
                  View Projects
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="w-full sm:w-auto bg-[#161b22] hover:bg-[#30363d] text-white font-bold py-3 px-6 rounded-lg border border-[#30363d] transition-colors flex items-center justify-center gap-2"
                >
                  <Terminal className="w-5 h-5" />
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>
          </div>
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnimatedCode />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 1 }}
          animate={{
            opacity: hasScrolled ? 0 : 1,
            y: hasScrolled ? 20 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[#8b949e] text-sm">Scroll Down</span>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="text-[#8b949e] hover:text-[#58a6ff] transition-colors"
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
