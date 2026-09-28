import { MapPin } from "lucide-react";
import { cities } from "../data/content";

export default function CitiesRail() {
  return (
    <div className="overflow-hidden py-4">
      <p data-reveal className="mb-8 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.34em] text-moss">
        <MapPin className="h-4 w-4 text-gold" strokeWidth={2.2} /> Now Coordinating In 38 Cities
      </p>
      <div className="flex w-max animate-marquee-rev">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {cities.map((c) => (
              <span
                key={c + copy}
                className="mx-4 flex items-center gap-4 rounded-full border border-hairline bg-cream py-3 pl-6 pr-7 text-sm font-semibold text-ink/75"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
