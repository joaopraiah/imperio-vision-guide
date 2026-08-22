import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Eye, Glasses, HeartHandshake, Leaf, Star } from "lucide-react";
import hero from "@/assets/hero-loja.jpg";
import atendimento from "@/assets/atendimento.jpg";
import visagismo from "@/assets/visagismo.jpg";
import { DEPOIMENTOS, DIFERENCIAIS, STORES, WHATSAPP_PRINCIPAL } from "@/lib/site-data";
import { Parallax, Reveal, RevealWords } from "@/components/site/motion-primitives";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import {
  BtnAnchor,
  BtnLink,
  GoogleRating,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/site/ui-bits";
import { StoreCard } from "@/components/site/StoreCard";
import { ClosingCta } from "@/components/site/ClosingCta";

const HERO_SLIDES = [
  { src: hero, alt: "Interior da loja Ótica Império Glasses" },
  { src: atendimento, alt: "Atendimento personalizado na Ótica Império" },
  { src: visagismo, alt: "Consultoria de visagismo na Ótica Império" },
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

const ICONS = [HeartHandshake, Eye, Glasses, Leaf];

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
        <div className="grain absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />

        <motion.div
          style={{ opacity: fade }}
          className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40 text-ink-foreground sm:px-8 md:pb-28"
        >
          <Reveal y={16}>
            <SectionLabel>Sumaré · Hortolândia</SectionLabel>
          </Reveal>
          <h1 className="mt-7 max-w-4xl text-balance text-4xl leading-[1.03] sm:text-6xl md:text-7xl">
            <RevealWords text="Enxergar bem é também" />
            <br />
            <span className="text-gold">
              <RevealWords text="se reconhecer no espelho" delay={0.25} />
            </span>
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-ink-foreground/70 sm:text-lg">
              Uma ótica premium onde a escolha do seu óculos começa por uma conversa sobre a sua
              rotina, o seu rosto e o seu estilo — e termina pessoalmente, na loja.
            </p>
          </Reveal>
          <Reveal delay={0.62}>
            <div className="mt-10 flex flex-wrap gap-3">
              <BtnAnchor href={WHATSAPP_PRINCIPAL} variant="gold">
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
              {m} <span className="text-gold">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      <Section>
        <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-center">
          <Parallax>
            <img
              src={atendimento}
              alt="Atendimento personalizado na Ótica Império"
              loading="lazy"
              className="aspect-4/5 w-full object-cover"
            />
          </Parallax>
          <div>
            <SectionHeading
              label="A Ótica"
              title="Atendimento que começa por escutar você"
              intro="Somos uma ótica premium com duas lojas físicas na região de Campinas. Antes de indicar qualquer modelo, a equipe entende a sua necessidade visual, a sua profissão e o seu dia a dia. O digital é a nossa vitrine; a experiência acontece na loja."
            />
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-3">
                <BtnLink to="/a-otica">Conhecer a ótica</BtnLink>
                <BtnLink to="/experiencia" variant="outline">
                  A experiência
                </BtnLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-secondary/40">
        <SectionHeading label="Diferenciais" title="Por que as pessoas voltam" />
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2">
          {DIFERENCIAIS.map((d, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <Reveal key={d.titulo} delay={i * 0.08}>
                <article className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-card md:p-10">
                  <Icon className="size-6 text-gold transition-transform duration-500 group-hover:-translate-y-1" />
                  <h3 className="mt-6 text-2xl">{d.titulo}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.texto}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading label="Depoimentos" title="Quem já foi atendido" align="center" />
        <Reveal delay={0.1}>
          <div className="mt-6 flex justify-center">
            <GoogleRating />
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DEPOIMENTOS.map((d, i) => (
            <Reveal key={d.autor + i} delay={i * 0.1}>
              <figure className="flex h-full flex-col border border-border bg-card p-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: d.nota }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{d.texto}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-7 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink/60">
                  {d.autor}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading label="Lojas" title="Duas unidades para receber você" />
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
