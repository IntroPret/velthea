"use client";
import CheckoutSummary from "@/components/CheckoutSummary";
import { isPersonalizationComplete, useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { state, dispatch } = useStore();
  const router = useRouter();
  const [name, setName] = useState(state.recipient?.name ?? "");
  const [address, setAddress] = useState(state.recipient?.address ?? "");
  const [date, setDate] = useState(state.recipient?.date ?? "");
  const { status } = useSession();
  const authEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";
  const isAuthenticated = useMemo(() => status === "authenticated", [status]);
  const personalizationReady = useMemo(
    () => isPersonalizationComplete(state),
    [state]
  );
  const personalizationToastShown = useRef(false);

  const minDeliveryDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }, []);

  const isDateValid = useMemo(() => {
    if (!date) return false;
    const selected = new Date(date);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selected > today;
  }, [date]);

  const valid = Boolean(name && address && isDateValid);
  const blockedByAuth = authEnabled && !isAuthenticated;

  useEffect(() => {
    if (!authEnabled) return;
    if (status === "unauthenticated") {
      router.replace(ROUTES.LOGIN);
    }
  }, [authEnabled, status, router]);

  useEffect(() => {
    if (personalizationReady) {
      personalizationToastShown.current = false;
      return;
    }
    if (personalizationToastShown.current) return;
    personalizationToastShown.current = true;
    toast.error("Please personalize a hamper before checking out.");
    router.replace(ROUTES.BASE);
  }, [personalizationReady, router]);

  const proceed = () => {
    if (blockedByAuth) {
      toast.error("Please sign in before placing an order.");
      return;
    }
    if (!valid) {
      if (!isDateValid) {
        toast.error("Select a delivery date after today.");
        return;
      }
      toast.error("Please complete all recipient details before ordering.");
      return;
    }
    toast.success("Order details saved. Redirecting to confirmation.");
    dispatch({ type: "SET_RECIPIENT", recipient: { name, address, date } });
    router.push(ROUTES.CONFIRMATION);
  };

  return (
    <div>
      <main className="mx-auto max-w-6xl px-6 py-10 grid lg:grid-cols-2 gap-10">
        <section>
          <h1 className="heading-section text-3xl mb-6">Review & Checkout</h1>
          <CheckoutSummary
            baseId={state.base?.id}
            baseName={state.base?.name}
            items={state.items}
            packagingName={state.packaging?.name}
            message={state.message}
            boxSize={state.boxSize}
            greeting={state.greeting}
            receiverName={state.receiverName}
            lidPersonalization={state.lidPersonalization}
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
                min={minDeliveryDate}
                required
              />
            </div>
            <button
              className="btn btn-primary w-full p-3"
              onClick={proceed}
              aria-disabled={!valid || blockedByAuth}
            >
              {blockedByAuth ? "Sign in to Order" : "Order"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}