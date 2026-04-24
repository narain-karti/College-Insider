import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className }: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -50px 0px" });

  let wordIndex = 0;

  return (
    <div
      ref={containerRef}
      className={twMerge("inline-flex flex-wrap justify-center", className)}
    >
      {segments.map((segment, segmentIndex) => {
        const words = segment.text.split(' ');
        
        return (
          <span key={segmentIndex} className={twMerge("inline-flex flex-wrap", segment.className)}>
            {words.map((word, localWordIndex) => {
              const currentDelayIndex = wordIndex++;
              return (
                <span key={localWordIndex} className="mr-[0.25em] inline-block whitespace-nowrap overflow-hidden">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{
                      delay: currentDelayIndex * 0.08,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}
