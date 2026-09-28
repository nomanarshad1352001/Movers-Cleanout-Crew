import { useEffect, useRef } from "react";
import Velocity from "velocity-animate";
import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "../data/content";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[330px] shrink-0 flex-col justify-between gap-6 rounded-[1.6rem] border border-hairline bg-white p-8 shadow-[0_26px_70px_-38px_rgba(24,36,32,0.35)] md:w-[400px]">
      <div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-gold text-gold" strokeWidth={1} />
          ))}
        </div>
        <blockquote className="mt-5 text-[15.5px] leading-relaxed text-ink/85">
          “{t.quote}”
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-4 border-t border-hairline pt-5">
        <img
          src={t.img}
          alt={`Portrait of ${t.name}`}
          loading="lazy"
          className="h-12 w-12 rounded-full border border-gold/40 object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold text-ink">{t.name}</p>
          <p className="truncate text-[12px] text-moss">
            {t.role} · {t.city}
          </p>
        </div>
        <span className="ml-auto rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gold-deep">
          {t.service}
        </span>
      </figcaption>
    </figure>
  );
}

/** Twin infinite rails gliding in opposite directions — Velocity.js loops. */
export default function Testimonials() {
  const railA = useRef<HTMLDivElement>(null);
  const railB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rails = [railA.current, railB.current].filter(Boolean) as HTMLDivElement[];
    const cleanups: Array<() => void> = [];

    const start = (el: HTMLDivElement, dir: 1 | -1) => {
      const measure = () => el.scrollWidth / 2;
      let dist = measure();
      const onResize = () => {
        dist = measure();
      };
      window.addEventListener("resize", onResize);

      const SPEED = 32; // duration factor — elegant crawl
      const run = () => {
        dist = measure();
        const from = dir === 1 ? 0 : -dist;
        const to = dir === 1 ? -dist : 0;
        Velocity(el, "stop", true);
        Velocity(el, { translateX: [to, from] }, { duration: dist * SPEED, easing: "linear", complete: run });
      };
      run();

      const pause = () => Velocity(el, "pause");
      const resume = () => Velocity(el, "resume");
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", resume);

      cleanups.push(() => {
        window.removeEventListener("resize", onResize);
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", resume);
        Velocity(el, "stop");
      });
    };

    if (rails[0]) start(rails[0], 1);
    if (rails[1]) start(rails[1], -1);

    return () => cleanups.forEach((c) => c());
  }, []);

  const first = testimonials.slice(0, 4);
  const second = testimonials.slice(4);

  return (
    <section id="testimonials" className="overflow-hidden py-28 md:py-36">
      <div className="mx-auto mb-14 w-full max-w-[92rem] px-6 text-center md:mb-20 md:px-12">
        <p data-reveal className="mb-6 flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
          <span className="inline-block h-px w-12 bg-gold" /> Client Stories{" "}
          <span className="inline-block h-px w-12 bg-gold" />
        </p>
        <h2 data-reveal="words" className="font-display text-5xl font-medium leading-[1.03] tracking-[-0.015em] text-ink md:text-7xl">
          <span className="w-line"><span className="w-in">The</span></span>{" "}
          <span className="w-line"><span className="w-in">neighborhood</span></span>{" "}
          <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">talks.</span></span>
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-moss">
          Twelve thousand projects, one reputation. Hover a rail to read along.
        </p>
      </div>

      <div className="mask-x space-y-7">
        <div ref={railA} className="flex w-max gap-7 will-change-transform">
          {[...first, ...first].map((t, i) => (
            <Card key={`a-${t.name}-${i}`} t={t} />
          ))}
        </div>
        <div ref={railB} className="flex w-max gap-7 will-change-transform">
          {[...second, ...second].map((t, i) => (
            <Card key={`b-${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
