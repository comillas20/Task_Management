import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

/**
 *
 * @param file The image file
 * @returns A FormData obj with "file" and "filename" as keys
 */
export function imageWrapper(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("filename", generateRandomString(10));

  return formData;
}

export function isImage(file: File): boolean {
  const acceptedImageTypes = ["image/jpeg", "image/png"];
  return file && acceptedImageTypes.includes(file["type"]);
}
