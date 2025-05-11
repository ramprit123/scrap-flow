import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Flow Scrape - Web Scraping Made Easy",
  description:
    "Powerful web scraping tool for extracting data from websites with ease",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
