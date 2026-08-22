import { createFileRoute } from "@tanstack/react-router";
import visagismo from "@/assets/mood-homem-oculos.jpg";
import especialista from "@/assets/especialista-exame.jpg";
import { Parallax, Reveal } from "@/components/site/motion-primitives";
import { PageHero, Section, SectionHeading } from "@/components/site/ui-bits";
import { ClosingCta } from "@/components/site/ClosingCta";

export const Route = createFileRoute("/experiencia")({
  head: () => ({
    meta: [
      { title: "A Experiência na loja — Ótica Império Glasses" },
      {
        name: "description",
        content:
          "Como é ser atendido na Ótica Império: conversa inicial, exame com hora marcada, visagismo, escolha da armação e acompanhamento após a entrega.",
      },
      { property: "og:title", content: "A Experiência na loja — Ótica Império Glasses" },
      {
        property: "og:description",
        content: "Passo a passo do atendimento presencial: da conversa inicial ao acompanhamento.",
      },
    ],
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
    titulo: "Visagismo",
    texto:
      "Formato de rosto, tom de pele e estilo pessoal. Você prova, compara e recebe orientação honesta sobre o que valoriza o seu rosto.",
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

      <Section>
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:items-start">
          <Parallax className="md:sticky md:top-28">
            <img
              src={visagismo}
              alt="Consultoria de visagismo na Ótica Império"
              loading="lazy"
              className="aspect-3/4 w-full object-cover"
            />
          </Parallax>

          <ol className="relative border-l border-border pl-8">
            {ETAPAS.map((e, i) => (
              <Reveal key={e.titulo} delay={i * 0.06}>
                <li className="relative pb-12 last:pb-0">
                  <span className="absolute -left-[2.3rem] top-1 grid size-6 place-items-center rounded-full bg-gold font-mono text-[0.6rem] text-ink">
                    {i + 1}
                  </span>
                  <h3 className="text-2xl">{e.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.texto}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Parallax className="h-[45vh] min-h-80 overflow-hidden">
        <img
          src={especialista}
          alt="Exame de vista realizado por profissional capacitado"
          loading="lazy"
          className="size-full object-cover object-top"
        />
      </Parallax>

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
