import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "./menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="flex justify-center pt-6">
        <Menu />
        </header>
        <main className="flex-1 p-4">{children}</main>
      </body>
    </html>
  );
}