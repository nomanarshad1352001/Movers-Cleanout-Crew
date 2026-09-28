import { ArrowUpRight } from "lucide-react";
import { useRouter } from "../lib/router";
import Magnetic from "./Magnetic";
import ThreeField from "./ThreeField";

/** Big closing band — Three.js field behind gold-gradient headline. */
export default function Cta() {
  const { navigate } = useRouter();

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <ThreeField opacity={0.5} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80rem 40rem at 50% 50%, rgba(246,241,232,0.75) 0%, rgba(246,241,232,0) 65%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-col items-center px-6 text-center md:px-12">
        <p data-reveal className="mb-7 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
          <span className="inline-block h-px w-12 bg-gold" /> Ready When You Are{" "}
          <span className="inline-block h-px w-12 bg-gold" />
        </p>
        <h2 data-reveal="words" className="max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-[-0.015em] text-ink md:text-7xl">
          <span className="w-line"><span className="w-in">The</span></span>{" "}
          <span className="w-line"><span className="w-in">next</span></span>{" "}
          <span className="w-line"><span className="w-in">move</span></span>{" "}
          <span className="w-line"><span className="w-in">is</span></span>{" "}
          <span className="w-line"><span className="w-in">the</span></span>{" "}
          <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">easy</span></span>{" "}
          <span className="w-line"><span className="w-in bg-gradient-to-r from-gold-deep to-[#d9b96c] bg-clip-text font-light italic text-transparent">one.</span></span>
        </h2>
        <p data-reveal className="mt-7 max-w-md text-[17px] leading-relaxed text-moss">
          One coordinator. One flat quote. Crews that treat your home like a gallery.
        </p>
        <div data-reveal data-delay="140" className="mt-11">
          <Magnetic strength={0.3}>
            <button
              onClick={() => navigate("/contact")}
              className="btn-gold inline-flex items-center gap-3 rounded-full px-10 py-5 text-[13px] font-bold uppercase tracking-[0.16em] pointer-events-none"
              style={{ pointerEvents: "auto" }}
            >
              Start Your Request
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.4} />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
