"use client";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-40 bg-[color:var(--color-background)]/80 backdrop-blur border-b border-[color:var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href={ROUTES.HOME} className="font-semibold tracking-tight heading-section text-[20px]">
          Velthéa
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <Link href={ROUTES.BASE} className="hover:opacity-80">Hamper Bases</Link>
          <Link href={ROUTES.CHECKOUT} className="hover:opacity-80">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
