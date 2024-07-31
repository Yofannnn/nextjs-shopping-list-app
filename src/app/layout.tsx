import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GlobalLayout from "../../components/layout/Global";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopping List App",
  description: "Grocery List generated by create next app",
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
