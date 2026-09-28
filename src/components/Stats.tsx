import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { countUp } from "../anim/reveal";
import { stats } from "../data/content";

/** Deep-green proof band — PixiJS constellation behind anime.js counters. */
export default function Stats() {
  const pixiHost = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* PixiJS particle constellation */
  useEffect(() => {
    const host = pixiHost.current;
    if (!host) return;

    const app = new PIXI.Application({
      backgroundAlpha: 0,
      antialias: true,
      resizeTo: host,
      autoDensity: true,
      resolution: Math.min(window.devicePixelRatio, 2),
    });
    host.appendChild(app.view as HTMLCanvasElement);

    const N = 60;
    const pts: Array<{ x: number; y: number; vx: number; vy: number; r: number; gold: boolean }> = [];
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * host.clientWidth,
        y: Math.random() * host.clientHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.2 + Math.random() * 1.8,
        gold: Math.random() < 0.22,
      });
    }
    const g = new PIXI.Graphics();
    app.stage.addChild(g);

    const tick = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      g.clear();
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            g.lineStyle(1, 0xc39a4a, (1 - d / 130) * 0.22);
            g.moveTo(a.x, a.y);
            g.lineTo(b.x, b.y);
          }
        }
      }
      g.lineStyle(0);
      for (const p of pts) {
        g.beginFill(p.gold ? 0xc39a4a : 0xe6ca83, p.gold ? 0.8 : 0.42);
        g.drawCircle(p.x, p.y, p.r);
        g.endFill();
      }
    };
    app.ticker.add(tick);

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting ?? true;
        if (vis) app.ticker.start();
        else app.ticker.stop();
      },
      { threshold: 0 }
    );
    io.observe(host);

    return () => {
      io.disconnect();
      app.destroy(true, { children: true, texture: false, baseTexture: false } as never);
    };
  }, []);

  /* anime.js counters once visible */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        grid.querySelectorAll<HTMLElement>("[data-count]").forEach((el, i) => {
          countUp(el, parseFloat(el.dataset.count || "0"), {
            decimals: parseInt(el.dataset.decimals || "0", 10),
            delay: i * 140,
          });
        });
      },
      { threshold: 0.3 }
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section id="stats" className="relative overflow-hidden bg-pine py-28 md:py-32">
      <div ref={pixiHost} className="absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90rem 40rem at 50% 130%, rgba(195,154,74,0.16), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[92rem] px-6 md:px-12">
        <p data-reveal className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-light">
          <span className="inline-block h-px w-12 bg-gold" /> Proof in Numbers
        </p>
        <h2 data-reveal="words" className="max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-cream md:text-6xl">
          <span className="w-line"><span className="w-in">Reliability</span></span>{" "}
          <span className="w-line"><span className="w-in">you</span></span>{" "}
          <span className="w-line"><span className="w-in">can</span></span>{" "}
          <span className="w-line"><span className="w-in">set</span></span>{" "}
          <span className="w-line"><span className="w-in">a</span></span>{" "}
          <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-light to-gold bg-clip-text font-light italic text-transparent">watch</span></span>{" "}
          <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-light to-gold bg-clip-text font-light italic text-transparent">by.</span></span>
        </h2>

        <div ref={gridRef} className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal data-delay={String(i * 90)} className="border-t border-cream/15 pt-6">
              <p className="font-display text-5xl font-light text-cream md:text-[4.2rem] md:leading-none">
                <span data-count={String(s.value)} data-decimals={String(s.decimals || 0)}>
                  0
                </span>
                <span className="text-gold-light">{s.suffix}</span>
              </p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.24em] text-cream/55">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
