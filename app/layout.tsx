import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { TemaProvider } from "@/contexts/tema-context";
import { FavoritProvider } from "@/contexts/favorit-context";
import { TodoProvider } from "@/contexts/todo-context";

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
        <TodoProvider>
          <TemaProvider>
            <FavoritProvider>
              <Header />
              <main className="flex-1 p-4">{children}</main>
            </FavoritProvider>
          </TemaProvider>
        </TodoProvider>
      </body>
    </html>
  );
}
