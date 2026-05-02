"use client";

import { motion, AnimatePresence, type Transition } from "framer-motion";
import { usePathname } from "next/navigation";

const transition: Transition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
};

const variants = {
  fadeScale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
  fadeSlide: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: "fadeScale" | "fadeSlide";
}

export function PageTransition({ children, variant = "fadeSlide" }: PageTransitionProps) {
  const pathname = usePathname();
  const v = variants[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
