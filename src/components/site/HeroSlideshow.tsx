import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

/**
 * Slow crossfading slideshow for the hero background. Each frame gets a
 * gentle Ken Burns drift so the loop never feels static — the "fotos que
 * ficam passando" the client called out as the standout detail on the
 * Óticas Ipanema reference.
 */
export function HeroSlideshow({ slides, className }: { slides: Slide[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5200);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className={className}>
      <AnimatePresence initial={false}>
        <motion.img
          key={slides[index]!.src}
          src={slides[index]!.src}
          alt={slides[index]!.alt}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.55, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 5.2, ease: "linear" },
          }}
          className="absolute inset-0 size-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}
