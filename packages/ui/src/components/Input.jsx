import React from 'react';

/**
 * Premium Form input text element.
 */
export function Input({ className = '', type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={`flex h-11 w-full rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${className}`}
      {...props}
    />
  );
}
