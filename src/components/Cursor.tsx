import { useEffect, useRef } from "react";
import { animate } from "popmotion";

/** Custom gold dot + trailing ring cursor. Popmotion springs drive the hover scale. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let raf = 0;
    let scaleAnim: { stop: () => void } | null = null;

    const setScale = (target: number) => {
      scaleAnim?.stop();
      scaleAnim = animate({
        from: scale,
        to: target,
        type: "spring",
        stiffness: 280,
        damping: 20,
        onUpdate: (v: number) => {
          scale = v;
        },
      });
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const HIT = "a,button,[role='button'],input,textarea,select,label,[data-hover]";
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.(HIT)) {
        ring.classList.add("is-active");
        setScale(2);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.(HIT)) {
        ring.classList.remove("is-active");
        setScale(1);
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      scaleAnim?.stop();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
