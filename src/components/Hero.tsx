import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-white bg-gray-400">
      <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1200x800?text=Gift+Banner')] bg-cover bg-center opacity-80" />
      <div className="relative z-10 text-center">
        <h1 className="heading-hero text-4xl sm:text-5xl lg:text-6xl mb-4 text-[var(--color-text)]">
          More than a gift, <br /> a gesture of grace.
        </h1>
        <p className="text-lg italic text-[var(--color-text)]">by Velthea</p>
      </div>
    </section>
  );
}