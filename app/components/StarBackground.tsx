// components/StarBackground.tsx
import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";

export default function StarBackground({ count = 100 }) {
  const { windowSize } = useWindowSize();

  return (
    <div className="absolute inset-0 bg-[#0d1117]">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`${i}-${windowSize.width}-${windowSize.height}`}
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
  );
}
