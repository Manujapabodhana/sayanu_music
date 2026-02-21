import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import I18nProvider from "@/components/I18nProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "EduStream - Empowering Education Everywhere",
  description: "A seamless, high-performance platform where teachers and students connect in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, outfit.variable, "font-sans antialiased text-gray-800")}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
