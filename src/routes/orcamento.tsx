import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/ui-bits";
import { Reveal } from "@/components/site/motion-primitives";
import { OrcamentoForm } from "@/components/site/OrcamentoForm";
import { ClosingCta } from "@/components/site/ClosingCta";

export const Route = createFileRoute("/orcamento")({
  head: () => ({
    meta: [
      { title: "Solicitar orçamento — Ótica Império Glasses" },
      {
        name: "description",
        content:
          "Conte o que você precisa e continue a conversa no WhatsApp da unidade de Sumaré ou Hortolândia. Orçamento sem compromisso.",
      },
      { property: "og:title", content: "Solicitar orçamento — Ótica Império Glasses" },
      {
        property: "og:description",
        content: "Formulário simples de orçamento com continuidade no WhatsApp da loja mais próxima.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Orcamento,
});

function Orcamento() {
  return (
    <>
      <PageHero
        label="Orçamento"
        title="Um orçamento feito a partir da sua rotina"
        intro="Antes de falar em valores, a equipe entende o seu dia a dia. Preencha os campos abaixo e continue a conversa no WhatsApp."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <span className="label-mono">Como funciona</span>
              <h2 className="mt-5 text-3xl leading-[1.1] sm:text-4xl">Três passos simples</h2>
              <ol className="mt-8 space-y-7">
                {[
                  {
                    t: "Você conta o que precisa",
                    d: "Grau, sol, lentes de contato ou apenas uma dúvida — tudo bem não saber ainda.",
                  },
                  {
                    t: "A equipe responde no WhatsApp",
                    d: "Com orientação clara sobre próximos passos, prazos e formas de pagamento.",
                  },
                  {
                    t: "Você finaliza na loja",
                    d: "Provando armações, com consultoria de visagismo e ajuste presencial.",
                  },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-5">
                    <span className="font-mono text-xs tracking-widest text-gold">0{i + 1}</span>
                    <div>
                      <p className="font-display text-lg">{s.t}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <OrcamentoForm />
          </Reveal>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
