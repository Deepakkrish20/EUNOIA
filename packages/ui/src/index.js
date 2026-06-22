import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind classes cleanly with clsx
 * @param {...string} inputs 
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Export Design System Components
export * from './components/Button.jsx';
export * from './components/Input.jsx';
export * from './components/Card.jsx';
export * from './components/Modal.jsx';
export * from './components/Dialog.jsx';
export * from './components/Dropdown.jsx';
export * from './components/Table.jsx';
export * from './components/Loader.jsx';
export * from './components/Skeleton.jsx';
export * from './components/EmptyState.jsx';
