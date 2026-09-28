import { ArrowRight, ArrowUpRight, Boxes, Recycle, Sparkles } from "lucide-react";
import HeroVideo from "../components/HeroVideo";
import Ticker from "../components/Ticker";
import GalleryRail from "../components/GalleryRail";
import Testimonials from "../components/Testimonials";
import Cta from "../components/Cta";
import Magnetic from "../components/Magnetic";
import { useRouter } from "../lib/router";
import { services } from "../data/content";

const FEATURED = [
  {
    icon: Boxes,
    title: "Moving",
    copy: "White-glove local & long-distance moving with room-by-room placement.",
    img: services[0].img,
    alt: services[0].alt,
  },
  {
    icon: Recycle,
    title: "Cleanouts & Junk",
    copy: "Estate cleanouts and same-day hauling, donation-sorted before the dump.",
    img: services[1].img,
    alt: services[1].alt,
  },
  {
    icon: Sparkles,
    title: "Cleaning",
    copy: "Move-in / move-out detailing that leaves every surface showing-ready.",
    img: services[3].img,
    alt: services[3].alt,
  },
];

export default function Home({ ready }: { ready: boolean }) {
  const { navigate } = useRouter();

  return (
    <>
      <HeroVideo ready={ready} />
      <Ticker />

      {/* story split */}
      <section className="py-28 md:py-36">
        <div className="mx-auto grid w-full max-w-[92rem] items-center gap-16 px-6 md:px-12 lg:grid-cols-2">
          <div className="relative">
            <div data-reveal className="overflow-hidden rounded-[2rem]">
              <img
                src={services[0].img}
                alt="Movers carrying boxes in a bright home"
                loading="lazy"
                className="aspect-[4/4.6] w-full object-cover"
              />
            </div>
            <div
              data-reveal
              data-delay="140"
              className="absolute -bottom-10 -right-4 w-48 overflow-hidden rounded-[1.4rem] border-4 border-cream shadow-[0_36px_70px_-34px_rgba(14,43,32,0.55)] md:-right-10 md:w-64"
            >
              <img
                src={services[5].img}
                alt="Volunteers sorting donated goods"
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div
              className="pointer-events-none absolute -left-5 -top-5 -z-10 h-2/3 w-2/3 rounded-[2rem] border border-gold/50"
              aria-hidden="true"
            />
          </div>

          <div>
            <p data-reveal className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
              <span className="inline-block h-px w-12 bg-gold" /> Who We Are
            </p>
            <h2 data-reveal="words" className="font-display text-5xl font-medium leading-[1.03] tracking-[-0.015em] text-ink md:text-6xl">
              <span className="w-line"><span className="w-in">Not</span></span>{" "}
              <span className="w-line"><span className="w-in">movers.</span></span>{" "}
              <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">The</span></span>{" "}
              <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">conductor.</span></span>
            </h2>
            <p data-reveal className="mt-7 max-w-lg text-[17px] leading-relaxed text-moss">
              We're the calm voice between you and the chaos. One coordinator books, schedules and
              quality-controls the best local crews in your city — so moving day feels like a
              hotel check-in, not a hostage negotiation.
            </p>
            <ul data-reveal className="mt-8 space-y-4">
              {[
                "Flat, transparent quotes delivered within the hour",
                "Vetted, insured, background-checked provider crews",
                "Donation-first disposal keeps goods in homes, not landfills",
              ].map((t) => (
                <li key={t} className="flex items-start gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span className="text-[16px] font-medium text-ink/85">{t}</span>
                </li>
              ))}
            </ul>
            <div data-reveal data-delay="140" className="mt-10">
              <Magnetic strength={0.24}>
                <button
                  onClick={() => navigate("/about")}
                  className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:text-gold-deep"
                >
                  Our Story
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* featured services */}
      <section className="bg-paper py-28 md:py-36">
        <div className="mx-auto w-full max-w-[92rem] px-6 md:px-12">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
            <div>
              <p data-reveal className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
                <span className="inline-block h-px w-12 bg-gold" /> Signature Coordination
              </p>
              <h2 data-reveal="words" className="font-display text-5xl font-medium leading-[1.02] tracking-[-0.015em] text-ink md:text-6xl">
                <span className="w-line"><span className="w-in">Three</span></span>{" "}
                <span className="w-line"><span className="w-in">ways</span></span>{" "}
                <span className="w-line"><span className="w-in">we</span></span>
                <br />
                <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">lift</span></span>{" "}
                <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">the</span></span>{" "}
                <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">weight.</span></span>
              </h2>
            </div>
            <div data-reveal>
              <button
                onClick={() => navigate("/services")}
                className="link-sweep inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-ink/80"
              >
                All six services
                <ArrowUpRight className="h-4.5 w-4.5 text-gold-deep" strokeWidth={2.2} />
              </button>
            </div>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {FEATURED.map((f, i) => (
              <article
                key={f.title}
                data-reveal
                data-delay={String(i * 120)}
                onClick={() => navigate("/services")}
                className="group relative overflow-hidden rounded-[1.8rem] bg-ink"
                role="button"
                tabIndex={0}
                aria-label={`Explore ${f.title}`}
              >
                <img
                  src={f.img}
                  alt={f.alt}
                  loading="lazy"
                  className="aspect-[3/3.8] w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-pine/60 backdrop-blur-sm">
                    <f.icon className="h-5 w-5 text-gold-light" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-medium text-cream">{f.title}</h3>
                  <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-cream/70">{f.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-light">
                    Explore
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={2.2} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GalleryRail />
      <Testimonials />
      <Cta />
    </>
  );
}
