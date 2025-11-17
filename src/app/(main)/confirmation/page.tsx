"use client";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function ConfirmationPage() {
  const { state } = useStore();
  const orderNumber = Math.floor(Math.random() * 900000 + 100000);
  return (
    <div>
      <main className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="heading-hero text-4xl mb-4">Your gesture of grace is on its way.</h1>
        <p className="text-[color:var(--color-muted)] mb-8">Thank you for trusting Velthéa.</p>
        <div className="card p-6 inline-block text-left">
          <div className="font-medium mb-2">Order #{orderNumber}</div>
          <div className="text-sm text-[color:var(--color-muted)]">Estimated delivery: {state.recipient?.date || "—"}</div>
        </div>
        <div className="mt-8">
          <Link href={ROUTES.HOME} className="btn btn-primary py-2 px-3 shadow-md">Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
