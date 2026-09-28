import type { ReactNode } from "react";

interface PageHeroProps {
  kicker: string;
  titleLeft: string;
  titleRight: string; // italic gold part
  copy: string;
  img: string;
  imgAlt: string;
  extra?: ReactNode;
}

/** Shared inner-page header — big display type + tilted framed image card. */
export default function PageHero({
  kicker,
  titleLeft,
  titleRight,
  copy,
  img,
  imgAlt,
  extra,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-20 pt-40 md:pb-24 md:pt-48">
      <div className="mx-auto grid w-full max-w-[92rem] items-center gap-14 px-6 md:px-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p
            data-reveal
            className="mb-7 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep"
          >
            <span className="inline-block h-px w-12 bg-gold" /> {kicker}
          </p>
          <h1 className="font-display text-[clamp(2.9rem,6.4vw,5.6rem)] font-medium leading-[1.01] tracking-[-0.015em] text-ink">
            <span data-reveal="words">
              {titleLeft.split(" ").map((w) => (
                <span key={w} className="w-line">
                  <span className="w-in">{w}</span>
                </span>
              ))}
            </span>{" "}
            <span data-reveal="words" data-delay="120">
              {titleRight.split(" ").map((w) => (
                <span key={w} className="w-line">
                  <span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">
                    {w}
                  </span>
                </span>
              ))}
            </span>
          </h1>
          <p data-reveal data-delay="200" className="mt-8 max-w-lg text-[17px] leading-relaxed text-moss">
            {copy}
          </p>
          {extra}
        </div>

        <div data-reveal data-delay="160" className="relative">
          <div className="rotate-[4deg] overflow-hidden rounded-[1.8rem] shadow-[0_50px_100px_-50px_rgba(14,43,32,0.5)]">
            <img src={img} alt={imgAlt} className="aspect-[4/3.4] w-full object-cover" />
          </div>
          <div
            className="pointer-events-none absolute -left-5 -top-5 -z-10 h-full w-full rounded-[1.8rem] border border-gold/50"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
