import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Srivatsa S - Full Stack Developer & Blockchain Enthusiast",
  description:
    "Portfolio of Srivatsa S, a passionate Computer Science student specializing in full-stack development, blockchain solutions, and AI-driven applications.",
  keywords:
    "Srivatsa S, Full Stack Developer, Blockchain, AI, Computer Science, Web Development, React, Next.js",
  authors: [{ name: "Srivatsa S" }],
  creator: "Srivatsa S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://srivatsa-portfolio.vercel.app",
    title: "Srivatsa S - Full Stack Developer & Blockchain Enthusiast",
    description:
      "Portfolio of Srivatsa S, a passionate Computer Science student specializing in full-stack development, blockchain solutions, and AI-driven applications.",
    siteName: "Srivatsa S Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Srivatsa S - Full Stack Developer & Blockchain Enthusiast",
    description:
      "Portfolio of Srivatsa S, a passionate Computer Science student specializing in full-stack development, blockchain solutions, and AI-driven applications.",
    creator: "@Vatsa5002",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${poppins.style.fontFamily};
  --font-sans: ${poppins.variable};
}
        `}</style>
      </head>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
