import { CalendarCheck } from "lucide-react";
import { useLang } from "../i18n/lang";
import { ftsLogo, pageUrl } from "../content/links";
import LangSwitch from "./LangSwitch";

const Header = ({ page }: { page: "home" | "consultation" }) => {
  const { lang, t } = useLang();
  const onConsultation = page === "consultation";

  return (
    <header className="sticky top-0 z-40 border-b border-fts-line/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href={pageUrl("/", lang)} className="flex shrink-0 items-center gap-2 rounded-md">
          <img src={ftsLogo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
          <span className="text-base font-bold tracking-tight sm:text-lg">
            Fujiyama <span className="font-semibold text-fts-sky-strong">AI</span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-fts-ink">
            <li><a href={pageUrl("/", lang, "#solutions")} className="hover:text-fts-navy">{t.nav.solutions}</a></li>
            <li><a href={pageUrl("/", lang, "#demos")} className="hover:text-fts-navy">{t.nav.demos}</a></li>
            <li><a href={pageUrl("/", lang, "#how")} className="hover:text-fts-navy">{t.nav.how}</a></li>
            <li>
              <a
                href={pageUrl("/consultation", lang)}
                aria-current={onConsultation ? "page" : undefined}
                className={onConsultation ? "font-semibold text-fts-blue" : "hover:text-fts-navy"}
              >
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch />
          {!onConsultation && (
            <a
              href={pageUrl("/consultation", lang)}
              className="hidden items-center gap-2 rounded-full bg-fts-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-fts-blue lg:inline-flex"
            >
              <CalendarCheck aria-hidden className="h-4 w-4" />
              {t.headerCta}
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
