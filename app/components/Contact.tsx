// Contact.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { useWindowSize } from "../hooks/useWindowSize";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { isMounted } = useWindowSize();
  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (!isMounted) return null;

  return (
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden py-16 md:py-20"
      ref={formRef}
    >
      <motion.div
        className="relative z-10 container mx-auto px-4 md:px-6"
        style={{ opacity, y }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Me
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-[#8b949e]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to start a cosmic collaboration? Send me a message!
            </motion.p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6 backdrop-blur-xl bg-[#161b22]/50 p-4 md:p-8 rounded-2xl border border-[#30363d]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-3 md:px-4 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors text-sm md:text-base"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-3 md:px-4 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors text-sm md:text-base"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full px-3 md:px-4 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors resize-none text-sm md:text-base"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting || submitted}
              className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                "Sending..."
              ) : submitted ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
