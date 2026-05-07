import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Esto debe estar aquí para que el error desaparezca

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bder Template",
  description: "Desarrollo modular con Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}