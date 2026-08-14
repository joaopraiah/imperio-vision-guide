import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/motion-primitives";
import { PageHero, Section, SectionHeading } from "@/components/site/ui-bits";
import { ClosingCta } from "@/components/site/ClosingCta";

export const Route = createFileRoute("/marcas")({
  head: () => ({
    meta: [
      { title: "Marcas e coleções — Ótica Império Glasses" },
      {
        name: "description",
        content:
          "Grifes internacionais, marcas nacionais de qualidade e linhas acessíveis: variedade de armações e lentes para provar nas lojas de Sumaré e Hortolândia.",
      },
      { property: "og:title", content: "Marcas e coleções — Ótica Império Glasses" },
      {
        property: "og:description",
        content: "Do clássico ao autoral: variedade de armações para todos os estilos e orçamentos.",
      },
    ],
  }),
  component: Marcas,
});

const LINHAS = [
  {
    titulo: "Grifes internacionais",
    texto:
      "Modelos icônicos de marcas reconhecidas mundialmente, para quem procura design consagrado e acabamento impecável.",
  },
  {
    titulo: "Marcas nacionais premium",
    texto:
      "Design brasileiro com materiais nobres — acetatos, titânio e combinações leves feitas para o uso diário.",
  },
  {
    titulo: "Linhas acessíveis",
    texto:
      "Armações com ótimo custo-benefício, selecionadas pela mesma equipe e com a mesma orientação de sempre.",
  },
  {
    titulo: "Óculos de sol",
    texto:
      "Proteção UV com estilo: clássicos atemporais, modelos esportivos e peças autorais para compor o visual.",
  },
  {
    titulo: "Infantil",
    texto:
      "Armações resistentes e confortáveis, pensadas para a rotina das crianças e para a adaptação sem drama.",
  },
  {
    titulo: "Lentes e tratamentos",
    texto:
      "Multifocais, antirreflexo, filtro de luz azul, fotossensíveis e lentes de contato — indicadas conforme o seu exame.",
  },
];

function Marcas() {
  return (
    <>
      <PageHero
        label="Marcas"
        title="Variedade de verdade, do clássico ao autoral"
        intro="Trabalhamos com grifes internacionais, marcas nacionais premium e linhas acessíveis. A curadoria existe para que você tenha opções reais — e a orientação para escolher entre elas."
      />

      <Section>
        <SectionHeading
          label="Coleções"
          title="O que você encontra nas lojas"
          intro="O catálogo completo fica nas unidades: provar é parte da escolha. Fale com a equipe para saber o que temos disponível hoje."
        />
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {LINHAS.map((l, i) => (
            <Reveal key={l.titulo} delay={i * 0.06}>
              <article className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-card">
                <span className="font-mono text-[0.68rem] tracking-[0.2em] text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-2xl">{l.titulo}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{l.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <ClosingCta
        titulo="Prove antes de decidir"
        texto="Modelos, cores e proporções mudam completamente no rosto. Agende um horário e experimente com a orientação da nossa equipe."
      />
    </>
  );
}
