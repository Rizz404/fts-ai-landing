import { CalendarCheck, Languages, LayoutGrid, UserRound, type LucideIcon } from "lucide-react";
import { useLang } from "../i18n/lang";

const icons: LucideIcon[] = [Languages, LayoutGrid, CalendarCheck, UserRound];

const Features = () => {
  const { t } = useLang();

  return (
    <section aria-labelledby="features-title" className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">{t.features.eyebrow}</p>
        <h2 id="features-title" className="mt-2 text-[1.75rem] font-bold tracking-tight sm:text-4xl">
          {t.features.title}
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <li key={item.title} className="rounded-2xl border border-fts-line p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-fts-sky-soft text-fts-sky-strong">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fts-ink">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Features;
