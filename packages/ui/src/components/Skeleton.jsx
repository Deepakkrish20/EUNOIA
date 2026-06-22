import React from 'react';

/**
 * Premium Loading Skeleton placeholder.
 */
export function Skeleton({ className = '', ...props }) {
  return (
    <div 
      className={`animate-pulse rounded-lg bg-card/80 border border-border/40 ${className}`} 
      {...props} 
    />
  );
}
