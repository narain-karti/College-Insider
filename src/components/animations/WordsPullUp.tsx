import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({ text, className, showAsterisk = false }: WordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -50px 0px" });
  
  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      className={twMerge("flex flex-wrap relative", className)}
    >
      {words.map((word, wordIndex) => {
        const isLastWord = wordIndex === words.length - 1;
        const lastAIndex = word.lastIndexOf('a');
        const hasAsterisk = showAsterisk && isLastWord && lastAIndex !== -1;

        return (
          <span key={wordIndex} className="mr-[0.25em] inline-block last:mr-0 whitespace-nowrap overflow-hidden">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                delay: wordIndex * 0.08,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="inline-block relative"
            >
              {hasAsterisk ? (
                <>
                  {word.slice(0, lastAIndex + 1)}
                  <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
                  {word.slice(lastAIndex + 1)}
                </>
              ) : (
                word
              )}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}
