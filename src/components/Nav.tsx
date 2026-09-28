import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { routes, useRouter } from "../lib/router";
import { contact } from "../data/content";
import Magnetic from "./Magnetic";

export default function Nav({ ready }: { ready: boolean }) {
  const { path, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    anime({
      targets: menuRef.current?.querySelectorAll(".m-link"),
      opacity: [0, 1],
      translateY: [46, 0],
      delay: anime.stagger(70, { start: 150 }),
      duration: 800,
      easing: "easeOutExpo",
    });
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (to: string) => {
    setOpen(false);
    window.setTimeout(() => navigate(to), open ? 300 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-700 ${
          ready ? "translate-y-0" : "-translate-y-full"
        } ${scrolled ? "border-b border-hairline bg-cream/85 backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div
          className={`mx-auto flex w-full max-w-[92rem] items-center justify-between px-6 transition-all duration-500 md:px-12 ${
            scrolled ? "py-3.5" : "py-6"
          }`}
        >
          {/* brand */}
          <button onClick={() => go("/")} className="flex items-center gap-3" aria-label="Movers and Cleanout Crew — home">
            <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0">
              <rect x="8" y="8" width="24" height="24" rx="2" transform="rotate(45 20 20)" fill="none" stroke="#C39A4A" strokeWidth="1.6" />
              <path d="M13 26V14.5l7 6 7-6V26" stroke="#182420" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden flex-col items-start leading-none sm:flex">
              <span className="font-display text-[17px] font-medium tracking-tight text-ink">
                Movers &amp; Cleanout Crew
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.42em] text-moss">
                Inc · White-Glove Co.
              </span>
            </span>
          </button>

          {/* desktop links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {routes.map((r) => {
              const on = path === r.path;
              return (
                <button
                  key={r.path}
                  onClick={() => go(r.path)}
                  className={`link-sweep text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                    on ? "text-gold-deep" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
              className="hidden items-center gap-2 text-[13px] font-semibold text-ink/80 transition-colors hover:text-gold-deep md:flex"
            >
              <Phone className="h-4 w-4 text-gold" strokeWidth={2.2} />
              {contact.phone}
            </a>
            <Magnetic strength={0.25}>
              <button
                onClick={() => go("/contact")}
                className="btn-gold hidden items-center gap-2 rounded-full px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] sm:inline-flex"
              >
                Request a Quote
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold-deep lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      {open && (
        <div ref={menuRef} className="fixed inset-0 z-[80] flex flex-col bg-pine">
          <div className="flex items-center justify-between px-6 py-6 md:px-12">
            <span className="font-display text-lg text-cream">Movers &amp; Cleanout Crew</span>
            <button
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
            {routes.map((r) => (
              <button
                key={r.path}
                onClick={() => go(r.path)}
                className={`m-link font-display text-5xl font-light transition-colors ${
                  path === r.path ? "text-gold-light" : "text-cream hover:text-gold-light"
                }`}
              >
                {r.label}
              </button>
            ))}
          </nav>
          <div className="px-8 pb-10">
            <p className="m-link text-sm text-cream/60">{contact.phone}</p>
            <p className="m-link mt-1 text-sm text-cream/60">{contact.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
