import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import * as mojs from "@mojs/core";
import lottie from "lottie-web/build/player/lottie_light";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { contact, services } from "../data/content";

/* ------------------------------------------------------------------ */
/* Hand-drawn Lottie-light success animation (stroke trim circle+check) */
/* ------------------------------------------------------------------ */
const checkAnimationData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 78,
  w: 240,
  h: 240,
  nm: "success-check",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "ring",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [120, 120, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { d: 1, ty: "el", s: { a: 0, k: [176, 176] }, p: { a: 0, k: [0, 0] } },
            {
              ty: "st",
              c: { a: 0, k: [0.7647, 0.6039, 0.2902, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 12 },
              lc: 2,
              lj: 2,
            },
            {
              ty: "tm",
              s: { a: 0, k: 0 },
              e: {
                a: 1,
                k: [
                  { i: { x: [0.3], y: [1] }, o: { x: [0.7], y: [0] }, t: 2, s: [0] },
                  { t: 44, s: [100] },
                ],
              },
              o: { a: 0, k: 0 },
              m: 1,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: -90 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: "ellipse",
        },
      ],
      ip: 0,
      op: 78,
      st: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "check",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [120, 121, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  c: false,
                  v: [
                    [-40, 0],
                    [-10, 28],
                    [44, -28],
                  ],
                  i: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                  o: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                },
              },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.0549, 0.1686, 0.1255, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 15 },
              lc: 2,
              lj: 2,
            },
            {
              ty: "tm",
              s: { a: 0, k: 0 },
              e: {
                a: 1,
                k: [
                  { i: { x: [0.3], y: [1] }, o: { x: [0.7], y: [0] }, t: 34, s: [0] },
                  { t: 64, s: [100] },
                ],
              },
              o: { a: 0, k: 0 },
              m: 1,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: "check-path",
        },
      ],
      ip: 0,
      op: 78,
      st: 0,
    },
  ],
};

/** Mo.js confetti burst, page coordinates. */
function burst(x: number, y: number, big = false) {
  try {
    const M = mojs as any;
    const Burst = M.Burst || (M.default && M.default.Burst);
    if (!Burst) return;
    new Burst({
      left: x,
      top: y,
      radius: { 0: big ? 140 : 60 },
      count: big ? 20 : 8,
      children: {
        shape: ["circle", "polygon"],
        fill: ["#C39A4A", "#0E2B20", "#E6CA83", "#9A7430"],
        radius: big ? { "rand(5, 10)": 0 } : { 6: 0 },
        scale: { 1: 0.35 },
        duration: big ? 1500 : 800,
        delay: "stagger(0, 22)",
        easing: "cubic.out",
        isForce3d: true,
      },
    }).play();
  } catch {
    /* decorations only */
  }
}

