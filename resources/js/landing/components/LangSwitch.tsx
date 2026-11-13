import { LANGS, useLang } from "../i18n/lang";

const LangSwitch = ({ className = "" }: { className?: string }) => {
  const { lang, setLang, t } = useLang();

  return (
    <div role="group" aria-label={t.langLabel} className={`flex rounded-full border border-fts-line bg-white p-0.5 ${className}`}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`min-w-[2.5rem] rounded-full px-2.5 py-1.5 text-xs font-bold uppercase transition-colors ${
            lang === code ? "bg-fts-navy text-white" : "text-fts-ink hover:text-fts-navy"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
};

export default LangSwitch;
