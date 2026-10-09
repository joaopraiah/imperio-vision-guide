import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroBg1 from "@/assets/hero-bg-1.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";
import digitalPlusHero from "@/assets/digital-plus-hero.jpg";
import { STORES, WHATSAPP_PRINCIPAL } from "@/lib/site-data";
import { Reveal, RevealWords } from "@/components/site/motion-primitives";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { BtnAnchor, BtnLink, Section, SectionHeading } from "@/components/site/ui-bits";
import { StoreCard } from "@/components/site/StoreCard";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Billboard } from "@/components/site/Billboard";
import { GlassesForming } from "@/components/site/GlassesForming";
import { NumberedCards } from "@/components/site/NumberedCards";
import { PosterWall } from "@/components/site/PosterWall";
import { Testimonials } from "@/components/site/Testimonials";

const HERO_SLIDES = [
  {
    type: "video" as const,
    src: "/videos/hero-homem-oculos.mp4",
    poster: "/videos/hero-homem-oculos.jpg",
    alt: "Homem usando óculos",
  },
  {
    type: "image" as const,
    src: heroBg2,
    alt: "Cliente sorrindo de óculos escuros à beira do lago",
  },
  { type: "image" as const, src: heroBg3, alt: "Casal usando óculos escuros" },
  { type: "image" as const, src: heroBg1, alt: "Cliente usando óculos de grau" },
  {
    type: "video" as const,
    src: "/videos/hero-cliente-oculos.mp4",
    poster: "/videos/hero-cliente-oculos.jpg",
    alt: "Cliente experimentando óculos na loja",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ótica Império Glasses — Óculos e atendimento premium em Sumaré e Hortolândia" },
      {
        name: "description",
        content:
          "Ótica premium em Sumaré e Hortolândia. Visagismo, exame de vista com hora marcada, garantia de adaptação e atendimento humanizado. Agende a sua visita.",
      },
      { property: "og:title", content: "Ótica Império Glasses — Sumaré e Hortolândia" },
      {
        property: "og:description",
        content:
          "Vitrine digital da Ótica Império: visagismo, exame de vista agendado e atendimento que começa por uma conversa.",
      },
    ],
  }),
  component: Home,
});

const MARQUEE = [
  "Visagismo",
  "Exame com hora marcada",
  "Garantia de adaptação",
  "Manutenção de armações",
  "Atendimento humanizado",
  "Marcas premium",
];

function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <HeroSlideshow slides={HERO_SLIDES} className="absolute inset-0" />
        </motion.div>
        <div className="grain absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent" />

        <motion.div
          style={{ opacity: fade }}
          className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40 text-ink-foreground [text-shadow:0_2px_28px_rgb(0_0_0/0.5)] sm:px-8 md:pb-28"
        >
          <h1 className="max-w-4xl text-balance text-4xl font-light uppercase leading-[1.02] sm:text-6xl md:text-7xl">
            <RevealWords text="Enxergar bem é também" />
            <br />
            <span className="text-steel-soft">
              <RevealWords text="se reconhecer no espelho" delay={0.25} />
            </span>
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-ink-foreground/85 sm:text-lg">
              Uma ótica premium onde a escolha do seu óculos começa por uma conversa sobre a sua
              rotina, o seu rosto e o seu estilo — e termina pessoalmente, na loja.
            </p>
          </Reveal>
          <Reveal delay={0.62}>
            <div className="mt-10 flex flex-wrap gap-3">
              <BtnAnchor href={WHATSAPP_PRINCIPAL} variant="accent">
                Agendar atendimento
              </BtnAnchor>
              <BtnLink to="/teste-de-visao" variant="ghostLight">
                Fazer o teste de visão <ArrowRight className="size-4" />
              </BtnLink>
            </div>
          </Reveal>
        </motion.div>
      </section>

      <div className="overflow-hidden border-y border-border bg-secondary py-4">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span
              key={`${m}-${i}`}
              className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground"
            >
              {m} <span className="text-steel">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      <Billboard />

      <GlassesForming />

      <NumberedCards />

      <section className="relative overflow-hidden border-y border-border bg-dp-bg px-5 py-20 text-dp-ink sm:px-8 md:py-24">
        <div className="absolute inset-0 -z-10 opacity-45">
          <img src={digitalPlusHero} alt="" aria-hidden="true" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dp-bg via-dp-bg/90 to-dp-bg/50" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 border border-dp-blue/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-dp-blue-soft">
              Lente premium
            </span>
          </Reveal>
          <h2 className="mt-5 max-w-lg text-balance text-3xl italic leading-[1.1] sm:text-4xl md:text-5xl">
            <RevealWords text="Conheça a Digital+" />
          </h2>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-dp-ink/70 sm:text-base">
              18 camadas de antirreflexo hidrofóbico e bloqueio real de luz azul — a lente da Ótica
              Império para quem vive de olho na tela.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <BtnLink to="/digital-mais" variant="dpBlue">
                Conhecer a Digital+ <ArrowRight className="size-4" />
              </BtnLink>
            </div>
          </Reveal>
        </div>
      </section>

      <PosterWall />

      <Testimonials />

      <Section className="border-t border-border">
        <SectionHeading title="Duas unidades para receber você" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {STORES.map((s, i) => (
            <StoreCard key={s.id} store={s} delay={i * 0.1} />
          ))}
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
