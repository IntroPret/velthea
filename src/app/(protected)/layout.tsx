"use client";
import AuthGuard from "@/components/AuthGuard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const authEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";
  return (
    <>
    {authEnabled ? (
      <AuthGuard>
          <Header />
              {children}
          <Footer />
      </AuthGuard>
    ) : (
      <>
        <Header />
          {children}
        <Footer />
      </>
    )}
    </>
  );
}