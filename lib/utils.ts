import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Aclonica } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const aclonica = Aclonica({
  subsets: ["latin"],
  weight: "400",
});
