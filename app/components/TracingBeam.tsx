// components/TracingBeam.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TracingBeam() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // Add this state

  const MARGIN = 200;

  useEffect(() => {
    // Set initial loaded state
    setIsLoaded(true);

    // Initial setup
    const updateContainerHeight = () => {
      setContainerHeight(window.innerHeight - MARGIN * 2);
    };

    updateContainerHeight();
    const currentRef = ref.current;

    // Resize Observer setup
    const resizeObserver = new ResizeObserver(() => {
      updateContainerHeight();
    });

    if (currentRef) {
      resizeObserver.observe(currentRef);
    }

    // Scroll handler
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setLastScrollY(currentScrollY);
    };

    // Set initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [MARGIN, containerHeight + MARGIN],
  );

  // Don't render until everything is loaded
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
          initial={{ y: MARGIN }} // Add initial position
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
