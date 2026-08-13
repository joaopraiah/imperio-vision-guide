import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { STORES } from "@/lib/site-data";

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-[16.5rem] border border-border bg-card p-5 shadow-xl"
          >
            <p className="label-mono">Fale com a loja</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Escolha a unidade mais próxima de você.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {STORES.map((s) => (
                <a
                  key={s.id}
                  href={s.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-border px-4 py-3 text-sm transition-colors hover:border-gold hover:text-gold"
                >
                  <span className="block font-display text-base">{s.cidade}</span>
                  <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground">
                    {s.telefoneLabel}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar contatos" : "Falar no WhatsApp"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{ boxShadow: ["0 0 0 0 rgba(184,147,91,0.45)", "0 0 0 14px rgba(184,147,91,0)"] }}
        transition={{ boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeOut" } }}
        className="grid size-14 place-items-center rounded-full bg-gold text-ink"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </motion.button>
    </div>
  );
}
