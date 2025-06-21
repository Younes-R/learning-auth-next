import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
        <aside>
          <nav>
            <Link href="/">Home Page</Link>
            <Link href="/student">Student Page</Link>
            <Link href="teacher">Teacher Page</Link>
          </nav>
          <nav>
            <Link href="register">Register</Link>
            <Link href="login">Login</Link>
            <button>Sign Out</button>
          </nav>
        </aside>
        {children}
      </body>
    </html>
  );
}
