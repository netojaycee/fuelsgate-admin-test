import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold' | `font-${string}`;

export const getFontWeight = (fontWeight: FontWeight = 'regular') => {
  if (fontWeight === 'regular') {
    return 'font-normal'
  } else if (fontWeight === 'medium') {
    return 'font-medium'
  } else if (fontWeight === 'semibold') {
    return 'font-semibold'
  } else if (fontWeight === 'bold') {
    return 'font-bold'
  } else {
    return fontWeight
  }
}