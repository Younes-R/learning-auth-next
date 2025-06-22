import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/ui/layout/navBar";

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
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
