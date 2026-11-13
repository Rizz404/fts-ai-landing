import { ArrowRight } from "lucide-react";
import { links } from "../content/links";
import { useLang } from "../i18n/lang";

const FinalCta = () => {
  const { t } = useLang();

  return (
    <section aria-labelledby="final-cta-title" className="bg-white pb-14 md:pb-20">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-fts-navy px-6 py-10 sm:px-10 md:py-12">
          <div aria-hidden className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#1D4B7C]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 id="final-cta-title" className="text-2xl font-bold text-white sm:text-3xl">
                {t.cta.title}
              </h2>
              <p className="mt-3 text-[#C9D6E8]">{t.cta.body}</p>
            </div>
            <a
              href={links.contact}
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-fts-sky-strong px-7 py-4 font-semibold text-white transition-colors hover:bg-fts-sky"
            >
              {t.cta.button}
              <ArrowRight aria-hidden className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
