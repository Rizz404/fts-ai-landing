import { ArrowDown, Check, MessageCircle } from "lucide-react";
import { demoHref, demoImage, demos } from "../content/demos";
import { useLang } from "../i18n/lang";

const previewIds = ["hotel-ai", "restaurant-ai", "car-rental-ai"];

const Hero = ({ onAskAi }: { onAskAi: () => void }) => {
  const { lang, t } = useLang();
  const previews = previewIds.map((id) => demos.find((demo) => demo.id === id)!);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-fts-paper">
      <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#E6F6F8]" />

      <div className="relative mx-auto grid max-w-page items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        <div>
          <p className="inline-flex rounded-full bg-fts-sky-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-fts-blue">
            {t.hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className={`mt-5 font-extrabold leading-[1.15] tracking-tight ${
              lang === "ja" ? "text-[2rem] sm:text-[2.5rem] xl:text-5xl" : "text-[2.25rem] sm:text-5xl xl:text-6xl"
            }`}
          >
            {[t.hero.title1, t.hero.title2].map((line) => (
              <span key={line} className="block">
                {/* "|" marks allowed break points, so Japanese lines don't split mid-word. */}
                {line.split("|").map((part) => (
                  <span key={part} className="inline-block">
                    {part}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fts-ink sm:text-lg">{t.hero.lead}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#demos"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-fts-sky-strong px-6 py-3.5 font-semibold text-white transition-colors hover:bg-fts-blue"
            >
              {t.hero.primary}
              <ArrowDown aria-hidden className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={onAskAi}
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-fts-line bg-white px-6 py-3.5 font-semibold text-fts-blue transition-colors hover:border-fts-sky"
            >
              <MessageCircle aria-hidden className="h-5 w-5" />
              {t.hero.secondary}
            </button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-fts-ink">
            {t.hero.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-1.5">
                <Check aria-hidden className="h-4 w-4 text-fts-green" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack of real demo screenshots; hidden on small phones to keep the first screen short. */}
        <div aria-hidden className="relative mx-auto hidden aspect-[16/11] w-full max-w-xl sm:block">
          {previews.map((demo, index) => (
            <a
              key={demo.id}
              href={demoHref(demo, lang)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className={`absolute w-[72%] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_24px_48px_-24px_rgba(16,35,66,0.45)] transition-transform duration-300 hover:-translate-y-1 ${
                ["left-0 top-0 rotate-[-3deg]", "right-0 top-[18%] rotate-[2deg]", "bottom-0 left-[12%] rotate-[-1deg]"][index]
              }`}
            >
              <img
                src={demoImage(demo)}
                alt=""
                width={1280}
                height={800}
                loading="eager"
                className="aspect-[16/10] w-full object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
