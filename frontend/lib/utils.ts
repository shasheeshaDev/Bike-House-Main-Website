import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanSanityString(value: string | undefined | null): string {
  if (!value) return "";
  return value.trim();
}
