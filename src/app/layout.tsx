import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["500","600","700"] });

export const metadata: Metadata = {
  title: "Velthéa — Personalized Hampers",
  description: "More than a gift, a gesture of grace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased min-h-dvh bg-[color:var(--color-background)] text-[color:var(--color-text)]`}>
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
          <div className="absolute -top-16 -right-16 w-[420px] h-[420px] rounded-full bg-[color:var(--color-accent)]/20 blur-3xl" />
        </div>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
