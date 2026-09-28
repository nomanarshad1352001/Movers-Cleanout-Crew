import { Asterisk } from "lucide-react";
import { tickerItems } from "../data/content";

export default function Ticker() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {tickerItems.map((t) => (
        <span key={t + key} className="flex items-center">
          <span className="px-8 text-[13px] font-bold uppercase tracking-[0.32em] text-ink/70">
            {t}
          </span>
          <Asterisk className="h-5 w-5 text-gold" strokeWidth={2.2} />
        </span>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-hairline bg-paper py-6" aria-hidden="true">
      <div className="animate-marquee flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </section>
  );
}
