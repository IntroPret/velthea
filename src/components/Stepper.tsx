"use client";
type Step = { id: number; label: string };

export default function Stepper({ steps, current, onStepClick }: { steps: Step[]; current: number; onStepClick?: (id: number) => void }) {
  return (
    <ol className="flex lg:flex-row flex-col gap-2 lg:gap-6" aria-label="Personalization steps">
      {steps.map((s, idx) => {
        const active = s.id === current;
        return (
          <li key={s.id} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onStepClick?.(s.id)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${active ? "is-selected" : "border-[color:var(--color-border)]"}`}
              aria-current={active ? "step" : undefined}
            >
              <span className={`w-6 h-6 shrink-0 rounded-full grid place-items-center text-xs ${active ? "bg-[color:var(--color-primary)] text-white" : "bg-white border border-[color:var(--color-border)]"}`}>
                {idx + 1}
              </span>
              <span className="text-sm">{s.label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
