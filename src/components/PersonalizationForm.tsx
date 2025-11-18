"use client";
import React from "react";
import { itemCatalog, packagingOptions } from "@/lib/mockData";
import { useStore } from "@/lib/store";
import Stepper from "./Stepper";
import PreviewCard from "./PreviewCard";
import { formatCurrency } from "@/utils/helpers";
import { PackagingOption } from "@/lib/types";
import { toast } from "react-hot-toast";

type CatalogItem = (typeof itemCatalog)[number];
const greetingOptions = [
  "Best Wishes",
  "Warm Regards",
  "With Love",
  "Merry Christmas",
  "Happy New Year",
];

export default function PersonalizationForm({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const { state, dispatch } = useStore();
  const [customGreeting, setCustomGreeting] = React.useState("");
  const steps = [
    { id: 1, label: "Select Box Size" },
    { id: 2, label: "Select Greeting" },
    { id: 3, label: "Select Decorations" },
    { id: 4, label: "Choose Packaging" },
    { id: 5, label: "Add Message" },
  ];
  const primarySteps = steps.slice(0, 3);
  const secondarySteps = steps.slice(3);
  const [current, setCurrent] = React.useState(1);

  const canContinue = state.withContents
    ? Boolean(state.items.length && state.packaging)
    : Boolean(state.packaging);

  React.useEffect(() => {
    if (!greetingOptions.includes(state.greeting)) {
      setCustomGreeting(state.greeting);
    } else {
      setCustomGreeting("");
    }
  }, [state.greeting]);

  const handleToggleItem = (item: CatalogItem) => {
    const isAdding = !state.items.some((i) => i.id === item.id);
    if (
      isAdding &&
      state.boxSize &&
      state.items.length >= state.boxSize.itemLimit
    ) {
      toast.error(
        `You can only select up to ${state.boxSize.itemLimit} items for this box size.`
      );
    } else {
      dispatch({ type: "TOGGLE_ITEM", item });
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <Stepper steps={primarySteps} current={current} onStepClick={setCurrent} />
          {secondarySteps.length > 0 ? (
            <Stepper steps={secondarySteps} current={current} onStepClick={setCurrent} />
          ) : null}
        </div>
        {current === 1 && (
          <section className="card p-4">
            <h3 className="heading-section text-lg mb-3">Select Box Size</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {state.base?.boxSizes.map((size) => {
                const selected = state.boxSize?.id === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_BOX_SIZE", boxSize: size })
                    }
                    className={`flex flex-col items-start border rounded-[16px] px-4 py-3 text-left ${
                      selected
                        ? "is-selected"
                        : "border-[color:var(--color-border)]"
                    }`}
                    aria-pressed={selected}
                  >
                    <span className="font-medium">{size.name}</span>
                    <span className="text-sm text-[color:var(--color-muted)]">
                      {size.length}cm x {size.width}cm
                    </span>
                    <span className="text-sm text-[color:var(--color-muted)]">
                      Up to {size.itemLimit} items
                    </span>
                    <span className="font-medium mt-2">
                      Rp. {formatCurrency(size.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}
        {current === 2 && (
          <section className="card p-4">
            <h3 className="heading-section text-lg mb-3">Select Greeting</h3>
            <p className="text-sm text-[color:var(--color-muted)] mb-4">
              Choose a short greeting for the hamper sleeve. Receiver name is optional.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {greetingOptions.map((greeting) => {
                const selected = state.greeting === greeting;
                return (
                  <button
                    key={greeting}
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_GREETING", greeting })
                    }
                    className={`border rounded-[16px] px-4 py-3 text-left ${
                      selected
                        ? "is-selected"
                        : "border-[color:var(--color-border)]"
                    }`}
                    aria-pressed={selected}
                  >
                    <span className="font-medium">{greeting}</span>
                  </button>
                );
              })}
            </div>
            <label
              className="block text-sm text-[color:var(--color-muted)] mb-2"
              htmlFor="receiverName"
            >
              Receiver name (optional)
            </label>
            <input
              id="receiverName"
              type="text"
              placeholder="e.g. Kevin"
              value={state.receiverName ?? ""}
              onChange={(event) =>
                dispatch({
                  type: "SET_RECEIVER_NAME",
                  receiverName: event.target.value,
                })
              }
              className="w-full border border-[color:var(--color-border)] rounded-[16px] px-3 py-2 bg-white"
            />
            <label
              className="block text-sm text-[color:var(--color-muted)] mt-4 mb-2"
              htmlFor="customGreeting"
            >
              Or write your own (preferably two words)
            </label>
            <input
              id="customGreeting"
              type="text"
              placeholder="e.g. Joy & Love"
              value={customGreeting}
              onChange={(event) => {
                const value = event.target.value;
                setCustomGreeting(value);
                dispatch({ type: "SET_GREETING", greeting: value });
              }}
              className="w-full border border-[color:var(--color-border)] rounded-[16px] px-3 py-2 bg-white"
            />
          </section>
        )}
        {current === 3 && (
          <section className="card p-4">
            <h3 className="heading-section text-lg mb-3">Select Decorations</h3>
            <div className="flex items-center mb-4 space-x-4">
              <div>
                <input
                  type="radio"
                  id="withContents"
                  name="contentsOption"
                  className="mr-2 accent-[var(--color-primary)]"
                  checked={state.withContents}
                  onChange={() =>
                    dispatch({ type: "SET_WITH_CONTENTS", withContents: true })
                  }
                />
                <label className="text-sm" htmlFor="withContents">
                  Include Decorations
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="withoutContents"
                  name="contentsOption"
                  className="mr-2 accent-[var(--color-primary)]"
                  checked={!state.withContents}
                  onChange={() =>
                    dispatch({ type: "SET_WITH_CONTENTS", withContents: false })
                  }
                />
                <label className="text-sm" htmlFor="withoutContents">
                  Decorations not needed
                </label>
              </div>
            </div>
            {state.withContents && (
              <div className="grid sm:grid-cols-2 gap-3">
                {itemCatalog.map((item: CatalogItem) => {
                  const selected = state.items.some((i) => i.id === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleToggleItem(item)}
                      className={`flex items-center justify-between border rounded-[16px] px-4 py-3 text-left ${
                        selected
                          ? "is-selected"
                          : "border-[color:var(--color-border)]"
                      }`}
                      aria-pressed={selected}
                    >
                      <span>{item.name}</span>
                      <span className="text-sm text-[color:var(--color-muted)]">
                        Rp. {formatCurrency(item.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {current === 4 && (
          <section className="card p-4">
            <h3 className="heading-section text-lg mb-3">Choose Packaging</h3>
            <div className="flex gap-3 overflow-x-auto p-2">
              {packagingOptions.map((p: PackagingOption) => {
                const selected = state.packaging?.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_PACKAGING", packaging: p })
                    }
                    className={`min-w-[140px] border rounded-[16px] p-3 text-left ${
                      selected
                        ? "is-selected"
                        : "border-[color:var(--color-border)]"
                    }`}
                    aria-pressed={selected}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="inline-block w-6 h-6 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                      <span
                        className="inline-block w-6 h-6 rounded-full border"
                        style={{ backgroundColor: p.ribbon }}
                      />
                    </div>
                    <div className="text-sm font-medium">{p.name}</div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {current === 5 && (
          <section className="card p-4">
            <h3 className="heading-section text-lg mb-3">Add Message (Optional)</h3>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="withMessageCard"
                className="mr-2 accent-[var(--color-primary)]"
                checked={state.withMessageCard}
                onChange={() =>
                  dispatch({ type: "TOGGLE_WITH_MESSAGE_CARD" })
                }
              />
              <label
                className="text-sm text-[color:var(--color-muted)]"
                htmlFor="withMessageCard"
              >
                Include a message card
              </label>
            </div>
            {state.withMessageCard && (
              <>
                <label
                  className="block text-sm text-[color:var(--color-muted)] mb-2"
                  htmlFor="msg"
                >
                  Your words
                </label>
                <textarea
                  id="msg"
                  className="w-full border border-[color:var(--color-border)] rounded-[16px] p-3 bg-white"
                  rows={4}
                  placeholder="Write a note from the heart…"
                  value={state.message}
                  onChange={(e) =>
                    dispatch({ type: "SET_MESSAGE", message: e.target.value })
                  }
                />
              </>
            )}
          </section>
        )}

        <div className="flex items-center gap-3">
          {current > 1 && (
            <button
              className="btn btn-secondary py-3 px-5"
              onClick={() => setCurrent((c) => c - 1)}
            >
              Back
            </button>
          )}
          {current < 5 ? (
            <button
              className="btn btn-primary py-3 px-5"
              onClick={() => setCurrent((c) => c + 1)}
              disabled={current === 4 && !state.packaging}
              aria-disabled={current === 4 && !state.packaging}
            >
              Continue
            </button>
          ) : (
            <button
              className="btn btn-primary py-3 px-5"
              onClick={onContinue}
              disabled={!canContinue}
              aria-disabled={!canContinue}
            >
              Continue to Review
            </button>
          )}
        </div>
      </div>
      <PreviewCard
        baseName={state.base?.name}
        items={state.items}
        packaging={state.packaging}
        message={state.message}
        boxSize={state.boxSize}
        greeting={state.greeting}
        receiverName={state.receiverName}
        withMessageCard={state.withMessageCard}
      />
    </div>
  );
}