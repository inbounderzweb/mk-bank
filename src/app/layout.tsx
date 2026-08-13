import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Morazha Kalliasseri Service Co-operative Bank | MKSC Bank (Est. 1961)",
  description: "Official portal of Morazha Kalliasseri Service Co-op Bank Ltd No. 4220. Empowering Kannur community with Class 1 Super Grade banking, deposits, loans, RTGS/NEFT, and non-banking services across 9 branches.",
  keywords: ["MKSC Bank", "Morazha Bank", "Kalliasseri Co-op Bank", "Cooperative Bank Kannur", "Morazha Kalliasseri Service Co-op Bank", "Class 1 Super Grade Bank"],
  authors: [{ name: "Morazha Kalliasseri Service Co-op Bank" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
