"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalizationForm from "@/components/PersonalizationForm";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { hampers } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function PersonalizeClient({ id }: { id: string }) {
  const { state, dispatch } = useStore();
  const router = useRouter();

  useEffect(() => {
    const base = hampers.find((h) => h.id === id);
    if (base) dispatch({ type: "SET_BASE", base });
  }, [id, dispatch]);

  return (
    <div>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="heading-section text-3xl mb-6">Personalize your {state.base?.name} hamper</h1>
        <PersonalizationForm onContinue={() => router.push(ROUTES.CHECKOUT)} />
      </main>
    </div>
  );
}
