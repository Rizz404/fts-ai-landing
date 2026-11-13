import { ArrowRight } from "lucide-react";
import { useLang } from "../i18n/lang";
import { ftsLogo, links } from "../content/links";
import LangSwitch from "./LangSwitch";

const Header = () => {
  const { t } = useLang();

  return (
    <header className="sticky top-0 z-40 border-b border-fts-line/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2 rounded-md">
          <img src={ftsLogo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
          <span className="text-base font-bold tracking-tight sm:text-lg">
            Fujiyama <span className="font-semibold text-fts-sky-strong">AI</span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-fts-ink">
            <li><a href="#demos" className="hover:text-fts-navy">{t.nav.demos}</a></li>
            <li><a href="#how" className="hover:text-fts-navy">{t.nav.how}</a></li>
            <li><a href={links.contact} className="hover:text-fts-navy">{t.nav.contact}</a></li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <a
            href={links.contact}
            className="hidden items-center gap-2 rounded-full bg-fts-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-fts-blue lg:inline-flex"
          >
            {t.headerCta}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
