import type { Metadata } from "next";
import { Ovo } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/SessionProvider";

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
        <AuthProvider>
          <StoreProvider>
            <Toaster />
            <main>{children}</main>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}