import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { HamperItem, BoxSize, LidPersonalizationOption } from "@/lib/types";
import { formatCurrency } from "@/utils/helpers";

export default function CheckoutSummary({
  baseId,
  baseName,
  items,
  packagingName,
  message,
  boxSize,
  greeting,
  receiverName,
  lidPersonalization,
}: {
  baseId?: string;
  baseName?: string;
  items: HamperItem[];
  packagingName?: string;
  message: string;
  boxSize?: BoxSize;
  greeting: string;
  receiverName?: string;
  lidPersonalization?: LidPersonalizationOption;
}) {
  const personalizeHref = ROUTES.PERSONALIZE(baseId ?? "regular");
  const itemsTotal = items.reduce((acc, i) => acc + i.price, 0);
  const subtotal = (boxSize?.price ?? 0) + itemsTotal;
  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="text-sm text-[color:var(--color-muted)]">Base</div>
          <div className="font-medium">{baseName ?? "—"}</div>
          {boxSize ? (
            <div className="text-sm text-[color:var(--color-muted)]">
              {boxSize.name} ({boxSize.length}cm x {boxSize.width}cm x {boxSize.height}cm) · Rp. {formatCurrency(boxSize.price)}
            </div>
          ) : null}
        </div>
        <Link
          href={ROUTES.BASE}
          aria-label="Edit base"
          className="text-sm underline whitespace-nowrap"
        >
          Edit base
        </Link>
      </div>

      <div className="border-t border-[color:var(--color-border)] pt-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm text-[color:var(--color-muted)]">Decorations</div>
            <ul className="list-disc ml-5 space-y-1">
              {items.length ? (
                items.map((i) => (
                  <li key={i.id}>
                    {i.name}{" "}
                    <span className="text-[color:var(--color-muted)]">Rp. {formatCurrency(i.price)}</span>
                  </li>
                ))
              ) : (
                <li className="list-none ml-0 text-[color:var(--color-muted)]">—</li>
              )}
            </ul>
          </div>
          <Link
            href={personalizeHref}
            className="text-sm underline whitespace-nowrap"
            aria-label="Edit decorations"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)] pt-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm text-[color:var(--color-muted)]">Packaging</div>
            <div className="font-medium">{packagingName ?? "—"}</div>
          </div>
          <Link
            href={personalizeHref}
            className="text-sm underline whitespace-nowrap"
            aria-label="Edit packaging"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)] pt-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm text-[color:var(--color-muted)]">Lid Personalization</div>
            {lidPersonalization ? (
              <div className="space-y-1">
                <div className="font-medium">{lidPersonalization.title}</div>
                <div className="text-sm text-[color:var(--color-muted)]">
                  {lidPersonalization.photoCount === 0
                    ? "Message only"
                    : `${lidPersonalization.photoCount} polaroid photo${
                        lidPersonalization.photoCount > 1 ? "s" : ""
                      }`}
                </div>
                <div className="text-sm text-[color:var(--color-muted)]">
                  {lidPersonalization.minWords}-{lidPersonalization.maxWords} words
                </div>
              </div>
            ) : (
              <div className="text-sm text-[color:var(--color-muted)]">—</div>
            )}
          </div>
          <Link
            href={personalizeHref}
            className="text-sm underline whitespace-nowrap"
            aria-label="Edit lid personalization"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)] pt-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm text-[color:var(--color-muted)]">Message</div>
            <div className="italic max-w-sm">{message || "—"}</div>
          </div>
          <Link
            href={personalizeHref}
            className="text-sm underline whitespace-nowrap"
            aria-label="Edit message"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)] pt-6">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="text-sm text-[color:var(--color-muted)]">Greeting</div>
            <div className="font-medium">{greeting || "—"}</div>
            <div className="text-sm text-[color:var(--color-muted)]">Receiver</div>
            <div>{receiverName?.trim() ? receiverName : "—"}</div>
          </div>
          <Link
            href={personalizeHref}
            className="text-sm underline whitespace-nowrap"
            aria-label="Edit greeting"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)] pt-6 space-y-3">
        <div className="flex items-center justify-between text-sm text-[color:var(--color-muted)]">
          <span>Subtotal</span>
          <span className="text-base text-[color:var(--color-text)]">Rp. {formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-[color:var(--color-muted)]">
          <span>Delivery</span>
          <span className="text-base text-[color:var(--color-text)]">Rp. {formatCurrency(delivery)}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[color:var(--color-border)]">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">Rp. {formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}