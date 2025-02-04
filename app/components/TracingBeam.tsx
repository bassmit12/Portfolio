"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TracingBeam() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const MARGIN = 200;

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // Keep lastScrollY in dependencies

  // Handle container setup and image preloading
  useEffect(() => {
    // Preload rocket image
    const rocketImage = new Image();
    rocketImage.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rocket-5cPEjxlJMX6ijuMrqk9RV3ydVQIDTz.gif";
    rocketImage.onload = () => {
      setIsLoaded(true);
    };

    const updateContainerHeight = () => {
      setContainerHeight(window.innerHeight - MARGIN * 2);
    };

    updateContainerHeight();
    const currentRef = ref.current;

    const resizeObserver = new ResizeObserver(() => {
      updateContainerHeight();
    });

    if (currentRef) {
      resizeObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, []); // Empty dependencies for setup effect

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [MARGIN, containerHeight + MARGIN],
  );

  if (!isLoaded) return null;

  return (
    <div
      ref={ref}
      className="fixed left-4 top-0 bottom-0 w-12 z-20 hidden md:block"
    >
      <div className="h-full w-full relative">
        <motion.div
          className="absolute w-full"
          style={{ y }}
          initial={{ y: MARGIN }}
        >
          <div
            className="w-14 h-14 relative transition-transform duration-300"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rocket-5cPEjxlJMX6ijuMrqk9RV3ydVQIDTz.gif')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform:
                scrollDirection === "down" ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
