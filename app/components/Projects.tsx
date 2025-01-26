"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useWindowSize } from "../hooks/useWindowSize";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live?: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Space Portfolio",
    description: "A responsive portfolio website with a space theme.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/yourusername/space-portfolio",
    live: "https://space-portfolio.vercel.app",
    image: "/assets/Project_placeholder.png",
  },
  {
    title: "Cosmic Task Manager",
    description: "A task management app with a galactic twist.",
    technologies: ["Vue.js", "Vuex", "Firebase", "Tailwind CSS"],
    github: "https://github.com/yourusername/cosmic-task-manager",
    image: "/assets/Project_placeholder.png",
  },
  {
    title: "Asteroid Tracker",
    description: "Real-time asteroid tracking using NASA's API.",
    technologies: ["React", "D3.js", "Node.js", "Express"],
    github: "https://github.com/yourusername/asteroid-tracker",
    live: "https://asteroid-tracker.herokuapp.com",
    image: "/assets/Project_placeholder.png",
  },
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { windowSize, isMounted } = useWindowSize();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  if (!isMounted) return null;

  return (
    <section
      id="projects"
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
            Cosmic Creations
          </motion.h2>
          <motion.p
            className="text-[#8b949e] text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore my latest projects and technical adventures
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ opacity, y }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-[#161b22]/50 backdrop-blur-xl border border-[#30363d] rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <motion.div
                  className="absolute inset-0 bg-[#0d1117]/80 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#58a6ff] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-8 h-8" />
                    </motion.a>
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#58a6ff] transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-8 h-8" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#58a6ff]">
                  {project.title}
                </h3>
                <p className="text-[#8b949e] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-[#238636] text-white px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
