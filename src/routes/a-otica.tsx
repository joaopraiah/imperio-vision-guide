import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import especialistaExame from "@/assets/especialista-exame.webp";
import sustentabilidade from "@/assets/sustentabilidade.webp";
import { DIFERENCIAIS } from "@/lib/site-data";
import { Reveal } from "@/components/site/motion-primitives";
import { PageHero, Section, SectionHeading, SplitPhotoSection } from "@/components/site/ui-bits";
import { ClosingCta } from "@/components/site/ClosingCta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/a-otica")({
  head: () =>
    seo({
      path: "/a-otica",
      title: "Sobre a Ótica Império Glasses | Ótica em Sumaré e Hortolândia",
      description:
        "Conheça a história e a filosofia da Ótica Império Glasses: atendimento humanizado, visagismo e cuidado com cada cliente em Sumaré e Hortolândia.",
      breadcrumb: "A Ótica",
    }),
  component: AOtica,
});

function AOtica() {
  return (
    <>
      <PageHero
        label="A Ótica"
        title="Uma ótica premium construída no relacionamento"
        intro="A Ótica Império Glasses nasceu para oferecer na região o que muita gente só encontrava em grandes centros: variedade, orientação de verdade e um atendimento que trata cada cliente pelo nome."
      />

      <SplitPhotoSection
        src={especialistaExame}
        alt="Exame de vista na Ótica Império, com armação de prova"
        reverse
      >
        <SectionHeading
          title="A escolha certa vem depois de entender você"
          intro="Não vendemos óculos por catálogo. A equipe conversa, observa, sugere e ajusta. Esse cuidado continua depois da entrega, no acompanhamento da adaptação e nos pequenos ajustes que fazem toda a diferença."
        />
        <Reveal delay={0.15}>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Hoje somos duas lojas físicas — Sumaré e Hortolândia — e atendemos clientes de toda a
            região. Cada unidade mantém o mesmo padrão de acolhimento, variedade e orientação
            técnica.
          </p>
        </Reveal>
      </SplitPhotoSection>

      <Section className="border-t border-border bg-secondary/40">
        <SectionHeading title="Quatro compromissos" align="center" />
        <div className="mt-16 divide-y divide-border">
          {DIFERENCIAIS.map((d, i) => (
            <Reveal key={d.titulo} delay={i * 0.08}>
              <div
                className={cn(
                  "flex flex-col items-start gap-4 py-10 md:flex-row md:items-center md:gap-14",
                  i % 2 === 1 && "md:flex-row-reverse md:text-right",
                )}
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 font-display text-7xl leading-none text-steel/15 md:text-8xl"
                >
                  0{i + 1}
                </span>
                <div className="max-w-xl">
                  <h3 className="text-2xl md:text-3xl">{d.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {d.texto}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <SplitPhotoSection
        src={sustentabilidade}
        alt="Iniciativa de responsabilidade ambiental da Ótica Império"
        className="border-t border-border"
      >
        <SectionHeading
          title="Passos concretos, sem promessa vazia"
          intro="Estamos substituindo nossas sacolas por versões recicláveis e estudando uma iniciativa de descarte consciente de óculos antigos. É um caminho em construção, e preferimos contar exatamente onde estamos."
        />
      </SplitPhotoSection>

      <ClosingCta />
    </>
  );
}
