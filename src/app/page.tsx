import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HamperGrid from "@/components/HamperGrid";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <HamperGrid />
      </main>
      <Footer />
    </div>
  );
}
