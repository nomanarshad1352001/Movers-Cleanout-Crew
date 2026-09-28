import { galleryRow1, galleryRow2 } from "../data/content";

function Rail({ items, reverse = false }: { items: { img: string; alt: string }[]; reverse?: boolean }) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 gap-6 px-3">
      {items.map((g, i) => (
        <figure
          key={key + i}
          className="group relative h-52 w-80 shrink-0 overflow-hidden rounded-2xl md:h-60 md:w-[26rem]"
        >
          <img
            src={g.img}
            alt={g.alt}
            loading="lazy"
            className="h-full w-full object-cover grayscale-[35%] transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine/35 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
        </figure>
      ))}
    </div>
  );

  return (
    <div className="mask-x overflow-hidden">
      <div className={`flex w-max py-3 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/** Dual-direction photo rails — "recent projects" strip. */
export default function GalleryRail() {
  return (
    <section className="py-10 md:py-14">
      <p data-reveal className="mb-8 flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-moss">
        <span className="inline-block h-px w-12 bg-gold" /> Recent Projects{" "}
        <span className="inline-block h-px w-12 bg-gold" />
      </p>
      <Rail items={galleryRow1} />
      <Rail items={galleryRow2} reverse />
    </section>
  );
}
