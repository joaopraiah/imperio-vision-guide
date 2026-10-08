import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion-primitives";

/**
 * Circular text ribbon that spins slowly in place — the Digital+ equivalent
 * of the dashed "orbit" motif used across the reference layout. Pass a
 * trailing separator in `text` (e.g. "DIGITAL+ · ") so the loop reads cleanly
 * as it wraps back to the start.
 */
export function OrbitRing({
  text,
  size = 240,
  duration = 32,
  className,
}: {
  text: string;
  size?: number;
  duration?: number;
  className?: string;
}) {
  const rawId = useId().replace(/:/g, "");
  const radius = size / 2 - 15;
  const c = size / 2;
  const d = `M ${c},${c} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn("animate-orbit text-dp-blue-soft/55", className)}
      style={{ animationDuration: `${duration}s` }}
      aria-hidden="true"
    >
      <defs>
        <path id={rawId} d={d} />
      </defs>
      <text className="fill-current font-mono text-[9px] uppercase tracking-[0.35em]">
        <textPath href={`#${rawId}`}>{text}</textPath>
      </text>
    </svg>
  );
}

/** Dashed, tilted ellipses behind a central orb — a quiet "atom" backdrop. */
export function OrbitBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      <div
        className="absolute inset-0 rounded-full border border-dashed border-dp-blue/25"
        style={{ transform: "rotate(18deg) scaleY(0.6)" }}
      />
      <div
        className="absolute inset-0 rounded-full border border-dashed border-dp-blue/15"
        style={{ transform: "rotate(-26deg) scaleY(0.6)" }}
      />
      <div
        className="absolute inset-0 rounded-full border border-dp-blue/10"
        style={{ transform: "rotate(72deg) scaleY(0.6)" }}
      />
    </div>
  );
}

function BenefitNode({
  titulo,
  texto,
  align,
  delay,
}: {
  titulo: string;
  texto: string;
  align: "left" | "right";
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "lg:max-w-xs",
        align === "right" ? "lg:ml-auto lg:text-right" : "lg:mr-auto lg:text-left",
      )}
    >
      <h3 className="font-serif text-lg italic text-dp-ink">{titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-dp-ink/60">{texto}</p>
    </Reveal>
  );
}

/**
 * Four benefit callouts orbiting a central visual — homage to the reference
 * layout's hub-and-spoke "why us" diagram, rebuilt with a resilient grid
 * instead of hand-placed coordinates so it reflows cleanly at every width.
 */
export function BenefitOrbit({
  items,
  center,
}: {
  items: readonly { titulo: string; texto: string }[];
  center: ReactNode;
}) {
  const [a, b, c, d] = items;
  if (!a || !b || !c || !d) return null;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
        <BenefitNode {...a} align="right" delay={0} />
        <BenefitNode {...c} align="right" delay={0.1} />
      </div>
      <div className="relative mx-auto grid size-56 shrink-0 place-items-center sm:size-64">
        {center}
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
        <BenefitNode {...b} align="left" delay={0.05} />
        <BenefitNode {...d} align="left" delay={0.15} />
      </div>
    </div>
  );
}
