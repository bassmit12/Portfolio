"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code, Rocket, Brain, Coffee } from "lucide-react";
import Image from "next/image";
import { useWindowSize } from "../hooks/useWindowSize";

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const { windowSize, isMounted } = useWindowSize();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const skills = [
    { name: "Frontend Development", icon: <Code className="w-6 h-6" /> },
    { name: "Backend Development", icon: <Rocket className="w-6 h-6" /> },
    { name: "Machine Learning", icon: <Brain className="w-6 h-6" /> },
    { name: "Problem Solving", icon: <Coffee className="w-6 h-6" /> },
  ];

  if (!isMounted) return null;

  return (
    <section
      id="about"
      className="min-h-screen relative overflow-hidden py-20"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-[#0d1117]">
        {[...Array(50)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4 text-[#58a6ff]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          style={{ opacity, y }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/assets/Profile_avatar_placeholder_large.png"
              alt="Bas Smit"
              width={256}
              height={256}
              className="rounded-full mx-auto md:mx-0 object-cover border-4 border-[#58a6ff]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#58a6ff]">
              Bas Smit
            </h3>
            <p className="text-[#8b949e] mb-6">
              I&apos;m a passionate software engineer with a love for creating
              innovative solutions. With a background in both frontend and
              backend development, I enjoy tackling complex problems and turning
              ideas into reality. When I&apos;m not coding, you can find me
              exploring new technologies, contributing to open-source projects,
              or stargazing on clear nights.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center space-x-2 bg-[#161b22]/50 backdrop-blur-xl border border-[#30363d] rounded-lg p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  {skill.icon}
                  <span className="text-sm text-[#c9d1d9]">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
