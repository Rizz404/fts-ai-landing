import {
  ArrowUpRight,
  BedDouble,
  Briefcase,
  CalendarDays,
  Coffee,
  Compass,
  MessageCircle,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { categories, demos, type CategoryId } from "../content/demos";
import { interactiveUrl } from "../content/links";
import { format, useLang } from "../i18n/lang";
import { isLp } from "../page";

const icons: Record<CategoryId, LucideIcon> = {
  food: Coffee,
  stay: BedDouble,
  wellness: Sparkles,
  venues: CalendarDays,
  business: Briefcase,
};

// AI categories. Each opens the interactive site (Version 2); direct demo links stay in Demos below.
// On the LP the categories are informational only and the tour tile opens the AI Consultant chat.
const Solutions = ({ onAskAi }: { onAskAi: () => void }) => {
  const { lang, t } = useLang();

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t.solutions.eyebrow}</p>
          <h2 id="solutions-title" className="mt-2 text-[1.75rem] font-bold tracking-tight sm:text-4xl">
            {t.solutions.title}
          </h2>
          <p className="mt-3 text-base text-fts-ink sm:text-lg">{isLp ? t.lp.solutionsLead : t.solutions.lead}</p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((id) => {
            const Icon = icons[id];
            const names = demos.filter((demo) => demo.category === id).map((demo) => demo.name);
            const body = (
              <>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fts-sky-soft text-fts-sky-strong">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold leading-snug">{t.demos.filters[id]}</h3>
                    <p className="text-xs font-semibold text-fts-sky-strong">
                      {format(t.demos.count, { n: names.length })}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fts-ink">{t.solutions.items[id]}</p>
                <p className="mt-2 text-xs leading-relaxed text-fts-ink">{names.join(" · ")}</p>
              </>
            );

            return (
              <li key={id}>
                {isLp ? (
                  <div className="flex h-full flex-col rounded-2xl border border-fts-line bg-white p-5">{body}</div>
                ) : (
                  <a
                    href={interactiveUrl("/solutions", lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tile-hover group flex h-full flex-col rounded-2xl border border-fts-line bg-white p-5"
                  >
                    {body}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-fts-blue group-hover:underline">
                      {t.solutions.explore}
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="sr-only">{t.demos.newTab}</span>
                  </a>
                )}
              </li>
            );
          })}

          <li>
            {isLp ? (
              <button
                type="button"
                onClick={onAskAi}
                className="tile-hover group flex h-full w-full flex-col rounded-2xl bg-fts-navy p-5 text-left text-white"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                  <Compass aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-bold leading-snug">{t.solutions.tourTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C9D6E8]">{t.lp.tourBody}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold group-hover:underline">
                  <MessageCircle aria-hidden className="h-4 w-4" />
                  {t.cta.chat}
                </span>
              </button>
            ) : (
              <a
                href={interactiveUrl("", lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="tile-hover group flex h-full flex-col rounded-2xl bg-fts-navy p-5 text-white"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                  <Compass aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-bold leading-snug">{t.solutions.tourTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C9D6E8]">{t.solutions.tourBody}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold group-hover:underline">
                  {t.solutions.tour}
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </span>
                <span className="sr-only">{t.demos.newTab}</span>
              </a>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Solutions;
