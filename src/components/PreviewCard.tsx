import type { HamperItem, PackagingOption } from "@/lib/mockData";

export default function PreviewCard({
  baseName,
  items,
  packaging,
  message,
}: {
  baseName?: string;
  items: HamperItem[];
  packaging?: PackagingOption;
  message: string;
}) {
  return (
    <aside className="card p-4">
      <h3 className="heading-section text-lg mb-3">Live Preview</h3>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-[color:var(--color-muted)]">Base</div>
          <div className="font-medium">{baseName ?? "—"}</div>
        </div>
        <div>
          <div className="text-sm text-[color:var(--color-muted)]">Items</div>
          <ul className="list-disc ml-5">
            {items.length ? items.map((i) => (<li key={i.id}>{i.name}</li>)) : <li className="list-none ml-0">—</li>}
          </ul>
        </div>
        <div>
          <div className="text-sm text-[color:var(--color-muted)] mb-2">Packaging</div>
          {packaging ? (
            <div className="flex items-center gap-2">
              <span className="inline-block w-6 h-6 rounded-full" style={{ backgroundColor: packaging.color }} aria-label={`Box color ${packaging.name}`} />
              <span className="inline-block w-6 h-6 rounded-full border" style={{ backgroundColor: packaging.ribbon, borderColor: "rgba(0,0,0,0.1)" }} aria-label={`Ribbon color ${packaging.name}`} />
              <span>{packaging.name}</span>
            </div>
          ) : (
            <span>—</span>
          )}
        </div>
        <div>
          <div className="text-sm text-[color:var(--color-muted)]">Message</div>
          <div className="italic">{message || "—"}</div>
        </div>
      </div>
    </aside>
  );
}
