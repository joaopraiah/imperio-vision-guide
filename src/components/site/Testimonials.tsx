import { AnimatePresence, m as motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Play, Quote, Star } from "lucide-react";
import { DEPOIMENTOS, DEPOIMENTOS_VIDEO, GOOGLE_RATING } from "@/lib/site-data";
import { InitialsAvatar } from "./ui-bits";
import { Reveal, RevealWords } from "./motion-primitives";

const ROTATE_MS = 6500;

function Stars({ className = "size-3.5" }: { className?: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </div>
  );
}

/** Depoimento em vídeo dentro de um "celular", com capa e play próprios. */
function PhoneVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const v = DEPOIMENTOS_VIDEO[0];
  if (!v) return null;

  return (
    <div className="relative mx-auto w-full max-w-[17rem] rounded-[2.6rem] border-[9px] border-ink bg-ink shadow-[0_50px_90px_-40px_rgba(0,0,0,0.55)]">
      <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-ink">
        <video
          ref={ref}
          src={v.video}
          playsInline
          preload="none"
          controls={playing}
          onPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          className="size-full object-cover"
        />
        {!playing ? (
          <button
            type="button"
            onClick={() => ref.current?.play()}
            className="group absolute inset-0 isolate flex flex-col justify-between bg-gradient-to-t from-black/70 via-transparent to-black/30 p-5 text-left text-white"
            aria-label="Assistir depoimento em vídeo"
          >
            {/* capa como <img lazy>: o atributo poster do vídeo baixaria já no carregamento */}
            <img
              src={v.video.replace(".mp4", ".webp")}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-10 size-full object-cover"
            />
            <span className="flex justify-between text-[0.65rem] font-medium">
              <span>9:41</span>
              <span>●●●</span>
            </span>
            <span className="grid size-16 place-self-center place-items-center rounded-full bg-white/90 text-ink transition-transform duration-500 group-hover:scale-110">
              <Play className="ml-1 size-6 fill-current" />
            </span>
            <span>
              <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/70">
                Depoimento real · loja
              </span>
              <span className="mt-1 block text-lg font-light leading-tight">
                Veja como foi a experiência de quem passou pela loja.
              </span>
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}

/** Citação em destaque que troca sozinha, com barras de progresso (estilo stories). */
function FeaturedQuote() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const d = DEPOIMENTOS[i]!;

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % DEPOIMENTOS.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [i, paused]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex gap-1.5">
        {DEPOIMENTOS.map((x, n) => (
          <button
            key={x.autor + n}
            type="button"
            onClick={() => setI(n)}
            aria-label={`Ver depoimento de ${x.autor}`}
            className="h-6 flex-1 py-2.5"
          >
            <span className="block h-px w-full overflow-hidden bg-ink/15">
              {n === i ? (
                <motion.span
                  key={`${i}-${paused}`}
                  className="block h-px origin-left bg-ink"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0.5 : 1 }}
                  transition={{ duration: paused ? 0.3 : ROTATE_MS / 1000, ease: "linear" }}
                />
              ) : (
                <span className={`block h-px bg-ink ${n < i ? "w-full" : "w-0"}`} />
              )}
            </span>
          </button>
        ))}
      </div>
      <Quote className="mt-8 size-8 text-steel" />
      <div className="relative mt-4 min-h-[9rem] sm:min-h-[8rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-balance text-2xl font-light leading-snug tracking-[-0.01em] text-ink sm:text-3xl">
              {d.texto}
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <InitialsAvatar name={d.autor} className="text-ink-foreground" />
              <span>
                <span className="block text-sm text-ink">{d.autor}</span>
                <span className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-forest">
                  <Stars className="size-3 text-ink" /> Google
                </span>
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ReviewChip({ texto, autor }: { texto: string; autor: string }) {
  return (
    <figure className="w-80 shrink-0 border border-border bg-card p-6">
      <Stars className="size-3 text-ink" />
      <blockquote className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/75">
        {texto}
      </blockquote>
      <figcaption className="mt-4 text-[0.65rem] uppercase tracking-[0.18em] text-forest">
        {autor}
      </figcaption>
    </figure>
  );
}

/** Faixa infinita em CSS (só transform) — pausa ao passar o mouse. */
function ReviewRow({ reverse = false, offset = 0 }: { reverse?: boolean; offset?: number }) {
  const items = [...DEPOIMENTOS.slice(offset), ...DEPOIMENTOS.slice(0, offset)];
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="animate-marquee flex w-max gap-4 pr-4 group-hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: "60s" }}
      >
        {[...items, ...items].map((d, n) => (
          <ReviewChip key={d.autor + n} texto={d.texto} autor={d.autor} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const nota = GOOGLE_RATING.nota.toFixed(1).replace(".", ",");
  return (
    <section className="cv-auto overflow-hidden border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <PhoneVideo />
        </Reveal>
        <div>
          <span className="text-[0.68rem] uppercase tracking-[0.22em] text-forest">
            Depoimentos
          </span>
          <h2 className="mt-4 text-balance text-3xl font-light uppercase leading-[1.05] text-ink sm:text-4xl md:text-5xl">
            <RevealWords text="Quem já foi atendido conta." />
          </h2>
          <Reveal delay={0.1}>
            <div className="mt-8 flex items-end gap-5 border-y border-border py-6">
              <span className="font-display text-7xl font-extralight leading-none tracking-[-0.04em] text-ink sm:text-8xl">
                {nota}
              </span>
              <span className="pb-2">
                <Stars className="size-4 text-ink" />
                <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.16em] text-forest">
                  {GOOGLE_RATING.total} avaliações no Google
                </span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.18} className="mt-10">
            <FeaturedQuote />
          </Reveal>
        </div>
      </div>
      <div className="mt-20 grid gap-4">
        <ReviewRow />
        <ReviewRow reverse offset={4} />
      </div>
    </section>
  );
}
