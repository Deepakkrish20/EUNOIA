import React from 'react';

/**
 * Premium redesigned Button component.
 * Features hot-pink glows, active scaling, and typography tracking.
 */
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  ...props 
}) {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground border border-primary/30 hover:bg-white/90 hover:border-white/90 shadow-lg shadow-primary/20 glow-white',
    secondary: 'bg-card text-foreground border border-border hover:bg-white/10 hover:border-white/20',
    outline: 'border border-white/25 bg-transparent hover:bg-white/10 hover:border-white text-white',
    ghost: 'hover:bg-white/5 hover:text-white text-muted',
    destructive: 'bg-error text-white border border-error/30 hover:bg-error/90',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs tracking-wider uppercase',
    md: 'px-5 py-2.5 text-sm tracking-wide',
    lg: 'px-7 py-3.5 text-base tracking-wide',
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
