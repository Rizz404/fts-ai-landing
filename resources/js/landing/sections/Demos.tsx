import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import LinkOrBox from "../components/LinkOrBox";
import { categories, demoHref, demoImage, demos, type CategoryId } from "../content/demos";
import { interactiveUrl } from "../content/links";
import { format, useLang } from "../i18n/lang";

type Filter = CategoryId | "all";

const Demos = () => {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? demos : demos.filter((demo) => demo.category === filter);

  return (
    <section id="demos" aria-labelledby="demos-title" className="bg-fts-mist py-14 md:py-20">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t.demos.eyebrow}</p>
          <h2 id="demos-title" className="mt-2 text-[1.75rem] font-bold tracking-tight sm:text-4xl">
            {t.demos.title}
          </h2>
          <p className="mt-3 text-base text-fts-ink sm:text-lg">{t.demos.lead}</p>
        </div>

        <div
          role="group"
          aria-label={t.demos.filterLabel}
          className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {(["all", ...categories] as Filter[]).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filter === id
                  ? "border-fts-navy bg-fts-navy text-white"
                  : "border-fts-line bg-white text-fts-navy hover:border-fts-sky"
              }`}
            >
              {t.demos.filters[id]}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="mt-3 text-sm text-fts-ink">
          {format(t.demos.count, { n: visible.length })}
        </p>

        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((demo) => (
            <li key={demo.id}>
              {/* Phones: compact row (thumbnail + text). sm and up: vertical card. */}
              <LinkOrBox
                href={demoHref(demo, lang)}
                lpHref={interactiveUrl("/solutions", lang)}
                newTab
                className="tile-hover group flex h-full items-center gap-3 overflow-hidden rounded-2xl border border-fts-line bg-white p-2.5 sm:flex-col sm:items-stretch sm:gap-0 sm:p-0"
              >
                <img
                  src={demoImage(demo)}
                  alt={format(t.demos.screenshotAlt, { name: demo.name })}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-28 shrink-0 rounded-lg object-cover object-top sm:w-full sm:rounded-none sm:border-b sm:border-fts-line"
                />
                <div className="flex min-w-0 flex-1 flex-col sm:p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-fts-sky-strong">
                    {demo.industry[lang]}
                  </p>
                  <h3 className="mt-0.5 font-bold leading-snug sm:mt-1 sm:text-lg">{demo.name}</h3>
                  <p className="text-sm text-fts-ink">{demo.role[lang]}</p>
                  <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
                    {demo.tasks[lang].map((task) => (
                      <li key={task} className="rounded-full bg-fts-mist px-2.5 py-1 text-xs text-fts-navy">
                        {task}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto hidden items-center gap-1.5 pt-4 text-sm font-semibold text-fts-blue group-hover:underline sm:inline-flex">
                    {t.demos.try}
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </span>
                  <span className="sr-only">{t.demos.newTab}</span>
                </div>
                <ArrowUpRight aria-hidden className="mr-1 h-5 w-5 shrink-0 text-fts-blue sm:hidden" />
              </LinkOrBox>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Demos;
