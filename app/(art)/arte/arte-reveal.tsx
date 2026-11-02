"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const offsets = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: -28 },
  right: { x: 28 },
  none: {},
} as const;

export type ArteRevealDirection = keyof typeof offsets;

interface ArteRevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  direction?: ArteRevealDirection;
  duration?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
}

/**
 * Entrance animation for the art landing.
 *
 * Blocks rise and fade once as they scroll into view, staggered by the caller so
 * the page reads as a flow instead of a single wipe. When the visitor asked for
 * reduced motion the module's stylesheet forces these elements visible with
 * `[data-reveal]`, because the preference hook only settles after mount and a
 * late switch would leave content stuck at opacity 0.
 */
export function ArteReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
  amount = 0.2,
}: ArteRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      data-reveal=""
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reducedMotion ? 0 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
