import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-border)] bg-white/40">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-[color:var(--color-muted)]">Velthéa — Crafted with Warmth.</p>
        <div className="flex items-center gap-4">
          <Link href="https://www.instagram.com/velthea.id?igsh=MTVqaHY5NGFuY3Z6Zw== " aria-label="Instagram" className="px-2 py-1 rounded-2xl transition-all hover:bg-[color:var(--color-text)]/10 hover:opacity-90">Instagram</Link>
          <span className="inline-block h-6 border-r border-[color:var(--color-text)]/40" aria-hidden="true"/>
          {/* <Link href="https://x.com" aria-label="X" className="hover:opacity-80">X</Link>
          <span className="inline-block h-6 border-r border-[color:var(--color-text)]/40" aria-hidden="true"/> */}
          <Link href="mailto:veltheaid@gmail.com" aria-label="Email" className="px-2 py-1 rounded-2xl transition-all hover:bg-[color:var(--color-text)]/10 hover:opacity-90">Email</Link>
        </div>
      </div>
    </footer>
  );
}
