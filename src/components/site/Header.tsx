import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { NAV, WHATSAPP_PRINCIPAL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "bg-ink/95 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Ótica Império Glasses — início">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "link-underline text-[0.78rem] uppercase tracking-[0.14em] transition-colors",
                  pathname === item.to ? "text-gold" : "text-ink-foreground/80 hover:text-ink-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_PRINCIPAL}
              target="_blank"
              rel="noreferrer"
              className="border border-gold px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              Orçamento
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="justify-self-end p-2 text-ink-foreground lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.to}
                    className="block py-2.5 font-display text-3xl text-ink-foreground"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <a
              href={WHATSAPP_PRINCIPAL}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex w-fit border border-gold px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-gold"
            >
              Pedir orçamento no WhatsApp
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
