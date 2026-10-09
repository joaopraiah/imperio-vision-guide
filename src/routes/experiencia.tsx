import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import visagismo from "@/assets/mood-homem-oculos.webp";
import { Reveal } from "@/components/site/motion-primitives";
import { PageHero, Section, SectionHeading, SplitPhotoSection } from "@/components/site/ui-bits";
import { ClosingCta } from "@/components/site/ClosingCta";

export const Route = createFileRoute("/experiencia")({
  head: () =>
    seo({
      path: "/experiencia",
      title: "Como é o atendimento na loja | Ótica Império Glasses",
      description:
        "Como é ser atendido na Ótica Império: conversa inicial, exame com hora marcada, visagismo, escolha da armação e acompanhamento após a entrega.",
      breadcrumb: "A Experiência",
    }),
  component: Experiencia,
});

const ETAPAS = [
  {
    titulo: "Agendamento",
    texto:
      "Você fala com a unidade mais próxima pelo WhatsApp e escolhe o melhor horário. O agendamento garante atendimento dedicado, sem espera.",
  },
  {
    titulo: "Conversa inicial",
    texto:
      "Antes de qualquer armação, a equipe entende a sua rotina, a sua profissão, o tempo de tela, o esporte e o estilo que combina com você.",
  },
  {
    titulo: "Exame de vista",
    texto:
      "Realizado com equipamentos modernos e profissionais capacitados. O resultado orienta toda a recomendação de lentes.",
  },
  {
    titulo: "Visagismo descomplicado",
    texto:
      "Você prova, compara e a gente te diz, de forma simples e honesta, o que valoriza o seu rosto.",
  },
  {
    titulo: "Lentes e tratamentos",
    texto:
      "Explicamos as opções em linguagem simples: o que cada tratamento resolve, quando vale a pena e quando não é necessário.",
  },
  {
    titulo: "Entrega e acompanhamento",
    texto:
      "Ajuste fino na entrega, contato depois para saber da adaptação e garantia de adaptação se algo não estiver confortável.",
  },
];

function Experiencia() {
  return (
    <>
      <PageHero
        label="Experiência"
        title="Como é ser atendido na Ótica Império"
        intro="Um roteiro pensado para que você saia da loja seguro da escolha — e continue bem atendido depois dela."
      />

      <SplitPhotoSection src={visagismo} alt="Consultoria de visagismo na Ótica Império">
        <ol className="relative border-l border-border pl-8">
          {ETAPAS.map((e, i) => (
            <li key={e.titulo} className="relative pb-12 last:pb-0">
              <Reveal delay={i * 0.06}>
                <span className="absolute -left-[2.3rem] top-1 grid size-6 place-items-center rounded-full bg-steel font-mono text-[0.6rem] text-ink">
                  {i + 1}
                </span>
                <h2 className="text-2xl">{e.titulo}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.texto}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </SplitPhotoSection>

      <Section className="border-t border-border bg-secondary/40">
        <SectionHeading
          title="Condições pensadas para caber no seu mês"
          intro="Cartão de crédito em até 10x sem juros, débito, Pix, parcelamento em até 24x pela conta de luz e financiamento Brasil Card."
          align="center"
        />
      </Section>

      <ClosingCta />
    </>
  );
}
