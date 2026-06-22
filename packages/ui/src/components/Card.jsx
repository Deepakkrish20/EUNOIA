import React from 'react';

/**
 * Premium Card container.
 * Elevated Card Surface (#121212) with thin borders and hover pink glows.
 */
export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`rounded-xl border border-border bg-card/90 text-card-foreground shadow-2xl transition-all duration-300 hover:border-primary/25 hover:shadow-primary/5 hover:scale-[1.01] ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`text-xl font-bold leading-none tracking-tight text-foreground ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`text-sm text-muted ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`flex items-center p-6 pt-0 border-t border-border/20 mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
