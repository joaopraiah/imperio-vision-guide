import { Reveal, RevealWords } from "./motion-primitives";
import { BtnAnchor, BtnLink, SectionLabel } from "./ui-bits";
import { STORES } from "@/lib/site-data";

export function ClosingCta({
  titulo = "Venha conhecer a loja e escolher com quem orienta",
  texto = "O melhor da Ótica Império acontece pessoalmente: provar armações, conversar sobre a sua rotina e sair com a escolha certa. Agende a sua visita.",
}: {
  titulo?: string;
  texto?: string;
}) {
  return (
    <section className="grain bg-ink px-5 py-24 text-ink-foreground sm:px-8 md:py-32">
      <div className="mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <SectionLabel>Visite uma unidade</SectionLabel>
        </Reveal>
        <h2 className="mt-6 text-balance text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
          <RevealWords text={titulo} />
        </h2>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-ink-foreground/70">
            {texto}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {STORES.map((s) => (
              <BtnAnchor key={s.id} href={s.whatsapp} variant="gold">
                Falar com {s.cidade}
              </BtnAnchor>
            ))}
            <BtnLink to="/lojas" variant="ghostLight">
              Ver as lojas
            </BtnLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
