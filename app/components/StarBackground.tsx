"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useWindowSize } from "../hooks/useWindowSize";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function StarBackground({ count = 200 }) {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const { windowSize } = useWindowSize();

  // Determine star count based on screen width
  const starCount = windowSize.width < 768 ? 100 : count;

  const generateStars = useCallback(() => {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const width = window.innerWidth;

    const newStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 2,
        color: getStarColor(),
      });
    }
    setStars(newStars);
  }, [starCount]);

  useEffect(() => {
    setMounted(true);
    generateStars();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        generateStars();
      }, 250); // Debounce resize events
    };

    window.addEventListener("resize", handleResize);

    // Use ResizeObserver instead of MutationObserver
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        generateStars();
      }, 250);
    });

    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      clearTimeout(resizeTimer);
    };
  }, [generateStars]);

  if (!mounted) return <div className="absolute inset-0 bg-[#0d1117]" />;

  return (
    <div className="fixed inset-0 bg-[#0d1117] overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

function getStarColor() {
  const colors = [
    "#ffffff", // White
    "#ffffd4", // Warm white
    "#f8f7ff", // Cool white
    "#fff4e6", // Peach
    "#eaeaea", // Light gray
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
