"use client";
import AuthGuard from "@/components/AuthGuard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <AuthGuard>
        <Header />
            {children}
        <Footer />
    </AuthGuard>
    </>
  );
}