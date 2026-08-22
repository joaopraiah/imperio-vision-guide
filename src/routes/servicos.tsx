import { createFileRoute } from "@tanstack/react-router";
import lojaDisplay from "@/assets/hero-loja.jpg";
import { Parallax, Reveal } from "@/components/site/motion-primitives";
import { PageHero, Section, SectionHeading } from "@/components/site/ui-bits";
import { ClosingCta } from "@/components/site/ClosingCta";
import { SERVICOS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

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
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICOS.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 0.07}>
              <article
                className={cn(
                  "h-full border p-8 transition-colors duration-500 md:p-10",
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

      <ClosingCta
        titulo="Precisa de um reparo ou de uma orientação?"
        texto="Leve a sua armação até uma das unidades ou mande uma mensagem: a equipe avalia e explica o que é possível fazer."
      />
    </>
  );
}
