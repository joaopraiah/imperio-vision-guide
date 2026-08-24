import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Eye, Moon, ShieldCheck, Sparkles } from "lucide-react";
import lojaDisplay from "@/assets/hero-loja.jpg";
import { FloatingRings, Parallax, Reveal, RevealWords } from "@/components/site/motion-primitives";
import { BtnAnchor, PageHero, Section, SectionHeading } from "@/components/site/ui-bits";
import { ClosingCta } from "@/components/site/ClosingCta";
import { SERVICOS, WHATSAPP_PRINCIPAL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const BENTO_SPANS = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-2",
];

const DIGITAL_MAIS_BENEFICIOS = [
  {
    titulo: "Filtro de luz azul",
    texto: "Reduz a luz HEV emitida por telas, aliviando o cansaço visual do uso prolongado.",
    icon: Eye,
  },
  {
    titulo: "Antirreflexo premium",
    texto: "Elimina o reflexo da tela, reduzindo o esforço de foco ao longo do dia.",
    icon: Sparkles,
  },
  {
    titulo: "Alta transparência",
    texto: "Mantém a aparência natural da lente, sem o amarelado comum em filtros de luz azul.",
    icon: ShieldCheck,
  },
  {
    titulo: "Sono mais tranquilo",
    texto: "Menos supressão de melatonina à noite, ajudando a preservar a qualidade do sono.",
    icon: Moon,
  },
];

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Ótica Império Glasses" },
      {
        name: "description",
        content:
          "Manutenção de armações, consultoria de visagismo, exame de vista com hora marcada, orientação sobre lentes e garantia de adaptação.",
      },
      { property: "og:title", content: "Serviços — Ótica Império Glasses" },
      {
        property: "og:description",
        content: "Tudo o que fazemos além de vender óculos: reparo, visagismo, exame e acompanhamento.",
      },
    ],
  }),
  component: Servicos,
});

function Servicos() {
  return (
    <>
      <PageHero
        label="Serviços"
        title="Muito além de vender óculos"
        intro="Do reparo da sua armação atual ao acompanhamento depois da entrega: os serviços existem para que a sua experiência não termine na compra."
      />

      <Parallax className="h-[45vh] min-h-80 overflow-hidden">
        <img
          src={lojaDisplay}
          alt="Prateleira de armações na Ótica Império Glasses"
          loading="lazy"
          className="size-full object-cover"
        />
      </Parallax>

      <Section>
        <SectionHeading title="Serviços das duas unidades" />
        <div className="mt-14 grid gap-4 md:auto-rows-[180px] md:grid-cols-4">
          {SERVICOS.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 0.06} className={BENTO_SPANS[i % BENTO_SPANS.length]!}>
              <article
                className={cn(
                  "flex h-full flex-col justify-center border p-8 transition-colors duration-500 md:p-10",
                  s.destaque
                    ? "grain border-transparent bg-ink text-ink-foreground"
                    : "border-border bg-card hover:border-gold",
                )}
              >
                {s.destaque ? <span className="label-mono">Destaque</span> : null}
                <h3 className={cn("text-2xl", s.destaque && "mt-4")}>{s.titulo}</h3>
                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed",
                    s.destaque ? "text-ink-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {s.texto}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="grain relative overflow-hidden border-t border-border bg-ink text-ink-foreground">
        <FloatingRings className="-right-20 top-10 text-gold sm:right-0" />
        <div className="relative grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <span className="label-mono">Lentes Digital+</span>
            </Reveal>
            <h2 className="mt-5 max-w-lg text-balance text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
              <RevealWords text="O cansaço das 2h da tarde vai embora" />
            </h2>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-lg text-pretty leading-relaxed text-ink-foreground/70">
                Lentes com filtro de luz azul e antirreflexo premium, pensadas para quem passa horas
                em frente a telas. Mais foco durante o dia, menos fadiga visual e sono mais tranquilo
                à noite — com a transparência de uma lente comum, sem o amarelado.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-3">
                <BtnAnchor href="https://digitalmais.oticaimperio.com.br/" variant="gold">
                  Conhecer a Digital+
                </BtnAnchor>
                <BtnAnchor href={WHATSAPP_PRINCIPAL} variant="ghostLight">
                  Falar no WhatsApp
                </BtnAnchor>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden bg-ink-foreground/10 sm:grid-cols-2">
            {DIGITAL_MAIS_BENEFICIOS.map((b, i) => (
              <Reveal key={b.titulo} delay={0.1 + i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="h-full bg-ink p-7"
                >
                  <b.icon className="size-5 text-gold" />
                  <h3 className="mt-4 text-lg">{b.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-foreground/60">{b.texto}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <ClosingCta
        titulo="Precisa de um reparo ou de uma orientação?"
        texto="Leve a sua armação até uma das unidades ou mande uma mensagem: a equipe avalia e explica o que é possível fazer."
      />
    </>
  );
}
