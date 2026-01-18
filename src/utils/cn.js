import clsx from 'clsx';

/**
 * Combines class names using clsx
 * @param {...any} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
  return clsx(classes);
}