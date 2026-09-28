import { useEffect, useRef, useState } from "react";
import anime from "animejs";

/** Curtain preloader — anime.js counter, gold progress, twin-panel exit. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);
  const inner = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const obj = { v: 0 };
    let started = false;

    const beginExit = () => {
      if (started) return;
      started = true;
      document.body.style.overflow = "";
      onDone();
    };

    const tl = anime.timeline({
      complete: () => {
        document.body.style.overflow = "";
        setGone(true);
      },
    });

    tl.add(
      {
        targets: obj,
        v: 100,
        duration: 2100,
        round: 1,
        easing: "easeInOutExpo",
        update: () => {
          if (num.current) num.current.textContent = String(obj.v).padStart(3, "0");
          if (bar.current) bar.current.style.transform = `scaleX(${obj.v / 100})`;
        },
      },
      0
    )
      .add(
        {
          targets: inner.current,
          opacity: [1, 0],
          translateY: [0, -34],
          duration: 520,
          easing: "easeInQuart",
        },
        "+=320"
      )
      .add(
        {
          targets: ".pre-panel",
          translateY: ["0%", "-101%"],
          duration: 980,
          delay: anime.stagger(140),
          easing: "easeInOutQuint",
          begin: beginExit,
        },
        "-=120"
      );

    /* hard fallback — never trap the visitor */
    const failsafe = window.setTimeout(() => {
      beginExit();
      setGone(true);
    }, 6500);

    return () => {
      window.clearTimeout(failsafe);
      document.body.style.overflow = "";
      (tl as unknown as { pause?: () => void }).pause?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden="true">
      <div className="pre-panel absolute inset-y-0 left-0 w-1/2 bg-pine" />
      <div className="pre-panel absolute inset-y-0 right-0 w-1/2 bg-pine" />

      <div ref={inner} className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <svg viewBox="0 0 40 40" className="h-16 w-16">
          <rect
            x="8"
            y="8"
            width="24"
            height="24"
            rx="2"
            transform="rotate(45 20 20)"
            fill="none"
            stroke="#C39A4A"
            strokeWidth="1.6"
          />
          <path
            d="M13 26V14.5l7 6 7-6V26"
            stroke="#F6F1E8"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="text-center">
          <p className="font-display text-2xl text-cream">Movers &amp; Cleanout Crew</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.45em] text-gold-light/70">
            Curating your experience
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span ref={num} className="font-display text-6xl font-light tabular-nums text-cream/90">
            000
          </span>
          <div className="h-px w-48 overflow-hidden bg-cream/15">
            <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