const SIZES = ["Studio / 1-BR", "2-BR Home", "3-BR Home", "4-BR+ Home", "Office", "Other"];
const STEP_LABELS = ["Service", "Details", "You"];

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    service: "",
    size: SIZES[1],
    date: "",
    zip: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [ticket, setTicket] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const stepBodyRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  /* anime.js step transitions */
  useEffect(() => {
    if (done || !stepBodyRef.current) return;
    anime({
      targets: stepBodyRef.current.children,
      opacity: [0, 1],
      translateX: [28, 0],
      delay: anime.stagger(65, { start: 60 }),
      duration: 700,
      easing: "easeOutExpo",
    });
  }, [step, done]);

  /* lottie + mo.js celebration on success */
  useEffect(() => {
    if (!done || !lottieRef.current || !cardRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: checkAnimationData,
    });
    anim.goToAndPlay(0);

    anime({
      targets: ".done-item",
      opacity: [0, 1],
      translateY: [22, 0],
      delay: anime.stagger(90, { start: 250 }),
      duration: 800,
      easing: "easeOutExpo",
    });

    const r = cardRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2 + window.scrollX;
    const cy = r.top + r.height / 3 + window.scrollY;
    burst(cx, cy, true);
    const t2 = window.setTimeout(() => burst(cx + 130, cy - 60, false), 380);
    const t3 = window.setTimeout(() => burst(cx - 140, cy - 30, false), 560);

    return () => {
      anim.destroy();
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [done]);

  const canContinue =
    step === 0
      ? !!form.service
      : step === 1
        ? form.zip.trim().length >= 3
        : form.name.trim().length > 1 && /\S+@\S+\.\S+/.test(form.email);

  const onContinue = () => {
    if (step < 2) {
      if (canContinue) setStep(step + 1);
      return;
    }
    if (!canContinue || submitting) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setTicket(`MC-${2100 + Math.floor(Math.random() * 7800)}`);
      setSubmitting(false);
      setDone(true);
    }, 1500);
  };

  const input =
    "field";
  const label = "mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-moss";

  return (
    <section id="quote" className="relative overflow-hidden py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70rem 40rem at 85% 10%, rgba(195,154,74,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid w-full max-w-[92rem] gap-14 px-6 md:px-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* left copy */}
        <div className="lg:pt-6">
          <p data-reveal className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
            <span className="inline-block h-px w-12 bg-gold" /> Get Started
          </p>
          <h2 data-reveal="words" className="font-display text-5xl font-medium leading-[1.03] tracking-[-0.015em] text-ink md:text-6xl">
            <span className="w-line"><span className="w-in">One</span></span>{" "}
            <span className="w-line"><span className="w-in">clear</span></span>{" "}
            <span className="w-line"><span className="w-in">quote,</span></span>
            <br />
            <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">within</span></span>{" "}
            <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">the</span></span>{" "}
            <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">hour.</span></span>
          </h2>
          <p data-reveal className="mt-7 max-w-md text-[17px] leading-relaxed text-moss">
            Sixty seconds of your time. No obligation, no spam — a coordinator replies with a flat
            quote and a plan.
          </p>

          <div data-reveal className="mt-12 space-y-6">
            {[
              { icon: Phone, label: "Call or text", value: contact.phone },
              { icon: Mail, label: "Email", value: contact.email },
              { icon: MapPin, label: "Headquarters", value: contact.hq },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-paper">
                  <row.icon className="h-5 w-5 text-gold-deep" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-moss">
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-[16px] font-semibold text-ink">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-10 flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-6 py-4">
            <CalendarClock className="h-5 w-5 shrink-0 text-gold-deep" strokeWidth={2} />
            <p className="text-sm font-medium text-ink/80">
              Average first response today: <span className="font-bold text-ink">23 minutes</span>
            </p>
          </div>
        </div>

        {/* form card */}
        <div data-reveal data-delay="140" className="relative">
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-[2rem] border border-hairline bg-white p-8 shadow-[0_60px_120px_-60px_rgba(14,43,32,0.4)] md:p-11"
          >
            {!done ? (
              <>
                {/* progress */}
                <div className="mb-9">
                  <div className="flex items-center justify-between">
                    {STEP_LABELS.map((l, i) => (
                      <span
                        key={l}
                        className={`text-[10px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 ${
                          i <= step ? "text-gold-deep" : "text-ink/30"
                        }`}
                      >
                        {i + 1}. {l}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-ink/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold-light transition-all duration-700 ease-out"
                      style={{ width: `${((step + 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div ref={stepBodyRef} className="min-h-[21rem]">
                  {step === 0 && (
                    <div>
                      <p className={label}>Which service do you need?</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {services.map((s) => {
                          const on = form.service === s.title;
                          return (
                            <button
                              key={s.title}
                              type="button"
                              onClick={(e) => {
                                set("service")(s.title);
                                burst(e.clientX + window.scrollX, e.clientY + window.scrollY);
                              }}
                              className={`rounded-xl border px-5 py-4 text-left text-[14px] font-semibold transition-all duration-300 ${
                                on
                                  ? "border-pine bg-pine text-cream shadow-[0_16px_36px_-16px_rgba(14,43,32,0.55)]"
                                  : "border-ink/12 bg-paper text-ink/75 hover:border-gold hover:text-ink"
                              }`}
                            >
                              {s.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className={label} htmlFor="qf-size">Property size</label>
                          <select
                            id="qf-size"
                            className={input}
                            value={form.size}
                            onChange={(e) => set("size")(e.target.value)}
                          >
                            {SIZES.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={label} htmlFor="qf-date">Preferred date</label>
                          <input
                            id="qf-date"
                            type="date"
                            className={input}
                            value={form.date}
                            onChange={(e) => set("date")(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={label} htmlFor="qf-zip">ZIP code</label>
                        <input
                          id="qf-zip"
                          inputMode="numeric"
                          placeholder="e.g. 78701"
                          className={input}
                          value={form.zip}
                          onChange={(e) => set("zip")(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={label} htmlFor="qf-notes">
                          Notes <span className="normal-case text-ink/35">(optional)</span>
                        </label>
                        <textarea
                          id="qf-notes"
                          rows={3}
                          placeholder="Piano on the second floor, gate code 4412…"
                          className={`${input} resize-none`}
                          value={form.notes}
                          onChange={(e) => set("notes")(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <label className={label} htmlFor="qf-name">Full name</label>
                        <input
                          id="qf-name"
                          placeholder="Jordan Avery"
                          className={input}
                          value={form.name}
                          onChange={(e) => set("name")(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className={label} htmlFor="qf-email">Email</label>
                          <input
                            id="qf-email"
                            type="email"
                            placeholder="you@home.com"
                            className={input}
                            value={form.email}
                            onChange={(e) => set("email")(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={label} htmlFor="qf-phone">
                            Phone <span className="normal-case text-ink/35">(optional)</span>
                          </label>
                          <input
                            id="qf-phone"
                            type="tel"
                            placeholder="(512) 555-0199"
                            className={input}
                            value={form.phone}
                            onChange={(e) => set("phone")(e.target.value)}
                          />
                        </div>
                      </div>
                      <p className="pt-1 text-[12px] leading-relaxed text-moss">
                        By continuing you agree to be contacted about your request. No databases
                        here — this demo stores nothing.
                      </p>
                    </div>
                  )}
                </div>

                {/* actions */}
                <div className="mt-9 flex items-center gap-4">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold-deep"
                      aria-label="Back"
                    >
                      <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onContinue}
                    disabled={!canContinue || submitting}
                    className="btn-gold flex flex-1 items-center justify-between rounded-full px-8 py-4.5 text-[13px] font-bold uppercase tracking-[0.16em] transition-opacity disabled:opacity-45"
                  >
                    {submitting ? (
                      <span className="mx-auto inline-flex items-center gap-3">
                        <Loader2 className="h-4.5 w-4.5 animate-spin" strokeWidth={2.4} />
                        Dispatching…
                      </span>
                    ) : (
                      <>
                        {step < 2 ? "Continue" : "Request My Quote"}
                        <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.4} />
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              /* success state */
              <div className="flex flex-col items-center py-10 text-center">
                <div ref={lottieRef} className="h-44 w-44" aria-hidden="true" />
                <h3 className="done-item -mt-2 font-display text-3xl font-medium text-ink opacity-0">
                  Request received.
                </h3>
                <p className="done-item mt-3 max-w-xs text-[15px] leading-relaxed text-moss opacity-0">
                  Ticket <span className="font-bold text-gold-deep">{ticket}</span> is with a
                  coordinator. Expect a call within the hour.
                </p>
                <p className="done-item mt-2 text-sm text-moss opacity-0">
                  Confirmation sent to <span className="font-semibold text-ink">{form.email}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDone(false);
                    setStep(0);
                    setForm((f) => ({ ...f, service: "", notes: "" }));
                  }}
                  className="done-item mt-8 rounded-full border border-ink/15 px-7 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:text-gold-deep opacity-0"
                >
                  Book Another Request
                </button>
              </div>
            )}
          </div>

          {/* decorative corner */}
          <div
            className="pointer-events-none absolute -right-5 -top-5 h-24 w-24 rounded-[2rem] border border-gold/50"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-5 -left-5 h-24 w-24 rounded-[2rem] border border-gold/50"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
