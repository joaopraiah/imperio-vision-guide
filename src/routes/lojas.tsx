import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/ui-bits";
import { StoreCard } from "@/components/site/StoreCard";
import { Reveal } from "@/components/site/motion-primitives";
import { STORES } from "@/lib/site-data";
import { ClosingCta } from "@/components/site/ClosingCta";

export const Route = createFileRoute("/lojas")({
  head: () => ({
    meta: [
      { title: "Nossas lojas em Sumaré e Hortolândia — Ótica Império Glasses" },
      {
        name: "description",
        content:
          "Endereços, WhatsApp e como chegar às unidades da Ótica Império Glasses em Sumaré (Matão) e Hortolândia (Centro).",
      },
      { property: "og:title", content: "Nossas lojas — Ótica Império Glasses" },
      {
        property: "og:description",
        content: "Duas unidades na região: Sumaré (Matão) e Hortolândia (Centro).",
      },
    ],
  }),
  component: Lojas,
});

function Lojas() {
  return (
    <>
      <PageHero
        label="Lojas"
        title="Duas unidades, o mesmo cuidado"
        intro="Escolha a unidade mais próxima, agende o seu horário e venha provar com calma. Atendemos clientes de Sumaré, Hortolândia e de toda a região."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {STORES.map((s, i) => (
            <StoreCard key={s.id} store={s} delay={i * 0.1} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex items-start gap-4 border border-border bg-card p-8">
            <Clock className="mt-0.5 size-5 shrink-0 text-gold" />
            <div>
              <h2 className="text-xl">Atendimento com hora marcada</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Recomendamos agendar pelo WhatsApp da unidade. Assim garantimos tempo dedicado a você,
                sem espera — inclusive para o exame de vista.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-border bg-secondary/40">
        <SectionHeading
          title="Referências que ajudam"
          intro="Na unidade Sumaré há estacionamento em frente à loja. Em Hortolândia, estamos dentro do Supermercado São Vicente, ao lado da lotérica, no centro da cidade."
          align="center"
        />
      </Section>

      <ClosingCta />
    </>
  );
}
