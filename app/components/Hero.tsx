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
import AnimatedCode from "./Animated-code";
import { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { useScroll } from "../hooks/useScroll";

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { windowSize, isMounted } = useWindowSize();
  const { scrollY } = useScroll();

  useEffect(() => {
    if (isMounted) {
      setHasScrolled(scrollY > 100);
    }
  }, [scrollY, isMounted]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <section id="top" className="min-h-screen relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-[#0d1117]">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl font-bold mb-6">
                  <span className="text-[#58a6ff]">Hello, </span>
                  <br />
                  I&apos;m a Software Engineer
                </h1>
                <p className="text-xl text-[#8b949e] mb-8 leading-relaxed">
                  Passionate about building efficient and innovative solutions.
                  Experienced in full-stack development with a focus on modern
                  web technologies.
                </p>
                <div className="flex items-center gap-6 mb-12">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:your.email@example.com"
                    className="text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </motion.a>
                </div>
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects"
                    className="bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Code className="w-5 h-5" />
                    View Projects
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact"
                    className="bg-[#161b22] hover:bg-[#30363d] text-white font-bold py-3 px-6 rounded-lg border border-[#30363d] transition-colors flex items-center gap-2"
                  >
                    <Terminal className="w-5 h-5" />
                    Get in Touch
                  </motion.a>
                </div>
              </motion.div>
            </div>
            <div className="lg:block pt-20">
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
      </section>

      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 1 }}
        animate={{
          opacity: hasScrolled ? 0 : 1,
          y: hasScrolled ? 20 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2"
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
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </>
  );
}
