import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { TemaProvider } from "@/context/tema-context";
import { FavoritProvider } from "@/context/favorit-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TemaProvider>
          <FavoritProvider>
            <Header />
            <main className="flex-1 p-4">{children}</main>
          </FavoritProvider>
        </TemaProvider>
      </body>
    </html>
  );
}
