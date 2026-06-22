import React from 'react';
import { motion } from 'framer-motion';

/**
 * SplitText Component
 * Splits text into words or letters and animates them using a staggered flicker transition.
 * Reproduces the lively text reveal seen on titangateequity.com.
 */
export default function SplitText({ 
  text, 
  className = '', 
  delay = 0.125, 
  stagger = 0.028,
  variant = 'char'
}) {
  const itemVariants = {
    hidden: { 
      opacity: 0,
      color: '#8898e7',
    },
    visible: (customIndex) => ({
      opacity: [0, 1, 0.15, 0.85, 1, 0.7, 1],
      color: ['#8898e7', '#8898e7', '#8898e7', '#8898e7', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      transition: {
        duration: 0.45,
        ease: [0.215, 0.61, 0.355, 1], // ease-out-power2
        delay: delay + (customIndex * stagger),
      },
    }),
  };

  if (variant === 'word') {
    const words = text.split(' ');
    return (
      <span className={`inline-block ${className}`}>
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            className="inline-block mr-[0.25em] whitespace-nowrap"
            custom={idx}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  const words = text.split(' ');
  let charCount = 0;

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => {
        const characters = Array.from(word);
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {characters.map((char, charIdx) => {
              const absoluteIndex = charCount++;
              return (
                <motion.span
                  key={charIdx}
                  className="inline-block"
                  custom={absoluteIndex}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 && (
              <motion.span
                className="inline-block"
                custom={charCount++}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                &nbsp;
              </motion.span>
            )}
          </span>
        );
      })}
    </span>
  );
}

