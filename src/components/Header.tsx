"use client";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="w-full sticky top-0 z-40 bg-[color:var(--color-background)]/80 backdrop-blur border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href={ROUTES.HOME} className="font-semibold tracking-tight heading-section text-xl">
            Velthéa
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-base">
            <Link href={ROUTES.BASE} className="hover:opacity-80">Hamper Bases</Link>
            <Link href={ROUTES.CHECKOUT} className="hover:opacity-80">Checkout</Link>
            <Link href={ROUTES.LOGIN} className="hover:opacity-80">Login</Link>
          </nav>
          <div className="sm:hidden">
            <button onClick={toggleMenu} aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 sm:hidden transition-all duration-500 ${
            isMenuOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      >
        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" />

        {/* Sliding Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-gradient-to-b from-[var(--color-background)] to-[color:var(--color-surface)] shadow-xl transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[color:var(--color-border)]/40">
            <span className="font-semibold text-lg tracking-wide text-[var(--color-text)]">
              Menu
            </span>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="p-2 hover:bg-[var(--color-muted)]/20 rounded-full transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 px-6 py-6 text-lg font-medium">
            <Link
              href={ROUTES.BASE}
              className="hover:opacity-80"
              onClick={closeMenu}
            >
              Hamper Bases
              {/* <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span> */}
            </Link>
            <Link
              href={ROUTES.CHECKOUT}
              className="hover:opacity-80"
              onClick={closeMenu}
            >
              Checkout
              {/* <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span> */}
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="hover:opacity-80"
              onClick={closeMenu}
            >
              Login
            </Link>
          </nav>

          {/* Footer / Accent */}
          <div className="mt-auto px-6 py-8 border-t border-[color:var(--color-border)]/40 text-sm text-[color:var(--color-text)]">
            <p>Crafted with grace — Velthéa</p>
          </div>
        </div>
      </div>
    </>
  );
}