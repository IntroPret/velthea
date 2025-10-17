import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function ContentGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 my-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* First image */}
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/300x200?text=Gift+Box+1"
            alt="Gift Box 1"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* First text — left aligned on mobile */}
        <div className="max-w-prose relative pb-8 text-left">
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec ornare metus. Morbi ultrices congue lacus, quis accumsan nunc
            scelerisque sit amet.
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="h-2 w-2 bg-[var(--color-primary)] rounded-full"></span>
            <span className="h-2 w-2 bg-[var(--color-muted)] rounded-full"></span>
            <span className="h-2 w-2 bg-[var(--color-secondary)] rounded-full"></span>
          </div>
        </div>

        {/* Second text — right aligned on mobile */}
        <div className="max-w-prose relative pb-8 text-right">
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec ornare metus. Morbi ultrices congue lacus, quis accumsan nunc
            scelerisque sit amet.
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="h-2 w-2 bg-[var(--color-primary)] rounded-full"></span>
            <span className="h-2 w-2 bg-[var(--color-muted)] rounded-full"></span>
            <span className="h-2 w-2 bg-[var(--color-secondary)] rounded-full"></span>
          </div>
        </div>

        {/* Second image */}
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/300x200?text=Gift+Box+2"
            alt="Gift Box 2"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href={ROUTES.BASE} className="btn btn-primary text-lg px-8 py-3">
          Get Yours
        </Link>
      </div>
    </section>
  );
}
