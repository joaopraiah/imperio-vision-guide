import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Slide = { type: "video"; src: string; poster?: string; alt: string } | { type: "image"; src: string; alt: string };

const IMAGE_DURATION = 5200;

/**
 * Crossfading hero slideshow: a video opener followed by photos, each with a
 * gentle Ken Burns drift so the loop never feels static — the "fotos que
 * ficam passando" the client called out as the standout detail on the
 * Óticas Ipanema reference.
 */
export function HeroSlideshow({ slides, className }: { slides: Slide[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index]!;

  useEffect(() => {
    if (slides.length < 2 || slide.type === "video") return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), IMAGE_DURATION);
    return () => window.clearTimeout(id);
  }, [index, slide.type, slides.length]);

  return (
    <div className={className}>
      <AnimatePresence initial={false}>
        {slide.type === "video" ? (
          <motion.video
            key={slide.src}
            src={slide.src}
            poster={slide.poster}
            autoPlay
            muted
            loop={false}
            playsInline
            onEnded={() => setIndex((i) => (i + 1) % slides.length)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: IMAGE_DURATION / 1000, ease: "linear" },
            }}
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
