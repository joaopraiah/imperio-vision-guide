import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import lojaDisplay from "@/assets/hero-loja.webp";
import bloqueadorElite from "@/assets/bloqueador-elite.webp";
import { FloatingRings, Parallax, Reveal, RevealWords } from "@/components/site/motion-primitives";
import { BtnAnchor, BtnLink, PageHero, Section, SectionHeading } from "@/components/site/ui-bits";
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
  head: () =>
    seo({
      path: "/servicos",
      title: "Exame de vista, visagismo e ajustes | Ótica Império Glasses",
      description:
        "Manutenção de armações, consultoria de visagismo, exame de vista com hora marcada, orientação sobre lentes e garantia de adaptação.",
      breadcrumb: "Serviços",
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
            <Reveal
              key={s.titulo}
              delay={i * 0.06}
              className={BENTO_SPANS[i % BENTO_SPANS.length]!}
            >
              <article
                className={cn(
                  "flex h-full flex-col justify-center border p-8 transition-colors duration-500 md:p-10",
                  s.destaque
                    ? "grain border-transparent bg-ink text-ink-foreground"
                    : "border-border bg-card hover:border-ink",
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
        <FloatingRings className="-right-20 top-10 text-steel sm:right-0" />
        <div className="relative mx-auto max-w-2xl px-5 pt-24 text-center sm:px-8 md:pt-32">
          <Reveal>
            <span className="label-mono">Um produto à parte</span>
          </Reveal>
          <h2 className="mt-5 text-balance text-4xl font-light uppercase leading-[1.02] sm:text-5xl md:text-6xl">
            <RevealWords text="O cansaço das 2h da tarde vai embora" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-steel">
              Bloqueador de Elite — em até 7 dias, sua dor de cabeça vai embora
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-lg text-pretty text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
              Lentes Digital+ com Bloqueador de Elite: blindagem de 18 camadas de antirreflexo e
              tratamento hidrofóbico, bloqueio de luz azul e alta transparência — pensadas para quem
              passa horas em frente a telas.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <BtnLink to="/digital-mais" variant="dpBlue">
                Conhecer a Digital+
              </BtnLink>
              <BtnAnchor href={WHATSAPP_PRINCIPAL} variant="ghostLight">
                Falar no WhatsApp
              </BtnAnchor>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.22}>
          <div className="relative mt-16">
            <p className="mb-3 px-5 text-center text-[0.65rem] uppercase tracking-[0.14em] text-ink-foreground/50 sm:hidden">
              Arraste para o lado para ver tudo →
            </p>
            <div className="overflow-x-auto sm:overflow-visible">
              <img
                src={bloqueadorElite}
                alt="Bloqueador de Elite — Lentes Digital+ da Ótica Império Glasses, blindagem de 18 camadas de antirreflexo hidrofóbico, e clientes usando no dia a dia"
                loading="lazy"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
                  maskImage:
                    "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
                }}
                className="h-auto w-[900px] max-w-none sm:w-full"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <ClosingCta
        titulo="Precisa de um reparo ou de uma orientação?"
        texto="Leve a sua armação até uma das unidades ou mande uma mensagem: a equipe avalia e explica o que é possível fazer."
      />
    </>
  );
}
