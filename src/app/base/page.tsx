import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { hampers } from "@/lib/mockData";
import { HamperCard } from "@/components/HamperCard";

export default function BasePage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="heading-section text-3xl mb-6">Pick Hamper Base</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hampers.map((h) => (
            <HamperCard key={h.id} hamper={h} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
