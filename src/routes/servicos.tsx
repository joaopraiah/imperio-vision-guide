import { createFileRoute } from "@tanstack/react-router";
import lojaDisplay from "@/assets/hero-loja.jpg";
import digitalMaisLente from "@/assets/digital-mais-lente.jpg";
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
        <div className="mt-14 grid gap-4 md:auto-rows-[minmax(11.5rem,auto)] md:grid-cols-4">
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

      <section className="grain relative overflow-hidden border-t border-border bg-ink text-ink-foreground">
        <FloatingRings className="-right-20 top-10 text-gold sm:right-0" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <span className="label-mono">Lentes Digital+</span>
            </Reveal>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              <RevealWords text="O cansaço das 2h da tarde vai embora" />
            </h2>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
                Lentes com bloqueio de luz azul, antirreflexo premium, alta transparência e
                resistência superior — pensadas para quem passa horas em frente a telas. Mais foco
                durante o dia e sono mais tranquilo à noite.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-3">
                <BtnAnchor href="https://digitalmais.oticaimperio.com.br/" variant="gold">
                  Conhecer a Digital+
                </BtnAnchor>
                <BtnAnchor href={WHATSAPP_PRINCIPAL} variant="ghostLight">
                  Falar no WhatsApp
                </BtnAnchor>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="overflow-hidden border border-ink-foreground/10 shadow-2xl shadow-black/40">
              <img
                src={digitalMaisLente}
                alt="Lentes Digital+ da Ótica Império Glasses — bloqueio de luz azul, antirreflexo premium, alta transparência e resistência superior"
                loading="lazy"
                className="w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCta
        titulo="Precisa de um reparo ou de uma orientação?"
        texto="Leve a sua armação até uma das unidades ou mande uma mensagem: a equipe avalia e explica o que é possível fazer."
      />
    </>
  );
}
