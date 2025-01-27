"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

const codeString = `function HelloWorld() {
  const [isAwesome, setIsAwesome] = useState(true);

  return (
    <div className="coding-is-fun">
      <h1>Hello, I'm a Software Engineer!</h1>
      {isAwesome && (
        <p>I love building amazing things!</p>
      )}
    </div>
  );
}`;

export default function AnimatedCode() {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  return (
    <div className="rounded-lg bg-[#0d1117] border border-[#30363d] overflow-hidden max-w-full">
      <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex space-x-1.5 md:space-x-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-xs md:text-sm text-[#8b949e]">Hello.tsx</div>
      </div>
      <div className="p-2 md:p-4 overflow-x-auto">
        <Highlight theme={themes.nightOwl} code={codeString} language="tsx">
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="font-mono text-xs md:text-sm">
              {tokens.map((line, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  onHoverStart={() => setSelectedLine(i)}
                  onHoverEnd={() => setSelectedLine(null)}
                >
                  <motion.div
                    className="absolute left-0 right-0 h-full"
                    initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                    animate={{
                      backgroundColor:
                        selectedLine === i
                          ? "rgba(88, 166, 255, 0.1)"
                          : "rgba(0,0,0,0)",
                    }}
                  />
                  <span className="mr-2 md:mr-4 inline-block w-6 md:w-8 text-[#8b949e] select-none">
                    {i + 1}
                  </span>
                  <span {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </motion.div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
