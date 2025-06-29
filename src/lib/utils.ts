import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const protocol =
  process.env.VERCEL_ENV === "production"
    ? "https"
    : process.env.NODE_ENV === "production"
      ? "https"
      : "http";
export const rootDomain =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
