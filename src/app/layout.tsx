import { Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

// Provider
import ClientProvider from "../components/private/ClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "OpenLibrary Book Search App",
  description: "Created by Preveen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </body>
      </html>
    </ClientProvider>
  );
}
