import React from 'react';
import { motion } from 'framer-motion';

/**
 * FadeIn animation wrapper
 * @param {{ children: React.ReactNode, duration?: number }} props 
 */
export const FadeIn = ({ children, duration = 0.3 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration }}
  >
    {children}
  </motion.div>
);

/**
 * SlideUp animation wrapper
 * @param {{ children: React.ReactNode, delay?: number }} props 
 */
export const SlideUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 100, damping: 15, delay }}
  >
    {children}
  </motion.div>
);
