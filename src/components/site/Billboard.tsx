import { m as motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import retrato from "@/assets/poster-mulher.webp";
import armacao from "@/assets/poster-produto.webp";
import { BtnLink } from "./ui-bits";
import { Reveal } from "./motion-primitives";

/**
 * Painel estilo "outdoor": título à esquerda com a armação em destaque, rosto
 * no centro e segundo título à direita. O painel cresce levemente ao entrar
 * na tela e o retrato sobe em parallax — leitura de campanha, não de site.
 */
export function Billboard() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const panelScale = useTransform(scrollYProgress, [0, 0.35], [0.92, 1]);
  const faceY = useTransform(scrollYProgress, [0, 1], ["8%", "-6%"]);
  const productX = useTransform(scrollYProgress, [0, 0.5], [-40, 0]);
  const productRotate = useTransform(scrollYProgress, [0, 0.5], [-8, 0]);

  return (
    <section ref={ref} className="overflow-hidden bg-secondary px-3 py-16 sm:px-6 md:py-24">
      <motion.div
        style={{ scale: panelScale }}
        className="relative mx-auto grid max-w-7xl overflow-hidden border-[6px] border-[#9a9a9a]/40 bg-[#ece7e0] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)] lg:grid-cols-[1fr_1.1fr_1fr]"
      >
        {/* esquerda */}
        <div className="relative z-10 flex flex-col justify-between gap-10 p-8 sm:p-10">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.2em] text-ink/70">
            <span>Ótica Império Glasses</span>
          </div>
          <Reveal>
            <h2 className="text-3xl font-light uppercase leading-[1.05] tracking-[-0.01em] text-ink sm:text-4xl">
              Enxergar bem,
              <br />
              sem abrir mão
              <br />
              do estilo.
            </h2>
          </Reveal>
          <motion.div
            style={{ x: productX, rotate: productRotate }}
            className="w-56 overflow-hidden sm:w-64"
          >
            <img
              src={armacao}
              alt="Armação de acetato preta"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover object-[50%_40%] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_55%,transparent_100%)]"
            />
          </motion.div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-ink/75">
              Exame com hora marcada, visagismo e garantia de adaptação — tudo numa visita só.
            </p>
          </Reveal>
        </div>

        {/* centro: retrato */}
        <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[38rem]">
          <motion.img
            src={retrato}
            alt="Cliente usando armação preta de acetato"
            loading="lazy"
            decoding="async"
            style={{ y: faceY }}
            className="absolute inset-0 size-full scale-110 object-cover object-[50%_20%] lg:[mask-image:linear-gradient(to_right,transparent,#000_16%,#000_84%,transparent)]"
          />
        </div>

        {/* direita */}
        <div className="relative z-10 flex flex-col justify-between gap-10 p-8 sm:p-10">
          <div className="text-right text-[0.65rem] uppercase leading-relaxed tracking-[0.2em] text-ink/70">
            Sumaré · Hortolândia
            <br />
            Ótica premium
          </div>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-light uppercase leading-[1.05] tracking-[-0.01em] text-ink sm:text-4xl">
              Veja mais.
              <br />
              Seja você.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm leading-relaxed text-ink/75">
              Duas lojas físicas na região de Campinas. Antes de indicar qualquer modelo, a equipe
              entende a sua rotina, a sua profissão e o seu rosto.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <BtnLink to="/a-otica">Conhecer a ótica</BtnLink>
              <BtnLink to="/experiencia" variant="outline">
                A experiência
              </BtnLink>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
