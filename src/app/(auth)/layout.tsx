import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In - Velthéa",
    description: "Access you Account."
};

export default function RootLayout({ 
    children,
}: Readonly<{ 
    children: React.ReactNode;
}>) {
  return <>{children}</>;
}