import { useLang } from "../i18n/lang";

const HowItWorks = () => {
  const { t } = useLang();

  return (
    <section id="how" aria-labelledby="how-title" className="bg-white pb-14 md:pb-20">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">{t.how.eyebrow}</p>
        <h2 id="how-title" className="mt-2 text-[1.75rem] font-bold tracking-tight sm:text-4xl">
          {t.how.title}
        </h2>

        <ol className="mt-8 grid gap-4 lg:grid-cols-3">
          {t.how.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl bg-fts-mist p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fts-sky-strong font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-fts-ink">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
