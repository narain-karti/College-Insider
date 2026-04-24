import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedLetterProps {
  children: React.ReactNode;
  index: number;
  totalChars: number;
}

export function AnimatedLetter({ children, index, totalChars }: AnimatedLetterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });

  const charProgress = index / totalChars;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <motion.span ref={ref} style={{ opacity }}>
      {children}
    </motion.span>
  );
}
