import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Plus, ScanEye } from "lucide-react";
import heroImg from "@/assets/digital-plus-hero.jpg";
import lensMacro from "@/assets/digital-plus-lens-macro.jpg";
import usoTrabalho from "@/assets/digital-plus-trabalho.jpg";
import usoDirecao from "@/assets/digital-plus-direcao.jpg";
import usoStreaming from "@/assets/digital-plus-streaming.jpg";
import usoLeitura from "@/assets/digital-plus-leitura.jpg";
import { Parallax, Reveal, RevealWords } from "@/components/site/motion-primitives";
import { cn } from "@/lib/utils";
import { BtnAnchor, BtnLink } from "@/components/site/ui-bits";
import { BenefitOrbit, OrbitRing } from "@/components/site/DigitalPlusKit";
import {
  DEPOIMENTOS_VIDEO,
  DIGITAL_PLUS_BENEFICIOS,
  DIGITAL_PLUS_FAQ,
  DIGITAL_PLUS_USO,
  STORES,
  WHATSAPP_PRINCIPAL,
} from "@/lib/site-data";

export const Route = createFileRoute("/digital-mais")({
  head: () => ({
    meta: [
      { title: "Digital+ — Lentes com Bloqueador de Elite | Ótica Império Glasses" },
      {
        name: "description",
        content:
          "Digital+: a lente da Ótica Império com Bloqueador de Elite. 18 camadas de antirreflexo hidrofóbico e bloqueio real de luz azul para quem vive de olho em telas.",
      },
      { property: "og:title", content: "Digital+ — Ótica Império Glasses" },
      {
        property: "og:description",
        content:
          "18 camadas de antirreflexo hidrofóbico e bloqueio real de luz azul, numa lente quase invisível.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,460;0,9..144,600;1,9..144,420;1,9..144,520&display=swap",
      },
    ],
  }),
  component: DigitalMais,
});

const MARQUEE = [
  "Bloqueio de luz azul",
  "18 camadas de antirreflexo",
  "Tratamento hidrofóbico",
  "Alta transparência",
  "Resistência superior",
  "Tecnologia de Elite",
];

const USO_IMAGES = [usoTrabalho, usoDirecao, usoStreaming, usoLeitura];

/** Soft ambient glow — the Digital+ page's own accent, independent of the
 * site-wide FloatingRings (which is hard-coded to the gold brand color). */
function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full bg-dp-blue/25 blur-[110px]",
        className,
      )}
      aria-hidden="true"
    />
  );
}

