import React, { useState, useRef, useEffect } from 'react';

/**
 * Premium Dropdown picker component.
 */
export function Dropdown({ 
  trigger, 
  items = [], 
  align = 'right',
  className = '' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignments = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={`absolute z-30 mt-2 w-56 rounded-lg border border-border bg-popover p-1.5 shadow-2xl ${alignments[align]} focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.onClick) item.onClick();
                setIsOpen(false);
              }}
              className="flex w-full items-center px-3 py-2 text-sm rounded-md text-muted hover:bg-card hover:text-foreground transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
