import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { GardenProvider } from "@/context/GardenContext";
import { ThemeProvider } from "@/context/ThemeContext";
import PixelGarden from "@/components/PixelGarden";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Admin",
  description: "Personal Portfolio with Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <GardenProvider>
            <ThemeProvider>
              {/* Global Pixel Garden Background */}
              <div className="fixed inset-0 z-[-1]">
                <PixelGarden />
              </div>
              {children}
            </ThemeProvider>
          </GardenProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
