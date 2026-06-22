import React from 'react';

/**
 * Premium Dialog container interface.
 */
export function Dialog({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  footer,
  className = ''
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className={`relative w-full max-w-md rounded-xl border border-primary/20 bg-popover p-6 shadow-2xl glow-white flex flex-col animate-in zoom-in-95 duration-350 ${className}`}
      >
        <div className="flex flex-col space-y-1.5 pb-4">
          <h2 className="text-lg font-bold leading-none tracking-tight text-foreground">{title}</h2>
          {description && (
            <p className="text-xs text-muted">{description}</p>
          )}
        </div>
        
        <div className="py-4 flex-1">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border/60 mt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
