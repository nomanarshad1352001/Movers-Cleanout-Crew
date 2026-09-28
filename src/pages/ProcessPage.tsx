import { useEffect, useRef } from "react";
import { BadgeCheck, CheckCircle2, ClipboardList, Phone, Sparkles } from "lucide-react";
import PageHero from "../components/PageHero";
import Cta from "../components/Cta";
import Magnetic from "../components/Magnetic";
import { useRouter } from "../lib/router";
import { contact, guarantees, steps, agentImg } from "../data/content";
import { clamp } from "../lib/core";

const ICONS = [ClipboardList, BadgeCheck, Sparkles];

export default function ProcessPage() {
  const { navigate } = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      const line = progRef.current;
      if (!el || !line) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.72 - r.top) / (r.height * 0.92), 0, 1);
      line.style.transform = `scaleY(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <PageHero
        kicker="How It Works"
        titleLeft="Concierge-simple,"
        titleRight="start to finish."
        copy="One coordinator owns your job end-to-end. You get a single quote, a single point of contact, and a single standard: immaculate."
        img={agentImg}
        imgAlt="A coordinator handling a customer request"
      />

      {/* steps with imagery */}
      <section ref={sectionRef} className="py-8 md:py-12">
        <div className="mx-auto w-full max-w-[92rem] px-6 md:px-12">
          <div className="relative">
            <div className="absolute bottom-8 left-1/2 hidden w-px -translate-x-1/2 bg-hairline lg:block" aria-hidden="true" />
            <div
              ref={progRef}
              className="absolute bottom-8 left-1/2 hidden w-px origin-top -translate-x-1/2 bg-gradient-to-b from-gold-deep via-gold to-gold-light lg:block"
              style={{ transform: "scaleY(0)" }}
              aria-hidden="true"
            />

            {steps.map((s, i) => {
              const Icon = ICONS[i];
              const flip = i % 2 === 1;
              return (
                <div
                  key={s.index}
                  className={`grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-24 ${
                    flip ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div data-reveal className="relative">
                    <div className="overflow-hidden rounded-[1.8rem]">
                      <img
                        src={s.img}
                        alt={s.alt}
                        loading="lazy"
                        className="aspect-[4/3.3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                      />
                    </div>
                    <div className="absolute -bottom-6 right-6 flex h-20 w-20 items-center justify-center rounded-full bg-pine shadow-[0_24px_50px_-20px_rgba(14,43,32,0.65)]">
                      <span className="font-display text-2xl italic text-gold-light">{s.index}</span>
                    </div>
                  </div>

                  <div className={flip ? "lg:pr-8" : "lg:pl-8"}>
                    <div data-reveal className="mb-4 flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gold" strokeWidth={2} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-moss">
                        Step {s.index}
                      </span>
                    </div>
                    <h2 data-reveal="words" className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-ink md:text-5xl">
                      {s.title.split(" ").map((w) => (
                        <span key={w} className="w-line">
                          <span className="w-in">{w}</span>
                        </span>
                      ))}
                    </h2>
                    <p data-reveal className="mt-5 max-w-lg text-[16px] leading-relaxed text-moss">
                      {s.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* guarantee + call band */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[92rem] gap-8 px-6 md:px-12 lg:grid-cols-2">
          <div data-reveal className="flex flex-col justify-between rounded-[2rem] border border-hairline bg-paper p-10 md:p-14">
            <div>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-gold-deep">
                The White-Glove Guarantee
              </p>
              <h3 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-5xl">
                Every crew held to a hotel standard.
              </h3>
              <ul className="mt-10 space-y-5">
                {guarantees.map((g) => (
                  <li key={g} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-5.5 w-5.5 shrink-0 text-gold" strokeWidth={2} />
                    <span className="text-[16px] font-medium text-ink/85">{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-12 border-t border-hairline pt-6 text-sm leading-relaxed text-moss">
              Providers are re-audited every 90 days. Fall below a 4.7 client rating twice, and
              you're off the roster — no exceptions.
            </p>
          </div>

          <div data-reveal data-delay="130" className="flex flex-col justify-center rounded-[2rem] bg-pine p-10 md:p-14">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-gold-light">
              Prefer to talk?
            </p>
            <p className="font-display text-5xl font-light text-cream md:text-6xl">{contact.phone}</p>
            <p className="mt-3 text-[15px] text-cream/60">{contact.hours}</p>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-cream/70">
              A coordinator answers in three rings or fewer. If we miss you, a call-back lands
              within 15 minutes — timed, not promised.
            </p>
            <div className="mt-10">
              <Magnetic strength={0.22}>
                <button
                  onClick={() => navigate("/contact")}
                  className="btn-gold inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em]"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.4} />
                  Book a Call Back
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
