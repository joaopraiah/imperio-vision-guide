import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/ui-bits";
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
    ],
  }),
  component: Contato;
});

function Contato() {
  return null;
}
