import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-border)] bg-white/40">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-[color:var(--color-muted)]">Velthéa — crafted with warmth.</p>
        <div className="flex items-center gap-4">
          <Link href="https://instagram.com" aria-label="Instagram" className="hover:opacity-80">Instagram</Link>
          <Link href="https://x.com" aria-label="X" className="hover:opacity-80">X</Link>
          <Link href="mailto:hello@velthea.example" aria-label="Email" className="hover:opacity-80">Email</Link>
        </div>
      </div>
    </footer>
  );
}
