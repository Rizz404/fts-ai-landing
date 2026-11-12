import { ArrowRight } from "lucide-react";
import FrictionToFlowIllustration from "../components/FrictionToFlowIllustration";
import { links } from "../content/links";

const Hero = () => (
  <section
    id="top"
    aria-labelledby="hero-title"
    className="relative overflow-hidden bg-fts-paper"
  >
    <div aria-hidden className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#E6F6F8] sm:h-96 sm:w-96" />
    <div aria-hidden className="absolute -bottom-36 -left-24 h-72 w-72 rounded-full bg-fts-sky-soft/70" />

    <div className="relative mx-auto grid max-w-page items-center gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[55fr_45fr] lg:gap-8 lg:px-0 lg:pb-24 lg:pt-20">
      <div>
        <p className="inline-flex rounded-full bg-fts-sky-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-fts-blue">
          FTS • AI Solutions
        </p>
        <h1
          id="hero-title"
          className="mt-6 text-[2.35rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[4rem]"
        >
          Our Solutions
          <br />
          to Your Problems.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-fts-ink sm:text-lg lg:mt-12 lg:text-[1.2rem]">
          Start with the work you want to make easier.{" "}
          <span className="sm:block">Explore practical AI directions and find your next step.</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#solutions"
            className="inline-flex items-center justify-center gap-6 rounded-xl bg-fts-sky-strong px-6 py-3.5 font-semibold text-white transition-colors hover:bg-fts-blue"
          >
            Explore solutions
            <ArrowRight aria-hidden className="h-5 w-5" />
          </a>
          <a
            href={links.contact}
            className="inline-flex items-center justify-center gap-6 rounded-xl border border-fts-line bg-white px-6 py-3.5 font-semibold text-fts-blue transition-colors hover:border-fts-sky"
          >
            Talk to FTS
            <ArrowRight aria-hidden className="h-5 w-5" />
          </a>
        </div>
        <p className="mt-6 text-sm text-fts-ink">A clearer path begins with your challenge.</p>
      </div>

      <div className="relative">
        <FrictionToFlowIllustration className="mx-auto w-full max-w-[520px]" />
        <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-fts-blue">
          Friction → Flow
        </p>
        <a
          href="#experiences"
          className="tile-hover mt-3 block rounded-2xl border border-fts-line bg-white px-6 py-4"
        >
          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-fts-sky-strong">
            Explore the FTS AI ecosystem
          </span>
          <span className="mt-1 block font-semibold text-fts-navy">
            Applications&nbsp;&nbsp;/&nbsp;&nbsp;experiences&nbsp;&nbsp;/&nbsp;&nbsp;tailored solutions
          </span>
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
