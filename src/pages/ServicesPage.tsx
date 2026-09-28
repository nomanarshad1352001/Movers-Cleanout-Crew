import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import PageHero from "../components/PageHero";
import Services from "../components/Services";
import Cta from "../components/Cta";
import { callCenterImg, faqs, services } from "../data/content";
import { useRouter } from "../lib/router";

/* ------------------------------------------------------------------ */
/* FAQ accordion rows — anime.js height animation                      */
/* ------------------------------------------------------------------ */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const bodies = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    // close current
    if (open !== null) {
      const el = bodies.current[open];
      if (el) {
        anime({
          targets: el,
          height: [el.scrollHeight, 0],
          opacity: [1, 0],
          duration: 450,
          easing: "easeInOutQuart",
        });
      }
    }
    setOpen(next);
  };

  useEffect(() => {
    if (open === null) return;
    const el = bodies.current[open];
    if (!el) return;
    anime({
      targets: el,
      height: [0, el.scrollHeight],
      opacity: [0, 1],
      duration: 550,
      easing: "easeOutExpo",
      complete: () => {
        el.style.height = "auto";
      },
    });
  }, [open]);

  return (
    <section className="mx-auto w-full max-w-[92rem] px-6 py-24 md:px-12 md:py-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p data-reveal className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
            <span className="inline-block h-px w-12 bg-gold" /> Good Questions
          </p>
          <h2 data-reveal="words" className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-ink md:text-5xl">
            <span className="w-line"><span className="w-in">Answers,</span></span>
            <br />
            <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">before</span></span>{" "}
            <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">you</span></span>{" "}
            <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">ask.</span></span>
          </h2>
        </div>

        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} data-reveal className="border-b border-hairline first:border-t">
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-display text-2xl transition-colors duration-300 md:text-[1.7rem] ${isOpen ? "text-gold-deep" : "text-ink"}`}>
                    {f.q}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen ? "rotate-45 border-gold bg-gold/15 text-gold-deep" : "border-ink/15 text-ink"
                    }`}
                  >
                    <Plus className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </span>
                </button>
                <div
                  ref={(el) => {
                    bodies.current[i] = el;
                  }}
                  className="overflow-hidden"
                  style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                >
                  <p className="max-w-2xl pb-8 text-[15.5px] leading-relaxed text-moss">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Detail blocks — image left/right with bullets & pricing chip        */
/* ------------------------------------------------------------------ */
function ServiceDetails() {
  const { navigate } = useRouter();

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto w-full max-w-[92rem] space-y-24 px-6 md:space-y-32 md:px-12">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={s.index}
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                flip ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative">
                {/* 6-photo bento gallery */}
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {s.gallery.map((g, gi) => {
                    const isMain = gi === 0;
                    return (
                      <figure
                        key={g.img}
                        data-reveal
                        data-delay={String(gi * 100)}
                        className={`group/fig relative overflow-hidden ${
                          isMain
                            ? "col-span-2 row-span-2 rounded-[1.6rem]"
                            : "aspect-square rounded-[1.1rem]"
                        }`}
                      >
                        <img
                          src={g.img}
                          alt={g.alt}
                          loading={gi < 3 ? "eager" : "lazy"}
                          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover/fig:scale-[1.08] ${
                            isMain ? "" : "grayscale-[30%] group-hover/fig:grayscale-0"
                          }`}
                        />
                        <div
                          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-ink/8 transition-all duration-500 group-hover/fig:ring-gold/60"
                          aria-hidden="true"
                        />
                        {isMain && (
                          <>
                            <div
                              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pine/55 to-transparent"
                              aria-hidden="true"
                            />
                            <figcaption className="absolute bottom-4 left-4 rounded-full bg-pine/80 px-4.5 py-2 backdrop-blur-sm">
                              <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-gold-light">
                                {s.price} <span className="text-cream/55">· {s.time}</span>
                              </span>
                            </figcaption>
                          </>
                        )}
                      </figure>
                    );
                  })}
                </div>
                <div
                  className={`pointer-events-none absolute -top-4 -z-10 h-full w-full rounded-[1.8rem] border border-gold/50 ${
                    flip ? "-right-4" : "-left-4"
                  }`}
                  aria-hidden="true"
                />
              </div>

              <div className={flip ? "lg:pr-6" : "lg:pl-6"}>
                <p data-reveal className="font-display text-lg italic text-gold-deep">
                  ({s.index})
                </p>
                <h3 data-reveal className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
                  {s.title}
                </h3>
                <p data-reveal className="mt-5 max-w-lg text-[16px] leading-relaxed text-moss">
                  {s.blurb}
                </p>
                <ul data-reveal className="mt-7 space-y-4">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-gold/15">
                        <Check className="h-3.5 w-3.5 text-gold-deep" strokeWidth={3} />
                      </span>
                      <span className="text-[15px] font-medium text-ink/85">{p}</span>
                    </li>
                  ))}
                </ul>
                <div data-reveal data-delay="100" className="mt-9 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn-gold inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em]"
                  >
                    Get a Quote
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
                  </button>
                  <div className="flex flex-wrap gap-2">
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Six Disciplines · One Standard"
        titleLeft="One call."
        titleRight="Every crew."
        copy="From two-man moves to full estate cleanouts, every discipline below is booked, scheduled and quality-controlled by a single accountable coordinator — under one flat quote."
        img={callCenterImg}
        imgAlt="Coordinator team assembling crews in a bright modern office"
      />
      {/* editorial index rows with floating preview */}
      <Services />
      <ServiceDetails />
      <Faq />
      <Cta />
    </>
  );
}
