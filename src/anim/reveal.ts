import anime from "animejs";

/**
 * Scroll-triggered reveals powered by anime.js.
 * - [data-reveal]        → fade + rise
 * - [data-reveal="words"]→ staggers inner .w-in word spans upward
 * - [data-reveal="draw"] → scaleX draw (for rules/lines)
 */
export function initReveals(root: ParentNode = document): () => void {
  if (typeof IntersectionObserver === "undefined") return () => {};

  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

  /* deterministic fallback — scroll events always fire, even when IO
     delivery lags behind programmatic jumps */
  const check = () => {
    els.forEach((el) => {
      if (el.dataset.animDone === "1") return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top < vh * 0.94 && r.bottom > 0) {
        io.unobserve(el);
        play(el);
      }
    });
  };
  let tickQueued = false;
  const onScroll = () => {
    if (tickQueued) return;
    tickQueued = true;
    requestAnimationFrame(() => {
      tickQueued = false;
      check();
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        play(el);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
  );

  els.forEach((el) => {
    if (el.dataset.animDone === "1") return;
    prep(el);
    io.observe(el);
  });

  /* safety sweep on init */
  const sweep = window.setTimeout(check, 700);

  return () => {
    window.clearTimeout(sweep);
    window.removeEventListener("scroll", onScroll);
    io.disconnect();
  };
}

function prep(el: HTMLElement) {
  const kind = el.dataset.reveal || "fade";
  if (kind === "words") {
    el.style.opacity = "1";
  } else if (kind === "draw") {
    el.style.transform = "scaleX(0)";
    el.style.transformOrigin = el.dataset.origin || "left";
    el.style.opacity = "1";
  } else {
    el.style.opacity = "0";
    el.style.transform = `translateY(${el.dataset.distance || "48"}px)`;
  }
}

function play(el: HTMLElement) {
  const kind = el.dataset.reveal || "fade";
  const delay = parseFloat(el.dataset.delay || "0");
  el.dataset.animDone = "1";

  if (kind === "words") {
    const spans = el.querySelectorAll(".w-in");
    anime({
      targets: spans,
      translateY: ["130%", "0%"],
      delay: anime.stagger(34, { start: delay }),
      duration: 1150,
      easing: "easeOutQuint",
    });
  } else if (kind === "draw") {
    anime({
      targets: el,
      scaleX: [0, 1],
      duration: 1400,
      delay,
      easing: "easeInOutQuart",
    });
  } else {
    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [el.dataset.distance || "48", 0],
      duration: 1300,
      delay,
      easing: "easeOutExpo",
    });
  }
}

/** Split an element's plain text content into word spans (utility). */
export function splitWords(el: HTMLElement) {
  const words = (el.textContent || "").trim().split(/\s+/);
  el.innerHTML = words
    .map((w) => `<span class="w-line"><span class="w-in">${w}</span></span>`)
    .join(" ");
}

/** Animated number counter (anime.js). */
export function countUp(
  el: HTMLElement,
  target: number,
  opts: { decimals?: number; duration?: number; delay?: number } = {}
) {
  const { decimals = 0, duration = 2200, delay = 0 } = opts;
  const obj = { v: 0 };
  anime({
    targets: obj,
    v: target,
    round: decimals === 0 ? 1 : Math.pow(10, decimals),
    duration,
    delay,
    easing: "easeOutExpo",
    update: () => {
      el.textContent =
        decimals > 0
          ? obj.v.toFixed(decimals)
          : Math.round(obj.v).toLocaleString("en-US");
    },
  });
}
