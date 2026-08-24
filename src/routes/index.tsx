import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowRight, Eye, Glasses, HeartHandshake, Leaf, Recycle, Star } from "lucide-react";
import atendimento from "@/assets/atendimento.jpg";
import heroBg1 from "@/assets/hero-bg-1.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";
import sustentabilidade from "@/assets/sustentabilidade.jpg";
import { DEPOIMENTOS, DIFERENCIAIS, STORES, WHATSAPP_PRINCIPAL } from "@/lib/site-data";
import { Parallax, Reveal, RevealWords } from "@/components/site/motion-primitives";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import {
  BtnAnchor,
  BtnLink,
  GoogleRating,
  InitialsAvatar,
  Section,
  SectionHeading,
} from "@/components/site/ui-bits";
import { StoreCard } from "@/components/site/StoreCard";
import { ClosingCta } from "@/components/site/ClosingCta";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const HERO_SLIDES = [
  { type: "video" as const, src: "/videos/hero-homem-oculos.mp4", alt: "Homem usando óculos" },
  { type: "image" as const, src: heroBg2, alt: "Cliente sorrindo de óculos escuros à beira do lago" },
  { type: "image" as const, src: heroBg3, alt: "Casal usando óculos escuros" },
  { type: "image" as const, src: heroBg1, alt: "Cliente usando óculos de grau" },
  { type: "video" as const, src: "/videos/hero-cliente-oculos.mp4", alt: "Cliente experimentando óculos na loja" },
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

function TestimonialCarousel() {
  const apiRef = useRef<CarouselApi | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      const api = apiRef.current;
      if (!api) return;
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      setApi={(api) => {
        apiRef.current = api ?? null;
      }}
    >
      <CarouselContent>
        {DEPOIMENTOS.map((d, i) => (
          <CarouselItem key={d.autor + i} className="sm:basis-1/2 lg:basis-1/3">
            <figure className="flex h-full flex-col border border-border bg-card p-8">
              <div className="flex gap-0.5">
                {Array.from({ length: d.nota }).map((_, s) => (
                  <Star key={s} className="size-3.5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{d.texto}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-7">
                <InitialsAvatar name={d.autor} />
                <span className="text-[0.68rem] uppercase tracking-[0.18em] text-ink/60">
                  {d.autor}
                </span>
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-8 flex justify-center gap-3">
        <CarouselPrevious className="static size-10 translate-y-0 rounded-full border-ink/25 bg-transparent text-ink shadow-none hover:border-gold hover:bg-transparent hover:text-gold" />
        <CarouselNext className="static size-10 translate-y-0 rounded-full border-ink/25 bg-transparent text-ink shadow-none hover:border-gold hover:bg-transparent hover:text-gold" />
      </div>
    </Carousel>
  );
}

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
          <h1 className="max-w-4xl text-balance text-4xl leading-[1.03] sm:text-6xl md:text-7xl">
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
        <SectionHeading title="Por que as pessoas voltam" />
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2">
          {DIFERENCIAIS.map((d, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <Reveal key={d.titulo} delay={i * 0.08}>
                <Parallax distance={18} className="h-full">
                  <article className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-card md:p-10">
                    <span className="grid size-12 place-items-center rounded-full bg-gold/10 transition-colors duration-500 group-hover:bg-gold/20">
                      <Icon className="size-6 text-gold transition-transform duration-500 group-hover:-translate-y-1" />
                    </span>
                    <h3 className="mt-6 text-2xl">{d.titulo}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.texto}</p>
                  </article>
                </Parallax>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <Parallax>
            <img
              src={sustentabilidade}
              alt="Sacola reciclável da Ótica Império"
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
          </Parallax>
          <div>
            <Reveal>
              <Recycle className="size-7 text-gold" />
            </Reveal>
            <SectionHeading
              title="Cuidar da sua visão e do planeta"
              intro="Estamos substituindo nossas sacolas por versões recicláveis — um passo simples que faz diferença. É também um convite: separe seus óculos antigos, e quando a nossa iniciativa de descarte consciente estiver pronta, ajudamos você a dar o destino certo a eles."
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Quem já foi atendido" align="center" />
        <Reveal delay={0.1}>
          <div className="mt-6 flex justify-center">
            <GoogleRating />
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10">
            <TestimonialCarousel />
          </div>
        </Reveal>
      </Section>

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
