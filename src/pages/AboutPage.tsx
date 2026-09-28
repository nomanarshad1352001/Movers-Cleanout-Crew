import {
  ArrowUpRight,
  Clock3,
  Gem,
  HeartHandshake,
  Recycle,
} from "lucide-react";
import PageHero from "../components/PageHero";
import Stats from "../components/Stats";
import Cta from "../components/Cta";
import Magnetic from "../components/Magnetic";
import {
  aboutVideo,
  emptyRoomImg,
  meetingImg,
  officeImg,
  providerImg,
  teamImg,
} from "../data/content";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Care, Conducted",
    body: "Every crew is trained to treat keepsakes, floors and doorways like their own grandmother's.",
  },
  {
    icon: Clock3,
    title: "Punctual by Design",
    body: "Arrival windows are 30 minutes, not four hours. Statistically boring. Gloriously boring.",
  },
  {
    icon: Gem,
    title: "Transparent Pricing",
    body: "Flat quotes with every line item explained before a single box is taped. No surprise fees, ever.",
  },
  {
    icon: Recycle,
    title: "Donation-First",
    body: "Sixty-eight percent of what we haul finds a second home through 40+ charity partners.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Since 2016 · Austin, TX"
        titleLeft="The art of"
        titleRight="the smooth move."
        copy="Movers & Cleanout Crew began with a single coordinator, a Rolodex of good people, and a stubborn belief: moving day should feel like hospitality, not logistics."
        img={officeImg}
        imgAlt="The M&C coordination team in a bright loft office"
      />

      {/* story collage */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[92rem] items-center gap-16 px-6 md:px-12 lg:grid-cols-2">
          <div>
            <p data-reveal className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
              <span className="inline-block h-px w-12 bg-gold" /> Our Story
            </p>
            <h2 data-reveal="words" className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-ink md:text-5xl">
              <span className="w-line"><span className="w-in">A</span></span>{" "}
              <span className="w-line"><span className="w-in">Rolodex</span></span>{" "}
              <span className="w-line"><span className="w-in">of</span></span>{" "}
              <span className="w-line"><span className="w-in">good</span></span>{" "}
              <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">people.</span></span>
            </h2>
            <div data-reveal className="mt-7 max-w-lg space-y-5 text-[16px] leading-relaxed text-moss">
              <p>
                Ten years ago our founder spent a summer booking movers out of a kitchen drawer —
                matching the careful crew to the nervous homeowner, the strong backs to the
                baby grand, the gentle hands to the estate sale. Word traveled.
              </p>
              <p>
                Today, 40 coordinators across 38 cities curate 480+ vetted crews. The tools are
                fancier now, but the rule never changed: only send people we'd let into our own
                mother's house.
              </p>
            </div>
          </div>

          <div className="relative">
            <div data-reveal className="overflow-hidden rounded-[1.8rem]">
              <img src={meetingImg} alt="Team meeting in a modern loft" loading="lazy" className="aspect-[4/3.4] w-full object-cover" />
            </div>
            <div
              data-reveal
              data-delay="150"
              className="absolute -bottom-10 -left-4 w-44 overflow-hidden rounded-[1.3rem] border-4 border-cream shadow-[0_36px_70px_-34px_rgba(14,43,32,0.55)] md:-left-10 md:w-60"
            >
              <img src={teamImg} alt="Two movers smiling from their van window" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div
              className="pointer-events-none absolute -right-5 -top-5 -z-10 h-2/3 w-2/3 rounded-[1.8rem] border border-gold/50"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* film strip */}
      <section className="relative my-4 overflow-hidden md:my-8">
        <div data-reveal className="relative mx-auto w-full max-w-[92rem] px-6 md:px-12">
          <div className="relative h-[22rem] overflow-hidden rounded-[2rem] md:h-[30rem]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={aboutVideo.src}
              poster={aboutVideo.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine/80 via-pine/30 to-pine/20" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-8 md:p-12">
              <p className="max-w-lg font-display text-3xl font-light italic leading-snug text-cream md:text-4xl">
                “We don't sell moving. We sell the morning after — when it's all just… done.”
              </p>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light">
                — Dana Whitfield, Founder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-[92rem] px-6 md:px-12">
          <p data-reveal className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
            <span className="inline-block h-px w-12 bg-gold" /> What We Refuse to Compromise
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <article
                key={v.title}
                data-reveal
                data-delay={String(i * 110)}
                className="group rounded-[1.6rem] border border-hairline bg-paper p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_70px_-40px_rgba(14,43,32,0.4)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-cream">
                  <v.icon className="h-5.5 w-5.5 text-gold-deep" strokeWidth={2} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium text-ink">{v.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-moss">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      {/* provider recruitment */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-[92rem] px-6 md:px-12">
          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            <div data-reveal className="relative min-h-[24rem] overflow-hidden rounded-[2rem]">
              <img src={providerImg} alt="A mover standing proudly beside the company van" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div data-reveal data-delay="130" className="flex flex-col justify-center rounded-[2rem] bg-pine p-10 md:p-14">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-gold-light">
                For Providers
              </p>
              <h3 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream md:text-5xl">
                Run a five-star crew? We keep your calendar full.
              </h3>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-cream/70">
                Join the network and receive steady, pre-qualified jobs in your city — scheduled,
                scoped and paid on time, every time.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Magnetic strength={0.24}>
                  <a
                    href="mailto:crews@moverscleanoutcrew.com"
                    className="btn-gold inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em]"
                  >
                    Apply to Join
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
                  </a>
                </Magnetic>
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-cream/60">
                  480+ crews · 38 cities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* after-photo strip */}
        <div className="mx-auto mt-16 w-full max-w-[92rem] px-6 md:px-12">
          <div data-reveal className="relative overflow-hidden rounded-[2rem]">
            <img src={emptyRoomImg} alt="A decluttered bright room after a cleanout" loading="lazy" className="aspect-[16/6] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-pine/70 via-transparent to-transparent" />
            <p className="absolute left-8 top-1/2 max-w-sm -translate-y-1/2 font-display text-3xl font-light italic text-cream md:left-12 md:text-4xl">
              The after photo is our business model.
            </p>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
