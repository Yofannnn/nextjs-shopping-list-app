import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GlobalLayout from "@/components/layout/Global";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEXCART",
  description:
    "NEXCART is a modern shopping list manager that helps you organize your shopping with AI assistance, custom themes, multiple lists, and offline access. Track your spending, manage your lists, and sync across devices for a seamless experience.",
  openGraph: {
    title: "NEXCART - Organize Your Shopping Effortlessly",
    description:
      "NEXCART is a modern shopping list app with AI-powered assistance, multiple lists, and offline access. Organize your shopping better with NEXCART.",
    url: "https://nexcart.vercel.app",
    siteName: "NEXCART",
    locale: "id-ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
