import { ArrowRight } from "lucide-react";
import { links } from "../content/links";

const FinalCta = () => (
  <section aria-labelledby="final-cta-title" className="bg-white pb-16 lg:pb-24">
    <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-0">
      <div
        data-reveal
        className="relative overflow-hidden rounded-[28px] bg-fts-navy px-6 py-12 sm:px-12 lg:py-16"
      >
        <div aria-hidden className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-[#1D4B7C] sm:right-10" />
        <div aria-hidden className="absolute right-8 top-10 h-4 w-4 rounded-full bg-fts-red sm:right-20" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="final-cta-title" className="text-2xl font-bold leading-snug text-white sm:text-3xl">
              Let&apos;s start with your problem.
              <br />
              Tell us what you want to improve.
            </h2>
            <p className="mt-5 text-[#C9D6E8]">We can discuss a useful next step together.</p>
          </div>
          <a
            href={links.contact}
            className="inline-flex items-center justify-center gap-10 rounded-xl bg-fts-sky-strong px-7 py-4 font-semibold text-white transition-colors hover:bg-fts-sky lg:min-w-[260px]"
          >
            Contact FTS
            <ArrowRight aria-hidden className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCta;
