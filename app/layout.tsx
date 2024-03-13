import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*This part is used  to add the font to the head of every page*/
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-full bg-muted")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
