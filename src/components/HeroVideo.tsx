import { useEffect, useRef } from "react";
import { getProject } from "@theatre/core";
import anime from "animejs";
import { ArrowDown, ArrowUpRight, Headset, ShieldCheck } from "lucide-react";
import { heroVideo } from "../data/content";
import { useRouter } from "../lib/router";
import Magnetic from "./Magnetic";

/* ------------------------------------------------------------------ */
/* Theatre.js project — drives the video un-zoom & overlay lift.       */
/* ------------------------------------------------------------------ */
const introState = {
  definitionVersion: "0.4.0",
  revisionHistory: ["v1"],
  sheetsById: {
    Film: {
      staticOverrides: { byObject: {} },
      sequence: {
        subUnitsPerUnit: 30,
        length: 3,
        type: "PositionalSequence",
        tracksByObject: {
          film: {
            trackData: {
              trZoom: {
                type: "BasicKeyframedTrack",
                __debugName: 'film:["zoom"]',
                keyframes: [
                  { id: "k1", position: 0, connectedRight: true, handles: [0.5, 1, 0.22, 0], type: "bezier", value: 0 },
                  { id: "k2", position: 2.8, connectedRight: false, handles: [0.5, 1, 0.5, 0], type: "bezier", value: 1 },
                ],
              },
              trDim: {
                type: "BasicKeyframedTrack",
                __debugName: 'film:["dim"]',
                keyframes: [
                  { id: "k3", position: 0, connectedRight: true, handles: [0.5, 1, 0.35, 0], type: "bezier", value: 0 },
                  { id: "k4", position: 2.2, connectedRight: false, handles: [0.5, 1, 0.5, 0], type: "bezier", value: 1 },
                ],
              },
            },
            trackIdByPropPath: { '["zoom"]': "trZoom", '["dim"]': "trDim" },
          },
        },
      },
    },
  },
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function HeroVideo({ ready }: { ready: boolean }) {
  const { navigate } = useRouter();
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const intro = useRef({ zoom: 0, dim: 0 });

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;

    const apply = () => {
      const { zoom, dim } = intro.current;
      const v = videoRef.current;
      const veil = veilRef.current;
      if (v) v.style.transform = `scale(${1.22 - 0.22 * easeOutCubic(zoom)})`;
      if (veil) veil.style.opacity = String(0.86 - 0.52 * easeOutCubic(dim));
    };

    const fallback = () => {
      anime({
        targets: intro.current,
        zoom: 1,
        dim: 1,
        duration: 2800,
        easing: "easeOutQuart",
        update: apply,
      });
    };

    try {
      const project: any = getProject("mc-video-hero", { state: introState });
      const sheet = project.sheet("Film");
      const obj = sheet.object("film", { zoom: 0, dim: 0 });
      obj.onValuesChange((v: { zoom: number; dim: number }) => {
        if (cancelled) return;
        intro.current = v;
        apply();
      });
      const r = sheet.sequence.play({ range: [0, 3] });
      if (r && typeof r.catch === "function") r.catch(() => {});
      window.setTimeout(() => {
        if (!cancelled && intro.current.zoom < 0.04) fallback();
      }, 900);
    } catch {
      fallback();
    }

    /* DOM entrance — anime.js */
    const root = rootRef.current;
    const tl = anime.timeline({ autoplay: true });
    tl.add({
      targets: root?.querySelectorAll(".hero-h .w-in"),
      translateY: ["130%", "0%"],
      delay: anime.stagger(46, { start: 420 }),
      duration: 1250,
      easing: "easeOutQuint",
    }).add(
      {
        targets: root?.querySelectorAll("[data-hero-fade]"),
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(110),
        duration: 1000,
        easing: "easeOutExpo",
      },
      "-=950"
    );

    videoRef.current?.play().catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [ready]);

  return (
    <section ref={rootRef} className="relative flex min-h-svh flex-col overflow-hidden">
      {/* film */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <video
          ref={videoRef}
          className="h-full w-full scale-[1.22] object-cover will-change-transform"
          src={heroVideo.sd}
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* champagne veil */}
        <div
          ref={veilRef}
          className="absolute inset-0 bg-gradient-to-b from-cream via-[#efe7d7]/75 to-cream"
          style={{ opacity: 0.86 }}
        />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-cream via-cream/85 to-transparent" />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[92rem] flex-1 flex-col justify-center px-6 pb-24 pt-36 md:px-12">
        <div className="pointer-events-auto max-w-4xl">
          <div data-hero-fade className="mb-9 flex items-center gap-4 opacity-0">
            <span className="inline-block h-px w-14 bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-moss">
              White-Glove Service Coordination
            </span>
          </div>

          <h1 className="hero-h font-display text-[clamp(3.1rem,8.2vw,7.4rem)] font-medium leading-[0.99] tracking-[-0.02em] text-ink">
            <span className="w-line"><span className="w-in">Every</span></span>{" "}
            <span className="w-line"><span className="w-in">move,</span></span>
            <br />
            <span className="w-line">
              <span className="w-in bg-gradient-to-r from-gold-deep via-[#d9b96c] to-gold-deep bg-clip-text font-light italic text-transparent">
                flawlessly
              </span>
            </span>{" "}
            <span className="w-line">
              <span className="w-in bg-gradient-to-r from-gold-deep via-[#d9b96c] to-gold-deep bg-clip-text font-light italic text-transparent">
                orchestrated.
              </span>
            </span>
          </h1>

          <p data-hero-fade className="mt-9 max-w-xl text-lg leading-relaxed text-moss opacity-0">
            Movers &amp; Cleanout Crew pairs your home with vetted moving, cleanout and cleaning
            crews — then conducts every detail from first box to final polish.
          </p>

          <div data-hero-fade className="mt-11 flex flex-wrap items-center gap-5 opacity-0">
            <Magnetic strength={0.28}>
              <button
                onClick={() => navigate("/contact")}
                className="btn-gold inline-flex items-center gap-3 rounded-full px-9 py-4.5 text-[13px] font-bold uppercase tracking-[0.16em]"
              >
                Request Your Quote
                <ArrowUpRight className="h-4.5 w-4.5" strokeWidth={2.4} />
              </button>
            </Magnetic>
            <Magnetic strength={0.28}>
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-9 py-4.5 text-[13px] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-gold hover:text-gold-deep"
              >
                Explore Services
              </button>
            </Magnetic>
          </div>

          <div
            data-hero-fade
            className="mt-16 grid max-w-2xl grid-cols-3 divide-x divide-ink/12 border-t border-ink/12 pt-8 opacity-0"
          >
            {[
              ["12.4k", "Projects done"],
              ["480+", "Vetted crews"],
              ["4.9 / 5", "Client rating"],
            ].map(([v, l], i) => (
              <div key={l} className={i === 0 ? "pr-6" : "px-6"}>
                <p className="font-display text-3xl text-ink md:text-4xl">{v}</p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-moss">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating chips */}
      <div
        data-hero-fade
        className="float-soft absolute right-[10%] top-[26%] z-10 hidden items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-5 py-3.5 shadow-[0_24px_60px_-30px_rgba(24,36,32,0.4)] backdrop-blur-md lg:flex"
      >
        <ShieldCheck className="h-5 w-5 text-gold-deep" strokeWidth={2} />
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink/80">
          Licensed &amp; Insured
        </span>
      </div>
      <div
        data-hero-fade
        className="float-soft absolute bottom-[32%] right-[17%] z-10 hidden items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-5 py-3.5 shadow-[0_24px_60px_-30px_rgba(24,36,32,0.4)] backdrop-blur-md lg:flex"
        style={{ animationDelay: "-2.6s" }}
      >
        <Headset className="h-5 w-5 text-gold-deep" strokeWidth={2} />
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink/80">
          Coordinator On-Call
        </span>
      </div>

      {/* film credit */}
      <p
        data-hero-fade
        className="absolute bottom-24 right-8 z-10 hidden text-[10px] uppercase tracking-[0.3em] text-ink/40 opacity-0 lg:block"
      >
        {heroVideo.credit}
      </p>

      {/* scroll cue */}
      <div className="absolute bottom-9 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15">
          <ArrowDown className="h-4 w-4 animate-bounce text-gold-deep" strokeWidth={2} />
        </span>
      </div>
    </section>
  );
}
