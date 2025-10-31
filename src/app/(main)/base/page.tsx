import { hampers } from "@/lib/mockData";
import { HamperCard } from "@/components/HamperCard";

export default function BasePage() {
  return (
    <div>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="heading-section text-3xl mb-6">Pick Hamper Base</h1>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {hampers.map((h) => (
                <div key={h.id} className="snap-center w-4/5 flex-shrink-0 sm:w-auto">
                    <HamperCard hamper={h} />
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