function DigitalMais() {
  return (
    <div className="bg-dp-bg text-dp-ink">
      {/* HERO */}
      <section className="relative isolate overflow-hidden px-5 pb-24 pt-36 sm:px-8 md:pb-32 md:pt-44">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            className="size-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dp-bg via-dp-bg/75 to-dp-bg/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-dp-bg via-dp-bg/55 to-transparent" />
        </div>
        <GlowOrb className="-right-20 -top-20 size-80" />
        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 border border-dp-blue/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-dp-blue-soft">
              Tecnologia de Elite
            </span>
          </Reveal>
          <h1 className="mt-7 flex items-baseline gap-1 text-balance font-serif text-6xl italic leading-[1.02] sm:text-7xl md:text-8xl">
            <RevealWords text="Digital" />
            <span className="not-italic text-dp-blue-soft">+</span>
          </h1>
          <Reveal delay={0.14}>
            <p className="mt-4 max-w-xl text-pretty text-sm uppercase tracking-[0.22em] text-dp-blue-soft">
              Lentes com Bloqueador de Elite
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-dp-ink/70 sm:text-lg">
              A blindagem da Ótica Império para quem vive em frente a telas: 18 camadas de
              antirreflexo hidrofóbico e bloqueio real de luz azul, numa lente quase invisível.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-3">
              <BtnAnchor href={WHATSAPP_PRINCIPAL} variant="dpBlue">
                Quero a Digital+ <ArrowRight className="size-4" />
              </BtnAnchor>
              <BtnLink to="/servicos" variant="dpGhost">
                Ver outros serviços
              </BtnLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-dp-blue/15 bg-dp-bg-soft py-4">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span
              key={`${m}-${i}`}
              className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-dp-blue-soft/70"
            >
              {m} <span className="text-dp-blue">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* O PROBLEMA */}
      <section className="px-5 py-24 text-center sm:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-dp-blue-soft">
              O motivo da sua dor de cabeça
            </span>
          </Reveal>
          <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            <RevealWords text="Não é cansaço. É a luz azul da tela" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-dp-ink/65 sm:text-lg">
              Horas de notebook, celular e TV expõem os olhos a uma luz azul de alta energia que o
              olho não filtra sozinho. O resultado: fadiga visual, olhos secos, dor de cabeça no fim
              do dia e sono mais difícil à noite. A Digital+ existe para devolver conforto a quem
              vive conectado.
            </p>
          </Reveal>
        </div>
      </section>

      {/* POR QUE A DIGITAL+ — orbit */}
      <section className="border-t border-dp-blue/15 bg-dp-bg-soft/50 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-xl text-center">
            <Reveal>
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-dp-blue-soft">
                Tecnologia
              </span>
            </Reveal>
            <h2 className="mt-5 text-balance font-serif text-3xl italic leading-[1.1] sm:text-4xl">
              <RevealWords text="Por que a Digital+" />
            </h2>
          </div>
          <div className="mt-20">
            <BenefitOrbit
              items={DIGITAL_PLUS_BENEFICIOS}
              center={
                <>
                  <OrbitRing
                    text="DIGITAL+ · BLOQUEADOR DE ELITE · "
                    className="absolute inset-0 size-full"
                  />
                  <div className="absolute size-28 rounded-full bg-dp-blue/25 blur-2xl" />
                  <div className="relative grid size-24 place-items-center rounded-full border border-dp-blue/40 bg-dp-bg">
                    <ScanEye className="size-8 text-dp-blue-soft" />
                  </div>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* MACRO DA LENTE */}
      <Parallax className="h-[50vh] min-h-80 overflow-hidden">
        <img
          src={lensMacro}
          alt="Macro das camadas de antirreflexo da lente Digital+"
          loading="lazy"
          className="size-full object-cover"
        />
      </Parallax>
      <div className="border-b border-dp-blue/15 bg-dp-bg px-5 py-16 text-center sm:px-8">
        <Reveal>
          <p className="mx-auto max-w-2xl text-balance font-serif text-2xl italic leading-snug text-dp-ink/85 sm:text-3xl">
            "Dezoito camadas de blindagem. Uma lente quase invisível."
          </p>
        </Reveal>
      </div>

      {/* PARA QUEM */}
      <section className="px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-xl text-center">
            <Reveal>
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-dp-blue-soft">
                Rotina
              </span>
            </Reveal>
            <h2 className="mt-5 text-balance font-serif text-3xl italic leading-[1.1] sm:text-4xl">
              <RevealWords text="Para quem vive de olho na tela" />
            </h2>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DIGITAL_PLUS_USO.map((u, i) => (
              <Reveal key={u.titulo} delay={i * 0.08}>
                <figure className="group relative aspect-[3/4] overflow-hidden border border-dp-blue/15">
                  <img
                    src={USO_IMAGES[i]}
                    alt={u.titulo}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dp-bg via-dp-bg/15 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-serif text-lg italic text-dp-ink">{u.titulo}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-dp-ink/70">{u.texto}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTO EM VÍDEO */}
      {DEPOIMENTOS_VIDEO.length > 0 ? (
        <section className="border-t border-dp-blue/15 bg-dp-bg-soft/50 px-5 py-24 text-center sm:px-8 md:py-32">
          <Reveal>
            <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-dp-blue-soft">
              Depoimento
            </span>
          </Reveal>
          <h2 className="mt-5 text-balance font-serif text-3xl italic leading-[1.1] sm:text-4xl">
            <RevealWords text="Quem já sentiu a diferença" />
          </h2>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-14 max-w-xs">
              <video
                src={DEPOIMENTOS_VIDEO[0]!.video}
                controls
                playsInline
                preload="metadata"
                className="aspect-[9/16] w-full border border-dp-blue/25 bg-dp-bg object-cover"
              />
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="border-t border-dp-blue/15 px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Reveal>
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-dp-blue-soft">
                Dúvidas
              </span>
            </Reveal>
            <h2 className="mt-5 text-balance font-serif text-3xl italic leading-[1.1] sm:text-4xl">
              <RevealWords text="Perguntas frequentes sobre a Digital+" />
            </h2>
          </div>
          <div className="mt-14 divide-y divide-dp-blue/15 border-y border-dp-blue/15">
            {DIGITAL_PLUS_FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 font-serif text-lg italic leading-snug transition-colors group-open:text-dp-blue-soft">
                    {f.q}
                    <Plus className="size-4 shrink-0 text-dp-blue-soft transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dp-ink/65">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-t border-dp-blue/15 bg-dp-bg-soft px-5 py-24 text-center sm:px-8 md:py-32">
        <GlowOrb className="-left-20 top-1/2 size-96 -translate-y-1/2" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-balance font-serif text-3xl italic leading-[1.1] sm:text-4xl md:text-5xl">
            <RevealWords text="Seus olhos merecem essa proteção" />
          </h2>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-dp-ink/70">
              Fale com a loja mais próxima e leve a Digital+ para dentro da sua rotina.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {STORES.map((s) => (
                <BtnAnchor key={s.id} href={s.whatsapp} variant="dpBlue">
                  Falar com {s.cidade}
                </BtnAnchor>
              ))}
              <BtnLink to="/servicos" variant="dpGhost">
                Ver outros serviços
              </BtnLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
