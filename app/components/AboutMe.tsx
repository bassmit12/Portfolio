// AboutMe.tsx
"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Code, Rocket, Brain, Coffee } from "lucide-react";
import Image from "next/image";
import { useWindowSize } from "../hooks/useWindowSize";

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMounted } = useWindowSize();

  const skills = [
    {
      name: "Frontend Development",
      icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      name: "Backend Development",
      icon: <Rocket className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      name: "Artificial Intelligence",
      icon: <Brain className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      name: "Problem Solving",
      icon: <Coffee className="w-5 h-5 md:w-6 md:h-6" />,
    },
  ];

  if (!isMounted) return null;

  return (
    <section
      id="about"
      className="min-h-screen relative overflow-hidden py-16 md:py-20"
      ref={sectionRef}
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-[#58a6ff]">
            About Me
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center md:justify-start"
          >
            <Image
              src="/assets/Bas_Smit.jpg"
              alt="Bas Smit"
              width={200}
              height={200}
              className="rounded-full object-cover border-4 border-[#58a6ff] w-48 h-48 md:w-64 md:h-64"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[#58a6ff]">
              Bas Smit
            </h3>
            <p className="text-sm md:text-base text-[#8b949e] mb-6">
              I&apos;m a software engineer with a love for creating innovative
              solutions. With a background in both frontend and backend
              development, I enjoy tackling complex problems and turning ideas
              into reality. When I&apos;m not coding, you can find me exploring
              new technologies, contributing to open-source projects, or
              stargazing on clear nights.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center space-x-2 bg-[#161b22]/50 backdrop-blur-xl border border-[#30363d] rounded-lg p-2.5 md:p-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  {skill.icon}
                  <span className="text-xs md:text-sm text-[#c9d1d9]">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
