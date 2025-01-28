"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function StarBackground({ count = 200 }) {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setMounted(true);
    const generateStars = () => {
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
      for (let i = 0; i < count; i++) {
        newStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Increased size range from 1-3 to 2-4 pixels
          size: Math.random() * 2 + 2,
          color: getStarColor(),
        });
      }
      setStars(newStars);
    };

    const updateStars = () => {
      generateStars();
    };

    generateStars();
    window.addEventListener("resize", updateStars);

    // Update stars when content might change
    const observer = new MutationObserver(updateStars);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("resize", updateStars);
      observer.disconnect();
    };
  }, [count]);

  if (!mounted) return <div className="absolute inset-0 bg-[#0d1117]" />;

  return (
    <div className="absolute inset-0 bg-[#0d1117] min-h-full">
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
            repeat: Number.POSITIVE_INFINITY,
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
