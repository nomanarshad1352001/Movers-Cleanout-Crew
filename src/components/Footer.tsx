import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { contact, services } from "../data/content";
import { instantTop } from "../lib/core";
import { routes, useRouter } from "../lib/router";

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative overflow-hidden bg-pine text-cream">
      <div className="mx-auto w-full max-w-[92rem] px-6 pt-20 md:px-12 md:pt-24">
        {/* columns */}
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 40 40" className="h-10 w-10">
                <rect x="8" y="8" width="24" height="24" rx="2" transform="rotate(45 20 20)" fill="none" stroke="#C39A4A" strokeWidth="1.6" />
                <path d="M13 26V14.5l7 6 7-6V26" stroke="#F6F1E8" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="font-display text-lg font-medium leading-none">
                  Movers &amp; Cleanout Crew
                </p>
                <p className="mt-1.5 text-[9px] uppercase tracking-[0.42em] text-cream/50">
                  Inc · Est. 2016
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-cream/55">
              A service coordination company connecting homes and businesses with the finest
              moving, cleanout and cleaning crews in America.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light">
              Services
            </p>
            <ul className="mt-6 space-y-3.5">
              {services.map((s) => (
                <li key={s.title}>
                  <button
                    onClick={() => navigate("/services")}
                    className="text-[14px] text-cream/60 transition-colors hover:text-gold-light"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light">
              Company
            </p>
            <ul className="mt-6 space-y-3.5">
              {routes.map((r) => (
                <li key={r.path}>
                  <button
                    onClick={() => navigate(r.path)}
                    className="text-[14px] text-cream/60 transition-colors hover:text-gold-light"
                  >
                    {r.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="mailto:crews@moverscleanoutcrew.com"
                  className="text-[14px] text-cream/60 transition-colors hover:text-gold-light"
                >
                  Join the Network
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light">
              Contact
            </p>
            <ul className="mt-6 space-y-4 text-[14px] text-cream/60">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold" strokeWidth={2} /> {contact.phone}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" strokeWidth={2} /> {contact.email}
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                {contact.hq}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* giant outline wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="text-outline-cream -mb-[2vw] whitespace-nowrap text-center font-display text-[11.5vw] font-semibold leading-[0.85] tracking-tight">
          Movers &amp; Cleanout
        </p>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-cream/10">
        <div className="mx-auto flex w-full max-w-[92rem] flex-col items-center justify-between gap-4 px-6 py-7 text-[12px] text-cream/40 md:flex-row md:px-12">
          <p>© 2026 Movers &amp; Cleanout Crew Inc. · All routes lead home.</p>
          <div className="flex items-center gap-6">
            <span className="transition-colors hover:text-gold-light">Privacy</span>
            <span className="transition-colors hover:text-gold-light">Terms</span>
            <button
              onClick={instantTop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-gold hover:text-gold-light"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
