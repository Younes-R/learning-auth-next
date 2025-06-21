import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learing Auth",
  description: "Trying to implement auth with Next App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
