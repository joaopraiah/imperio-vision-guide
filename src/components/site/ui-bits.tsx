import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GOOGLE_RATING } from "@/lib/site-data";
import { FloatingRings, Reveal, RevealWords } from "./motion-primitives";

const base =
  "inline-flex items-center justify-center gap-2 rounded-none px-7 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.16em] transition-all duration-300";

const styles = {
  solid: "bg-ink text-ink-foreground hover:bg-gold hover:text-ink",
  gold: "bg-gold text-ink hover:bg-ink hover:text-ink-foreground",
  outline: "border border-ink/25 text-ink hover:border-gold hover:text-gold",
  ghostLight: "border border-ink-foreground/30 text-ink-foreground hover:border-gold hover:text-gold",
};

export type BtnVariant = keyof typeof styles;

export function BtnLink({
  to,
  children,
  variant = "solid",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
}) {
  return (
    <Link to={to} className={cn(base, styles[variant], className)}>
      {children}
    </Link>
  );
}

export function BtnAnchor({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={cn(base, styles[variant], className)}
    >
      {children}
    </a>
  );
}

export function btnClass(variant: BtnVariant = "solid", className?: string) {
  return cn(base, styles[variant], className);
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="label-mono block">{children}</span>;
}

export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
  tone = "dark",
}: {
  label?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {label ? (
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
        </Reveal>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-balance text-3xl leading-[1.1] sm:text-4xl md:text-5xl",
          tone === "light" ? "text-ink-foreground" : "text-ink",
        )}
      >
        <RevealWords text={title} />
      </h2>
      {intro ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-6 text-pretty text-base leading-relaxed sm:text-lg",
              tone === "light" ? "text-ink-foreground/70" : "text-muted-foreground",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-20 sm:px-8 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function GoogleRating({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-gold text-gold" />
        ))}
      </div>
      <span
        className={cn(
          "font-mono text-[0.72rem] tracking-[0.08em]",
          tone === "light" ? "text-ink-foreground/70" : "text-muted-foreground",
        )}
      >
        {GOOGLE_RATING.nota.toFixed(1).replace(".", ",")} · {GOOGLE_RATING.total} avaliações no Google
      </span>
    </div>
  );
}

export function PageHero({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="grain relative overflow-hidden border-b border-border bg-ink px-5 pb-20 pt-36 text-ink-foreground sm:px-8 md:pb-28 md:pt-44">
      <FloatingRings className="-right-16 -top-16 text-gold sm:right-0 sm:top-0" />
      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
        </Reveal>
        <h1 className="mt-6 max-w-4xl text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
          <RevealWords text={title} />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-ink-foreground/70 sm:text-lg">
            {intro}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
