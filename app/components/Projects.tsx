// Projects.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const { isMounted } = useWindowSize();
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
      className="min-h-screen relative overflow-hidden py-16 md:py-20"
      ref={sectionRef}
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-[#58a6ff]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Cosmic Creations
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-[#8b949e]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore my latest projects and technical adventures
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ opacity, y }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-[#161b22]/50 backdrop-blur-xl border border-[#30363d] rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative w-full h-40 md:h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <motion.div className="absolute inset-0 bg-[#0d1117]/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#58a6ff] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-6 h-6 md:w-8 md:h-8" />
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
                        <ExternalLink className="w-6 h-6 md:w-8 md:h-8" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#58a6ff]">
                  {project.title}
                </h3>
                <p className="text-sm md:text-base text-[#8b949e] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-[#238636] text-white rounded-full"
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
