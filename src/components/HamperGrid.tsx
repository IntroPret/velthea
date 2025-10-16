import { hampers } from "@/lib/mockData";
import { HamperCard } from "./HamperCard";

export default function HamperGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 my-12">
      <h2 className="heading-section text-2xl mb-6">Featured Hampers</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hampers.map((h) => (
          <HamperCard key={h.id} hamper={h} />
        ))}
      </div>
    </section>
  );
}
