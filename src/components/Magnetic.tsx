import { useRef, type ReactNode, type MouseEvent } from "react";
import { animate } from "popmotion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Wraps children in a magnetic popmotion spring field. */
export default function Magnetic({ children, strength = 0.32, className = "" }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const anim = useRef<{ stop: () => void } | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const springTo = (tx: number, ty: number, stiff = 200, damp = 15) => {
    anim.current?.stop();
    anim.current = animate({
      from: { x: pos.current.x, y: pos.current.y },
      to: { x: tx, y: ty },
      type: "spring",
      stiffness: stiff,
      damping: damp,
      mass: 0.5,
      onUpdate: (v: { x: number; y: number }) => {
        pos.current = v;
        if (ref.current) {
          ref.current.style.transform = `translate3d(${v.x}px, ${v.y}px, 0)`;
        }
      },
    });
  };

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    springTo(
      (e.clientX - r.left - r.width / 2) * strength,
      (e.clientY - r.top - r.height / 2) * strength
    );
  };

  const onLeave = () => springTo(0, 0, 160, 18);

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
