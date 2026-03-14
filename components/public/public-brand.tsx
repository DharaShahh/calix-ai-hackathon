import Link from "next/link";
import { APP_CONFIG } from "@/lib/constants/app-config";

type PublicBrandProps = {
  href?: string;
  compact?: boolean;
};

export function PublicBrand({ href = "/", compact = false }: PublicBrandProps) {
  const content = (
    <>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-[0_10px_24px_rgba(11,42,79,0.18)]">
        {APP_CONFIG.shortName}
      </div>
      <div>
        <p className={`${compact ? "text-base" : "text-lg"} font-display text-accent`}>
          {APP_CONFIG.name}
        </p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">
          Broadband operations platform
        </p>
      </div>
    </>
  );

  return href ? (
    <Link href={href} className="flex items-center gap-3">
      {content}
    </Link>
  ) : (
    <div className="flex items-center gap-3">{content}</div>
  );
}
