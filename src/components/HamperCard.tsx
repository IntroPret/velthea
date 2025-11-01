import Image from "next/image";
import Link from "next/link";
import type { Hamper } from "@/lib/types";
import { ROUTES } from "@/lib/routes";
import { formatCurrency } from "@/utils/helpers";

export function HamperCard({ hamper }: { hamper: Hamper }) {
  const startingPrice = hamper.boxSizes[0]?.price ?? 0;
  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3]">
        <Image
          src={hamper.image}
          alt={`${hamper.name} hamper`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="font-semibold heading-section text-lg">{hamper.name}</h3>
        <p className="text-sm text-[color:var(--color-muted)]">
          {hamper.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-semibold">
            From Rp. {formatCurrency(startingPrice)}
          </span>
          <Link
            href={ROUTES.PERSONALIZE(hamper.id)}
            className="btn btn-secondary text-sm p-2 bg-[color:var(--color-primary)]"
            aria-label={`Customize ${hamper.name}`}
          >
            Customize
          </Link>
        </div>
      </div>
    </div>
  );
}