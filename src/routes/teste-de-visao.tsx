import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/site/motion-primitives";
import { PageHero, Section } from "@/components/site/ui-bits";
import { VisionTest } from "@/components/site/VisionTest";
import { ClosingCta } from "@/components/site/ClosingCta";

export const Route = createFileRoute("/teste-de-visao")({
  head: () => ({
    meta: [
      { title: "Teste de visão online — Ótica Império Glasses" },
      {
        name: "description",
        content:
          "Teste de visão online, gratuito e orientativo. Não substitui a avaliação profissional: use o resultado como ponto de partida para o exame na loja.",
      },
      { property: "og:title", content: "Teste de visão online — Ótica Império Glasses" },
      {
        property: "og:description",
        content: "Um teste rápido e educativo para entender se está na hora de avaliar a sua visão.",
      },
    ],
  }),
  component: TesteDeVisao,
});

function TesteDeVisao() {
  return (
    <>
      <PageHero
        label="Teste de visão"
        title="Um teste orientativo para dar o primeiro passo"
        intro="Rápido, gratuito e feito para você entender melhor a sua visão. O resultado é educativo e serve como ponto de partida para uma avaliação presencial."
      />

      <Section>
        <Reveal>
          <div className="mb-10 flex gap-4 border border-gold/40 bg-gold-soft/20 p-6">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-gold" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-ink">Importante:</strong> este teste é educativo e orientativo.
              Ele <strong className="text-ink">não é um diagnóstico</strong> e{" "}
              <strong className="text-ink">não substitui</strong> a avaliação de um profissional
              habilitado. Fatores como brilho da tela, distância e iluminação afetam o resultado.
            </p>
          </div>
        </Reveal>

        <VisionTest />
      </Section>

      <ClosingCta
        titulo="Confirme o resultado com uma avaliação presencial"
        texto="O exame de vista na loja é feito com equipamentos modernos e por profissionais capacitados, com hora marcada e sem espera."
      />
    </>
  );
}
