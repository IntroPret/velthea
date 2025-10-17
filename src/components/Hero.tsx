import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function Hero() {
  return (
    <section className="relative min-h-[120vh] flex items-center justify-center text-white bg-[var(--color-background)]">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/hampers/hero.jpg')] bg-top bg-cover opacity-60" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[var(--color-background)]" />

      {/* Hero Content */}
      <div className="relative  z-10 text-center -mt-24">
        <h1 className="heading-hero text-4xl sm:text-5xl lg:text-6xl mb-4 text-[var(--color-text)]">
          More than a gift, <br /> a gesture of grace.
        </h1>
        <p className="text-lg italic text-[var(--color-text)]">
            by Velthea
        </p>
      </div>
    </section>
  );
}
