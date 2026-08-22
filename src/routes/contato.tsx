import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle, Plus } from "lucide-react";
import { PageHero, Section, SectionHeading, BtnAnchor, BtnLink } from "@/components/site/ui-bits";
import { Reveal } from "@/components/site/motion-primitives";
import { FAQ, SOCIAL, STORES } from "@/lib/site-data";
import { ClosingCta } from "@/components/site/ClosingCta";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato e dúvidas frequentes — Ótica Império Glasses" },
      {
        name: "description",
        content:
          "Fale com a Ótica Império Glasses pelo WhatsApp de Sumaré ou Hortolândia e veja as respostas para as dúvidas mais comuns.",
      },
      { property: "og:title", content: "Contato — Ótica Império Glasses" },
      {
        property: "og:description",
        content: "WhatsApp das duas unidades, redes sociais e perguntas frequentes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contato,
});

function Contato() {
  return (
    <>
      <PageHero
        label="Contato"
        title="Fale com a equipe da unidade mais próxima"
        intro="A conversa começa no WhatsApp e continua pessoalmente, na loja, com tempo dedicado a você."
      />

      <Section>
        <SectionHeading
          title="Escolha por onde prefere falar"
          intro="Cada loja tem o seu próprio número, atendido pela equipe que vai te receber."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {STORES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.1}>
              <div className="flex h-full flex-col border border-border bg-card">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={s.foto}
                    alt={`Interior da ${s.nome}`}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex h-full flex-col p-8">
                  <span className="label-mono">{s.bairro}</span>
                  <h3 className="mt-3 text-2xl">{s.nome}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.endereco}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detalhes}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <BtnAnchor href={s.whatsapp} variant="gold">
                      <MessageCircle className="size-4" /> {s.telefoneLabel}
                    </BtnAnchor>
                    <BtnAnchor href={s.maps} variant="outline">
                      Ver no mapa
                    </BtnAnchor>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-4 border border-border p-7">
            <span className="label-mono">Redes sociais</span>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-gold"
            >
              <Instagram className="size-4" /> {SOCIAL.instagramLabel}
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-gold"
            >
              <Facebook className="size-4" /> {SOCIAL.facebookLabel}
            </a>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-border bg-card">
        <SectionHeading title="Respostas rápidas antes da sua visita" />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <details className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-lg leading-snug transition-colors group-open:text-gold">
                  {f.q}
                  <Plus className="size-4 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-10">
            <BtnLink to="/orcamento" variant="solid">
              Solicitar orçamento
            </BtnLink>
          </div>
        </Reveal>
      </Section>

      <ClosingCta />
    </>
  );
}
