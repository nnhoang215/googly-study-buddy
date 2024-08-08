import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Googly Study Buddy",
  description: "Smart Flashcard maker for students - by Austin Nguyen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>  <AdminPanelLayout> {children} </AdminPanelLayout></body>
    </html>
  );
}
