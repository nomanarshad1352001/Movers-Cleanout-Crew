import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import anime from "animejs";
import { instantTop } from "./core";

export interface RouteDef {
  path: string;
  label: string;
}

export const routes: RouteDef[] = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/process", label: "Process" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export function pathFromHash(): string {
  const h = window.location.hash.replace(/^#/, "");
  return routes.some((r) => r.path === h) ? h : "/";
}

interface RouterCtx {
  path: string;
  navigate: (to: string) => void;
}

const Ctx = createContext<RouterCtx>({ path: "/", navigate: () => {} });
export const useRouter = () => useContext(Ctx);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(() =>
    typeof window === "undefined" ? "/" : pathFromHash()
  );
  const [curtainOn, setCurtainOn] = useState(false);
  const busy = useRef(false);
  const curtainRef = useRef<HTMLDivElement>(null);

  /* browser back / forward */
  useEffect(() => {
    const onHash = () => {
      const p = pathFromHash();
      setPath((prev) => {
        if (p !== prev) instantTop();
        return p;
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback(
    (to: string) => {
      if (busy.current) return;
      if (to === path) {
        instantTop();
        return;
      }
      const curtain = curtainRef.current;
      if (!curtain) {
        window.location.hash = to;
        return;
      }
      busy.current = true;
      const slats = curtain.querySelectorAll(".c-slat");
      const brand = curtain.querySelector(".c-brand");

      curtain.style.pointerEvents = "auto";
      setCurtainOn(true);

      const tl = anime.timeline({
        complete: () => {
          curtain.style.pointerEvents = "none";
          setCurtainOn(false);
          busy.current = false;
        },
      });

      tl.add({
        targets: slats,
        translateY: ["101%", "0%"],
        duration: 640,
        delay: anime.stagger(75),
        easing: "easeInOutQuint",
      })
        .add(
          {
            targets: brand,
            opacity: [0, 1],
            translateY: [26, 0],
            duration: 420,
            easing: "easeOutExpo",
            begin: () => {
              window.location.hash = to; // swaps route under the curtain
              instantTop();
            },
          },
          "-=180"
        )
        .add(
          {
            targets: brand,
            opacity: [1, 0],
            translateY: [0, -22],
            duration: 380,
            easing: "easeInQuart",
          },
          "+=420"
        )
        .add(
          {
            targets: slats,
            translateY: ["0%", "-101%"],
            duration: 720,
            delay: anime.stagger(70),
            easing: "easeInOutQuint",
          },
          "-=140"
        );
    },
    [path]
  );

  return (
    <Ctx.Provider value={{ path, navigate }}>
      {children}

      {/* transition curtain */}
      <div
        ref={curtainRef}
        className="pointer-events-none fixed inset-0 z-[85] overflow-hidden"
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`c-slat absolute inset-y-0 ${i % 2 === 0 ? "bg-pine" : "bg-pine-700"}`}
            style={{
              left: `${(i * 100) / 5 - 0.5}%`,
              width: `${100 / 5 + 1}%`,
              transform: "translateY(101%)",
            }}
          >
            {i % 2 !== 0 && <div className="absolute inset-x-0 top-0 h-px bg-gold/40" />}
          </div>
        ))}
        <div
          className="c-brand absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 opacity-0"
          style={{ display: curtainOn ? "flex" : "flex" }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 40 40" className="h-14 w-14">
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
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold-light/70">
            Movers &amp; Cleanout Crew
          </p>
        </div>
      </div>
    </Ctx.Provider>
  );
}
