import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function ContentGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 my-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* First image */}
        <div className="flex justify-center">
          <img
            src="/images/hampers/preview1.jpg"
            alt="Velthéa gift box packaging"
            className="rounded-xl shadow-lg object-cover w-full max-h-[280px]"
          />
        </div>

        {/* First text */}
        <div className="max-w-prose relative pb-8 text-left">
          <h3 className="text-2xl font-semibold mb-3 text-[var(--color-primary)]">
            Curated with Intention
          </h3>
          <p className="text-[var(--color-text)] leading-relaxed text-base">
            Every Velthéa hamper is thoughtfully curated — a blend of aesthetics, warmth, and meaning. 
            We believe a gift should tell a story, not just fill a box.
          </p>
          <div className="absolute bottom-0 flex gap-2">
            <span className="h-2 w-2 bg-[var(--color-primary)] rounded-full"></span>
            <span className="h-2 w-2 bg-[var(--color-muted)] rounded-full"></span>
            <span className="h-2 w-2 bg-[var(--color-secondary)] rounded-full"></span>
          </div>
        </div>

        {/* Second text */}
        <div className="max-w-prose relative pb-8 text-right">
          <h3 className="text-2xl font-semibold mb-3 text-[var(--color-primary)]">
            Wrapped in Grace
          </h3>
          <p className="text-[var(--color-text)] leading-relaxed text-base">
            From the ribbon to the smallest detail, each presentation is crafted to feel personal and sincere — 
            a reflection of care and timeless beauty.
          </p>
          <div className="absolute bottom-0 right-0 flex gap-2">
            <span className="h-2 w-2 bg-[var(--color-secondary)] rounded-full"></span>
            <span className="h-2 w-2 bg-[var(--color-muted)] rounded-full"></span>
            <span className="h-2 w-2 bg-[var(--color-primary)] rounded-full"></span>
          </div>
        </div>

        {/* Second image */}
        <div className="flex justify-center">
          <img
            src="/images/hampers/preview2.jpg"
            alt="Velthéa hamper arrangement"
            className="rounded-xl shadow-lg object-cover w-full max-h-[280px]"
          />
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href={ROUTES.BASE} className="btn btn-primary text-lg px-8 py-3">
          Start Creating Yours
        </Link>
      </div>
    </section>
  );
}
