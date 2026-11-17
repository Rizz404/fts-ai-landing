import { ArrowDown, Check, MessageCircle } from "lucide-react";
import { character } from "../content/character";
import { demoHref, demoImage, demos } from "../content/demos";
import { useLang } from "../i18n/lang";
import LinkOrBox from "../components/LinkOrBox";
import { interactiveUrl } from "../content/links";

const previewIds = ["wedding-venue-ai", "hotel-ai", "restaurant-ai"];

const Hero = ({ onAskAi }: { onAskAi: () => void }) => {
  const { lang, t, a } = useLang();
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
              href="#solutions"
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

        {/* Phones: a compact greeting from the AI Consultant instead of the screenshot stack. */}
        <button
          type="button"
          onClick={onAskAi}
          className="flex items-center gap-3 rounded-2xl border border-fts-line bg-white p-3 text-left sm:hidden"
        >
          <img src={character.avatar.src} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full bg-fts-sky-soft object-cover" />
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-[0.08em] text-fts-sky-strong">{a.chat.title}</span>
            <span className="mt-0.5 block text-sm leading-snug text-fts-navy">{a.chat.heroBubble}</span>
          </span>
        </button>

        {/* Real demo screenshots, with the AI Consultant character standing in front. */}
        <div className="relative mx-auto hidden aspect-[16/11] w-full max-w-xl sm:block">
          {previews.map((demo, index) => (
            <LinkOrBox
              key={demo.id}
              href={demoHref(demo, lang)}
              lpHref={interactiveUrl("/solutions", lang)}
              newTab
              hidden
              className={`absolute w-[64%] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_24px_48px_-24px_rgba(16,35,66,0.45)] transition-transform duration-300 hover:-translate-y-1 ${
                ["left-0 top-0 rotate-[-3deg]", "left-[22%] top-[16%] rotate-[2deg]", "bottom-[4%] left-[6%] rotate-[-1deg]"][index]
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
            </LinkOrBox>
          ))}

          <img
            src={character.greeting.src}
            alt={a.chat.characterAlt}
            width={character.greeting.width}
            height={character.greeting.height}
            loading="eager"
            className="pointer-events-none absolute -bottom-6 right-[-4%] h-[112%] w-auto drop-shadow-[0_18px_24px_rgba(16,35,66,0.25)]"
          />
          <button
            type="button"
            onClick={onAskAi}
            className="absolute right-[30%] top-[-6%] max-w-[15rem] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-left text-sm leading-snug text-fts-navy shadow-[0_16px_32px_-16px_rgba(16,35,66,0.45)] ring-1 ring-fts-line transition hover:ring-fts-sky"
          >
            <span className="block text-xs font-bold uppercase tracking-[0.08em] text-fts-sky-strong">{a.chat.title}</span>
            <span className="mt-1 block">{a.chat.heroBubble}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
