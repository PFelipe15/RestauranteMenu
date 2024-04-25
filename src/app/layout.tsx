import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurante Flutuante",
  description: "Servico especializado em Pratos Tipicos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  
      className={cn(
          "min-h-screen bg-secondary font-sans antialiased",
          fontSans.variable
        )}>{children}</body>
    </html>
  );
}
