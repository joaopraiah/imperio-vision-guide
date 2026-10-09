import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";
import { STORES } from "@/lib/site-data";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.86.502 3.669 1.457 5.244L2 22l4.874-1.42A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12.001 2zm0 18.06a8.03 8.03 0 0 1-4.14-1.15l-.297-.176-2.89.843.85-2.815-.194-.29A8.04 8.04 0 1 1 20.04 12c0 4.436-3.607 8.06-8.039 8.06z" />
    </svg>
  );
}

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
                  className="border border-border px-4 py-3 text-sm transition-colors hover:border-ink hover:text-forest"
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
        animate={{ boxShadow: ["0 0 0 0 rgba(37,211,102,0.45)", "0 0 0 14px rgba(37,211,102,0)"] }}
        transition={{ boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeOut" } }}
        className="grid size-14 place-items-center rounded-full bg-gradient-to-b from-[#2CE65B] to-[#00B92E] text-white"
      >
        {open ? <X className="size-6" /> : <WhatsAppIcon className="size-7" />}
      </motion.button>
    </div>
  );
}
