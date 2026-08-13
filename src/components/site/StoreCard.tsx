import { MapPin, MessageCircle } from "lucide-react";
import type { Store } from "@/lib/site-data";
import { Reveal } from "./motion-primitives";

export function StoreCard({ store, delay = 0 }: { store: Store; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col border border-border bg-card p-8 transition-colors duration-500 hover:border-gold">
        <span className="label-mono">{store.cidade}</span>
        <h3 className="mt-4 text-2xl">{store.nome}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{store.endereco}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{store.detalhes}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <a
            href={store.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-ink-foreground transition-colors hover:bg-gold hover:text-ink"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          <a
            href={store.maps}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-ink/20 px-5 py-3 text-[0.72rem] uppercase tracking-[0.16em] transition-colors hover:border-gold hover:text-gold"
          >
            <MapPin className="size-4" /> Como chegar
          </a>
        </div>
      </article>
    </Reveal>
  );
}
