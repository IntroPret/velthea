"use client";
import CheckoutSummary from "@/components/CheckoutSummary";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useState } from "react";

export default function CheckoutPage() {
  const { state, dispatch } = useStore();
  const router = useRouter();
  const [touched, setTouched] = useState(false);
  const [name, setName] = useState(state.recipient?.name ?? "");
  const [address, setAddress] = useState(state.recipient?.address ?? "");
  const [date, setDate] = useState(state.recipient?.date ?? "");

  const valid = Boolean(name && address && date);

  const proceed = () => {
    setTouched(true);
    if (!valid) return;
    dispatch({ type: "SET_RECIPIENT", recipient: { name, address, date } });
    router.push(ROUTES.CONFIRMATION);
  };

  return (
    <div>
      <main className="mx-auto max-w-6xl px-6 py-10 grid lg:grid-cols-2 gap-10">
        <section>
          <h1 className="heading-section text-3xl mb-6">Review & Checkout</h1>
          <CheckoutSummary
            baseName={state.base?.name}
            items={state.items}
            packagingName={state.packaging?.name}
            message={state.message}
            boxSize={state.boxSize}
          />
        </section>

        <section className="card p-4 h-fit">
          <h2 className="heading-section text-xl mb-4">Recipient Details</h2>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm text-[color:var(--color-muted)] mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                className="w-full border border-[color:var(--color-border)] rounded-[16px] p-3 bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {touched && !name && (
                <p className="text-sm text-red-600 mt-1">Required</p>
              )}
            </div>
            <div>
              <label
                className="block text-sm text-[color:var(--color-muted)] mb-1"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                id="address"
                rows={3}
                className="w-full border border-[color:var(--color-border)] rounded-[16px] p-3 bg-white"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              {touched && !address && (
                <p className="text-sm text-red-600 mt-1">Required</p>
              )}
            </div>
            <div>
              <label
                className="block text-sm text-[color:var(--color-muted)] mb-1"
                htmlFor="date"
              >
                Delivery Date
              </label>
              <input
                id="date"
                type="date"
                className="w-full border border-[color:var(--color-border)] rounded-[16px] p-3 bg-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              {touched && !date && (
                <p className="text-sm text-red-600 mt-1">Required</p>
              )}
            </div>
            <button
              className="btn btn-primary w-full"
              onClick={proceed}
              aria-disabled={!valid}
              disabled={!valid}
            >
              Proceed to Payment
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}