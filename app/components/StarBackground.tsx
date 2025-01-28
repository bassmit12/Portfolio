// components/StarBackground.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
}

const STAR_COLORS = [
  "#ffffff", // White
  "#ffffd4", // Warm white
  "#f8f7ff", // Cool white
  "#fff4e6", // Peach
  "#eaeaea", // Light gray
];

export default function StarBackground({ count = 200 }) {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getStarColor = useCallback(() => {
    return STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  }, []);

  const generateStars = useCallback(
    (width: number, height: number) => {
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 3,
        color: getStarColor(),
      }));
    },
    [count, getStarColor],
  );

  const updateDimensions = useCallback(() => {
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

    if (width !== dimensions.width || height !== dimensions.height) {
      setDimensions({ width, height });
    }
  }, [dimensions]);

  useEffect(() => {
    setMounted(true);
    updateDimensions();

    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
      }, 250); // Debounce resize events
    };

    window.addEventListener("resize", debouncedResize);

    // Use ResizeObserver for content changes
    const resizeObserver = new ResizeObserver(() => {
      debouncedResize();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      resizeObserver.disconnect();
      clearTimeout(resizeTimer);
    };
  }, [updateDimensions]);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setStars(generateStars(dimensions.width, dimensions.height));
    }
  }, [dimensions, generateStars]);

  const starElements = useMemo(() => {
    return stars.map((star, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          left: star.x,
          top: star.y,
          width: star.size,
          height: star.size,
          backgroundColor: star.color,
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0.2 }}
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
    ));
  }, [stars]);

  if (!mounted) return <div className="absolute inset-0 bg-[#0d1117]" />;

  return (
    <div className="fixed inset-0 bg-[#0d1117] overflow-hidden">
      {starElements}
    </div>
  );
}
