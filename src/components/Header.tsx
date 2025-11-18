"use client";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Fragment, useState } from "react";
import type { ReactNode } from "react";
import UserButton from "./UserButton";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";
  const { data: sessionData } = useSession();
  const session = authEnabled ? sessionData : null;
  const isAuthenticated = Boolean(session);
  const showCheckoutLink = !authEnabled || isAuthenticated;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const handleMobileSignOut = async () => {
    try {
      await signOut({ redirect: false });
    } finally {
      closeMenu();
    }
  };

  return (
    <>
      <header className="w-full sticky top-0 z-40 bg-[color:var(--color-background)]/80 backdrop-blur border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href={ROUTES.HOME} className="font-semibold tracking-tight heading-section text-xl">
            Velthéa
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-base">
            {(() => {
              const links: Array<{ key: string; node: ReactNode }> = [
                { key: "hamper", node: <Link href={ROUTES.BASE} className="hover:opacity-80 text-md">Hamper Bases</Link> },
              ];

              if (showCheckoutLink) {
                links.push({ key: "checkout", node: <Link href={ROUTES.CHECKOUT} className="hover:opacity-80 text-md">Checkout</Link> });
              }

              if (authEnabled && isAuthenticated) {
                links.push({ key: "profile", node: <Link href={ROUTES.PROFILE} className="hover:opacity-80 text-md">Profile</Link> });
              }

              return links.map((link, index) => (
                <Fragment key={link.key}>
                  {link.node}
                  {index < links.length - 1 && (
                    <span className="inline-block h-6 border-r border-[color:var(--color-text)]/40" aria-hidden="true" />
                  )}
                </Fragment>
              ));
            })()}
            {authEnabled ? <UserButton/> : null}
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
            {showCheckoutLink ? (
              <Link
                href={ROUTES.CHECKOUT}
                className="hover:opacity-80"
                onClick={closeMenu}
              >
                Checkout
              </Link>
            ) : null}
            {authEnabled && isAuthenticated ? (
              <>
                <Link
                  href={ROUTES.PROFILE}
                  className="hover:opacity-80"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleMobileSignOut}
                  className="text-left hover:opacity-80"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                {authEnabled ? (
                  <>
                    <Link
                      href={ROUTES.LOGIN}
                      className="hover:opacity-80"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link
                      href={ROUTES.SIGNUP}
                      className="hover:opacity-80"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : null}
              </>
            )}
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