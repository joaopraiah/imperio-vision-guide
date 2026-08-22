import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { GoogleRating } from "@/components/site/ui-bits";
import { NAV, SOCIAL, STORES } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="grain bg-ink px-5 py-16 text-ink-foreground sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr_1.2fr]">
        <div>
          <Logo className="scale-110 origin-left" />
          <p className="mt-7 max-w-xs text-sm leading-relaxed text-ink-foreground/60">
            Ótica premium com atendimento personalizado em Sumaré e Hortolândia. Aqui, a escolha do seu
            óculos começa por uma conversa.
          </p>
          <GoogleRating tone="light" className="mt-5" />
          <div className="mt-6 flex gap-4">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Ótica Império"
              className="border border-ink-foreground/20 p-2.5 text-ink-foreground/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook da Ótica Império"
              className="border border-ink-foreground/20 p-2.5 text-ink-foreground/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="size-4" />
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-2.5">
          <span className="label-mono">Navegação</span>
          {NAV.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="w-fit text-sm text-ink-foreground/70 transition-colors hover:text-gold"
            >
              {i.label}
            </Link>
          ))}
          <Link to="/orcamento" className="w-fit text-sm text-ink-foreground/70 hover:text-gold">
            Orçamento
          </Link>
        </nav>

        <div className="flex flex-col gap-7">
          <span className="label-mono">Nossas lojas</span>
          {STORES.map((s) => (
            <div key={s.id}>
              <p className="font-display text-lg">{s.nome}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-foreground/60">{s.endereco}</p>
              <a
                href={s.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block font-mono text-xs tracking-widest text-gold"
              >
                {s.telefoneLabel}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl border-t border-ink-foreground/10 pt-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-foreground/40">
          © {new Date().getFullYear()} Ótica Império Glasses — Sumaré · Hortolândia
        </p>
      </div>
    </footer>
  );
}
