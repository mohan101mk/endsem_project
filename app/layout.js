import { Geist, Geist_Mono } from "next/font/google";
import { Pacifico } from "next/font/google"; // 1. Import Pacifico here
import "./globals.css";

// Setup for Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Setup for Geist Mono font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Setup for Pacifico font
const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400", // Pacifico only has one weight
  subsets: ["latin"],
  display: "swap", // Ensures text is visible while font loads
});

export const metadata = {
  title: "FinX - Personal Finance Manager",
  description: "Track your income, expenses, and investments with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 3. The <Head> component is removed */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable}`}>
        {children}
      </body>
    </html>
  );
}