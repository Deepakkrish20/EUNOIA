import React from 'react';

/**
 * Premium Modal overlay panel.
 * Elevated Surface (#101010) backdrop with blur effects and hot pink highlight borders.
 */
export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = '' 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className={`relative w-full max-w-lg rounded-xl border border-primary/20 bg-popover p-6 shadow-2xl glow-white flex flex-col animate-in zoom-in-95 duration-350 ${className}`}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <h2 className="text-lg font-bold text-foreground tracking-tight">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-muted hover:text-primary text-2xl leading-none transition-colors"
          >
            &times;
          </button>
        </div>
        
        {/* Body content */}
        <div className="pt-4 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
