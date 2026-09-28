import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { animate } from "popmotion";
import { ArrowUpRight } from "lucide-react";
import { services } from "../data/content";
import { clamp } from "../lib/core";
import { useRouter } from "../lib/router";

/**
 * Editorial service index rows with a Popmotion-sprung floating image
 * preview that chases the cursor (desktop) — images inline on mobile.
 */
export default function Services() {
  const { navigate } = useRouter();
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const anims = useRef<Array<{ stop: () => void } | null>>([null, null, null]);

  const springVal = (
    slot: number,
    current: number,
    target: number,
    apply: (v: number) => void,
    stiff = 170,
    damp = 19
  ) => {
    anims.current[slot]?.stop();
    anims.current[slot] = animate({
      from: current,
      to: target,
      type: "spring",
      stiffness: stiff,
      damping: damp,
      onUpdate: apply,
    });
  };

  const pos = useRef({ x: 0, y: 0, r: 0 });
  const lastX = useRef(0);
  const needSnap = useRef(true);

  const onMove = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;

    if (needSnap.current) {
      needSnap.current = false;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      return;
    }
    const targetR = clamp(dx * 0.55, -11, 11);

    springVal(0, pos.current.x, e.clientX, (v) => {
      pos.current.x = v;
      el.style.left = `${v}px`;
    }, 210, 22);
    springVal(1, pos.current.y, e.clientY, (v) => {
      pos.current.y = v;
      el.style.top = `${v}px`;
    }, 210, 22);
    springVal(2, pos.current.r, targetR, (v) => {
      pos.current.r = v;
      el.style.transform = `translate(-50%, -58%) rotate(${v}deg) scale(${active !== null ? 1 : 0.6})`;
    }, 140, 12);
    window.setTimeout(() => {
      springVal(2, pos.current.r, 0, (v) => {
        pos.current.r = v;
        if (previewRef.current) {
          previewRef.current.style.transform = `translate(-50%, -58%) rotate(${v}deg) scale(${active !== null ? 1 : 0.6})`;
        }
      }, 140, 14);
    }, 90);
  };

  /* eagerly cache hover previews */
  useEffect(() => {
    services.forEach((s) => {
      const im = new Image();
      im.src = s.img;
    });
  }, []);

  useEffect(() => {
    if (active === null) return;
    if (imgRef.current) {
      anime({
        targets: imgRef.current,
        scale: [1.14, 1],
        opacity: [0.4, 1],
        duration: 700,
        easing: "easeOutExpo",
      });
    }
  }, [active]);

  return (
    <section id="services" className="relative overflow-visible py-28 md:py-36" onMouseMove={onMove}>
      <div className="mx-auto w-full max-w-[92rem] px-6 md:px-12">
        {/* header */}
        <div className="mb-16 grid gap-10 md:mb-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p data-reveal className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
              <span className="inline-block h-px w-12 bg-gold" /> The Index
            </p>
            <h2 data-reveal="words" className="font-display text-5xl font-medium leading-[1.02] tracking-[-0.015em] text-ink md:text-7xl">
              <span className="w-line"><span className="w-in">Point,</span></span>{" "}
              <span className="w-line"><span className="w-in">peek,</span></span>{" "}
              <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">proceed.</span></span>
            </h2>
          </div>
          <p data-reveal className="max-w-md text-[17px] leading-relaxed text-moss lg:justify-self-end">
            Skip the quote roulette. Tell us once and we assemble the perfect team — movers,
            haulers, cleaners or all three — under a single accountable roof.
          </p>
        </div>

        {/* rows */}
        <div>
          {services.map((s, i) => (
            <article
              key={s.index}
              className="group border-t border-hairline py-9 transition-colors duration-500 last:border-b hover:bg-paper/70 md:py-11"
              onMouseEnter={() => {
                needSnap.current = true;
                setActive(i);
              }}
              onMouseLeave={() => setActive(null)}
            >
              <div
                data-reveal
                className="flex flex-col gap-6 md:grid md:grid-cols-[70px_1.15fr_1fr_64px] md:items-center md:gap-8"
              >
                <span className="font-display text-lg italic text-gold-deep">({s.index})</span>

                <h3 className="font-display text-4xl font-medium tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-3 md:text-5xl">
                  {s.title}
                </h3>

                <div className="max-w-md">
                  <p className="text-[15px] leading-relaxed text-moss">{s.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink/12 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate("/contact")}
                  aria-label={`Get a quote for ${s.title}`}
                  className="hidden h-14 w-14 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 hover:border-transparent group-hover:bg-pine group-hover:text-gold-light md:flex"
                >
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={2} />
                </button>
              </div>

              {/* inline image (mobile/tablet) */}
              <div data-reveal className="mt-6 overflow-hidden rounded-2xl lg:hidden">
                <img src={s.img} alt={s.alt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* floating preview — popmotion sprung */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed z-40 hidden overflow-hidden rounded-[1.4rem] shadow-[0_48px_90px_-30px_rgba(14,43,32,0.5)] transition-[width,height,opacity] duration-300 lg:block"
        style={{
          width: 350,
          height: 250,
          left: -9999,
          top: -9999,
          opacity: active !== null ? 1 : 0,
          transform: "translate(-50%, -58%)",
        }}
        aria-hidden="true"
      >
        {active !== null && (
          <>
            <img
              ref={imgRef}
              src={services[active].img}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pine/70 to-transparent" />
            <span className="absolute bottom-4 left-5 text-[11px] font-bold uppercase tracking-[0.24em] text-cream">
              {services[active].title}
            </span>
          </>
        )}
      </div>
    </section>
  );
}
