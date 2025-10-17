import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { HamperItem, BoxSize } from "@/lib/types";
import { formatCurrency } from "@/utils/helpers";

export default function CheckoutSummary({
  baseName,
  items,
  packagingName,
  message,
  boxSize,
}: {
  baseName?: string;
  items: HamperItem[];
  packagingName?: string;
  message: string;
  boxSize?: BoxSize;
}) {
  const itemsTotal = items.reduce((acc, i) => acc + i.price, 0);
  const subtotal = (boxSize?.price ?? 0) + itemsTotal;
  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[color:var(--color-muted)]">Base</div>
            <div className="font-medium">{baseName}</div>
          </div>
          <Link
            href={ROUTES.BASE}
            aria-label="Edit base"
            className="text-sm underline"
          >
            Edit
          </Link>
        </div>
      </div>

      {boxSize && (
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[color:var(--color-muted)]">
                Box Size
              </div>
              <div className="font-medium">
                {boxSize.name} ({boxSize.length}cm x {boxSize.width}cm) - Rp.{" "}
                {formatCurrency(boxSize.price)}
              </div>
            </div>
            <Link
              href={ROUTES.PERSONALIZE("classic")}
              className="text-sm underline"
              aria-label="Edit items"
            >
              Edit
            </Link>
          </div>
        </div>
      )}

      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[color:var(--color-muted)]">
              Items
            </div>
            <ul className="list-disc ml-5">
              {items.map((i) => (
                <li key={i.id}>
                  {i.name}{" "}
                  <span className="text-[color:var(--color-muted)]">
                    Rp. {formatCurrency(i.price)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={ROUTES.PERSONALIZE("classic")}
            className="text-sm underline"
            aria-label="Edit items"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[color:var(--color-muted)]">
              Packaging
            </div>
            <div className="font-medium">{packagingName ?? "—"}</div>
          </div>
          <Link
            href={ROUTES.PERSONALIZE("classic")}
            className="text-sm underline"
            aria-label="Edit packaging"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[color:var(--color-muted)]">
              Message
            </div>
            <div className="italic">{message || "—"}</div>
          </div>
          <Link
            href={ROUTES.PERSONALIZE("classic")}
            className="text-sm underline"
            aria-label="Edit message"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-[color:var(--color-muted)]">
            Subtotal
          </span>
          <span>Rp. {formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-[color:var(--color-muted)]">
            Delivery
          </span>
          <span>Rp. {formatCurrency(delivery)}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-t mt-2 border-[color:var(--color-border)]">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">Rp. {formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}