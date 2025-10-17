import type { Metadata } from "next";
import { Ovo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/lib/store";
import { Toaster } from "react-hot-toast";

const ovo = Ovo({
  subsets: ["latin"],
  weight: "400", // Ovo is only available in the 400 weight
  variable: "--font-ovo",
});

export const metadata: Metadata = {
  title: "Velthea",
  description: "More than a gift, a gesture of grace.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ovo.variable}`}>
        <StoreProvider>
          <Toaster />
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}