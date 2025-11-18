import type { HamperItem, PackagingOption, BoxSize } from "@/lib/types";

export default function PreviewCard({
  baseName,
  items,
  packaging,
  message,
  boxSize,
  greeting,
  receiverName,
  withMessageCard,
}: {
  baseName?: string;
  items: HamperItem[];
  packaging?: PackagingOption;
  message: string;
  boxSize?: BoxSize;
  greeting: string;
  receiverName?: string;
  withMessageCard: boolean;
}) {
  return (
    <aside className="card p-4">
      <h3 className="heading-section text-lg mb-3">Preview</h3>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-[color:var(--color-muted)]">Base</div>
          <div className="font-medium">{baseName ?? "—"}</div>
        </div>
        {boxSize ? (
          <div>
            <div className="text-sm text-[color:var(--color-muted)]">
              Box Size
            </div>
            <div className="font-medium">
              {boxSize.name} ({boxSize.length}cm x {boxSize.width}cm)
            </div>
          </div>
        ) : null}
        <div>
          <div className="text-sm text-[color:var(--color-muted)]">
            Greeting
          </div>
          <div className="font-medium">{greeting || "—"}</div>
          <div className="text-sm text-[color:var(--color-muted)] mt-2">
            Receiver
          </div>
          <div>{receiverName?.trim() ? receiverName : "—"}</div>
        </div>
        <div>
          <div className="text-sm text-[color:var(--color-muted)]">
            Decorations
          </div>
          <ul className="list-disc">
            {items.length ? (
              items.map((i) => (
                <li className="ml-5" key={i.id}>
                  {i.name}
                </li>
              ))
            ) : (
              <li className="list-none ml-0">—</li>
            )}
          </ul>
        </div>
        <div>
          <div className="text-sm text-[color:var(--color-muted)] mb-2">
            Packaging
          </div>
          {packaging ? (
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-6 h-6 rounded-full"
                style={{ backgroundColor: packaging.color }}
                aria-label={`Box color ${packaging.name}`}
              />
              <span
                className="inline-block w-6 h-6 rounded-full border"
                style={{
                  backgroundColor: packaging.ribbon,
                  borderColor: "rgba(0,0,0,0.1)",
                }}
                aria-label={`Ribbon color ${packaging.name}`}
              />
              <span>{packaging.name}</span>
            </div>
          ) : (
            <span>—</span>
          )}
        </div>
        <div>
          <div className="text-sm text-[color:var(--color-muted)]">
            Message
          </div>
          {withMessageCard ? (
            <div className="italic">{message || "—"}</div>
          ) : (
            <div>Not included</div>
          )}
        </div>
      </div>
    </aside>
  );
}