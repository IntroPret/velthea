"use client";
import React from "react";
import { itemCatalog, packagingOptions } from "@/lib/mockData";
import { useStore } from "@/lib/store";
import Stepper from "./Stepper";
import PreviewCard from "./PreviewCard";

export default function PersonalizationForm({ onContinue }: { onContinue: () => void }) {
  const { state, dispatch } = useStore();
  const steps = [
    { id: 1, label: "Select Contents" },
    { id: 2, label: "Choose Packaging" },
    { id: 3, label: "Add Message" },
  ];
  const [current, setCurrent] = React.useState(1);

  const canContinue = Boolean(state.items.length && state.packaging);

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-6">
        <Stepper steps={steps} current={current} onStepClick={setCurrent} />
        {current === 1 && (
          <section className="card p-4">
            <h3 className="heading-section text-lg mb-3">Select Contents</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {itemCatalog.map((item) => {
                const selected = state.items.some((i) => i.id === item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_ITEM", item })}
                    className={`flex items-center justify-between border rounded-[16px] px-4 py-3 text-left ${selected ? "is-selected" : "border-[color:var(--color-border)]"}`}
                    aria-pressed={selected}
                  >
                    <span>{item.name}</span>
                    <span className="text-sm text-[color:var(--color-muted)]">${item.price}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {current === 2 && (
          <section className="card p-4">
            <h3 className="heading-section text-lg mb-3">Choose Packaging</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {packagingOptions.map((p) => {
                const selected = state.packaging?.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => dispatch({ type: "SET_PACKAGING", packaging: p })}
                    className={`min-w-[140px] border rounded-[16px] p-3 text-left ${selected ? "is-selected" : "border-[color:var(--color-border)]"}`}
                    aria-pressed={selected}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block w-6 h-6 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="inline-block w-6 h-6 rounded-full border" style={{ backgroundColor: p.ribbon }} />
                    </div>
                    <div className="text-sm font-medium">{p.name}</div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {current === 3 && (
          <section className="card p-4">
            <h3 className="heading-section text-lg mb-3">Add Message</h3>
            <label className="block text-sm text-[color:var(--color-muted)] mb-2" htmlFor="msg">Your words</label>
            <textarea
              id="msg"
              className="w-full border border-[color:var(--color-border)] rounded-[16px] p-3 bg-white"
              rows={4}
              placeholder="Write a note from the heart…"
              value={state.message}
              onChange={(e) => dispatch({ type: "SET_MESSAGE", message: e.target.value })}
            />
          </section>
        )}

        <div className="flex items-center gap-3">
          {current > 1 && (
            <button className="btn btn-secondary" onClick={() => setCurrent((c) => c - 1)}>
              Back
            </button>
          )}
          {current < 3 ? (
            <button className="btn btn-primary" onClick={() => setCurrent((c) => c + 1)} disabled={current === 2 && !state.packaging} aria-disabled={current === 2 && !state.packaging}>
              Continue
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onContinue} disabled={!canContinue} aria-disabled={!canContinue}>
              Continue to Review
            </button>
          )}
        </div>
      </div>
      <PreviewCard baseName={state.base?.name} items={state.items} packaging={state.packaging} message={state.message} />
    </div>
  );
}
