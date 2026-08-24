import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import produtos from "@/assets/visagismo.jpg";
import { Parallax, Reveal } from "@/components/site/motion-primitives";
import { PageHero, Section, SectionHeading } from "@/components/site/ui-bits";
import { ClosingCta } from "@/components/site/ClosingCta";
import { MARCAS_EXCLUSIVAS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export const Route = createFileRoute("/marcas")({
  head: () => ({
    meta: [
      { title: "Marcas — Ótica Império Glasses" },
      {
        name: "description",
        content:
          "Grifes internacionais, marcas nacionais de qualidade e linhas acessíveis: variedade de armações e lentes para provar nas lojas de Sumaré e Hortolândia.",
      },
      { property: "og:title", content: "Marcas — Ótica Império Glasses" },
      {
        property: "og:description",
        content: "Do clássico ao autoral: variedade de armações para todos os estilos e orçamentos.",
      },
    ],
  }),
  component: Marcas,
});

const LINHAS = [
  {
    titulo: "Grifes internacionais",
    texto:
      "Modelos icônicos de marcas reconhecidas mundialmente, para quem procura design consagrado e acabamento impecável.",
  },
  {
    titulo: "Marcas nacionais premium",
    texto:
      "Design brasileiro com materiais nobres — acetatos, titânio e combinações leves feitas para o uso diário.",
  },
  {
    titulo: "Linhas acessíveis",
    texto:
      "Armações com ótimo custo-benefício, selecionadas pela mesma equipe e com a mesma orientação de sempre.",
  },
  {
    titulo: "Óculos de sol",
    texto:
      "Proteção UV com estilo: clássicos atemporais, modelos esportivos e peças autorais para compor o visual.",
  },
  {
    titulo: "Infantil",
    texto:
      "Armações resistentes e confortáveis, pensadas para a rotina das crianças e para a adaptação sem drama.",
  },
  {
    titulo: "Lentes e tratamentos",
    texto:
      "Multifocais, antirreflexo, filtro de luz azul, fotossensíveis e lentes de contato — indicadas conforme o seu exame.",
  },
];

function Marcas() {
  return (
    <>
      <PageHero
        label="Marcas"
        title="Variedade de verdade, do clássico ao autoral"
        intro="Trabalhamos com grifes internacionais, marcas nacionais premium e linhas acessíveis. A curadoria existe para que você tenha opções reais — e a orientação para escolher entre elas."
      />

      <section className="grid md:grid-cols-2">
        {MARCAS_EXCLUSIVAS.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: i === 0 ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "grain relative flex min-h-[34rem] flex-col justify-center overflow-hidden px-8 py-20 sm:px-14 md:min-h-[42rem]",
              m.tone === "dark" ? "bg-ink text-ink-foreground" : "bg-background text-ink",
            )}
          >
            <span
              className={cn(
                "label-mono",
                m.tone === "light" && "text-gold",
              )}
            >
              Marca exclusiva · {m.genero}
            </span>
            <h2
              className={cn(
                "mt-7 whitespace-nowrap font-display uppercase leading-none",
                m.tone === "dark"
                  ? "text-7xl tracking-[0.02em] sm:text-8xl lg:text-9xl"
                  : "text-4xl tracking-[0.15em] sm:text-5xl md:text-6xl lg:text-7xl",
              )}
            >
              {m.nome}
            </h2>
            <span
              className={cn(
                "mt-7 block h-px w-16",
                m.tone === "dark" ? "bg-gold" : "bg-gold/70",
              )}
            />
            <p
              className={cn(
                "mt-8 max-w-md text-pretty text-base leading-relaxed sm:text-lg",
                m.tone === "dark" ? "text-ink-foreground/70" : "text-muted-foreground",
              )}
            >
              {m.texto}
            </p>
          </motion.div>
        ))}
      </section>

      <Section className="border-t border-border">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <Parallax>
            <img
              src={produtos}
              alt="Armações da Ótica Império Glasses"
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
          </Parallax>
          <SectionHeading
            title="O que você encontra nas lojas"
            intro="O catálogo completo fica nas unidades: provar é parte da escolha. Fale com a equipe para saber o que temos disponível hoje."
          />
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14">
            <Carousel opts={{ align: "start", dragFree: true }}>
              <CarouselContent>
                {LINHAS.map((l, i) => (
                  <CarouselItem key={l.titulo} className="basis-[78%] sm:basis-1/2 lg:basis-1/3">
                    <article className="group flex h-full flex-col border border-border bg-card p-8 transition-colors duration-500 hover:border-gold">
                      <span className="font-mono text-[0.68rem] tracking-[0.2em] text-gold">
                        0{i + 1}
                      </span>
                      <h3 className="mt-5 text-2xl">{l.titulo}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{l.texto}</p>
                      <span className="mt-8 h-px w-10 bg-border transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </Reveal>
      </Section>

      <ClosingCta
        titulo="Prove antes de decidir"
        texto="Modelos, cores e proporções mudam completamente no rosto. Agende um horário e experimente com a orientação da nossa equipe."
      />
    </>
  );
}
