import { cn } from "@/lib/utils";

/**
 * Local, dependency-free wordmark. The previous logo referenced a
 * Lovable-hosted CDN asset (`/__l5e/assets-v1/...`) that only resolves
 * inside the Lovable editor — everywhere else (local dev, any other host)
 * it 404s, so the header/footer showed a broken image. This renders
 * identically anywhere the site is deployed.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-ink-foreground", className)}>
      <svg viewBox="0 0 44 44" className="h-9 w-9 shrink-0" aria-hidden="true">
        <circle cx="22" cy="22" r="20.5" fill="none" stroke="var(--color-gold)" strokeWidth="1.25" />
        <circle cx="22" cy="22" r="16.5" fill="none" stroke="var(--color-gold)" strokeWidth="1.25" opacity="0.45" />
        <text
          x="22"
          y="29"
          textAnchor="middle"
          fontFamily="Fraunces, ui-serif, Georgia, serif"
          fontSize="17"
          fill="var(--color-gold)"
        >
          OI
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] tracking-tight">Ótica Império</span>
        <span className="mt-1 font-mono text-[0.55rem] tracking-[0.32em] text-ink-foreground/60">GLASSES</span>
      </span>
    </span>
  );
}
