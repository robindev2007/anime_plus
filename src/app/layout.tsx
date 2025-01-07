import { Inter } from "next/font/google";

import "./globals.css";
import { Metadata } from "next";
import { WEBSITE_DATA } from "@/lib/constance";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: WEBSITE_DATA.TITLE,
  description: WEBSITE_DATA.DESCRIPTION,
  keywords: WEBSITE_DATA.KEYWORDS,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <main className="flex h-full min-h-screen flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
