import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 grid lg:grid-cols-2 items-center gap-10">
      <div>
        <h1 className="heading-hero text-4xl sm:text-5xl lg:text-6xl mb-6">
          More than a gift, a gesture of grace.
        </h1>
        <p className="text-[color:var(--color-muted)] text-lg max-w-prose mb-8">
          Curated hampers designed to speak the language of care—soft, thoughtful,
          and beautifully personal.
        </p>
        <Link href={ROUTES.BASE} className="btn btn-primary" aria-label="Start your order">
          Get Yours
        </Link>
      </div>
      <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-[20px] overflow-hidden shadow-[var(--shadow-elevated)] bg-[color:var(--color-accent)]/30">
        {/* Placeholder background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511381939415-c1c63432da43?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-70" aria-hidden />
      </div>
    </section>
  );
}
