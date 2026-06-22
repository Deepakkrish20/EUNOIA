import React from 'react';

/**
 * Premium EmptyState placeholder.
 */
export function EmptyState({ 
  title, 
  description, 
  action, 
  className = '' 
}) {
  return (
    <div 
      className={`flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-border/60 bg-card/20 backdrop-blur-sm ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 border border-primary/20 text-primary text-lg glow-white">
        📁
      </div>
      <h3 className="mt-5 text-sm font-bold text-foreground tracking-tight">{title}</h3>
      <p className="mt-2 text-xs text-muted max-w-xs mx-auto leading-relaxed">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
