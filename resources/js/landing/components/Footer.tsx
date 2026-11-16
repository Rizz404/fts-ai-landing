import { ftsLogo, links } from "../content/links";
import { useLang } from "../i18n/lang";
import { isLp } from "../page";

const Footer = () => {
  const { t } = useLang();
  const brand = (
    <>
      <img src={ftsLogo} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
      Fujiyama Technology Solutions
    </>
  );

  return (
    <footer className="border-t border-fts-line bg-white">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-4 py-8 text-sm text-fts-ink sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          {isLp ? (
            <p className="inline-flex items-center gap-2 font-bold text-fts-navy">{brand}</p>
          ) : (
            <a href={links.ftsHome} className="inline-flex items-center gap-2 rounded-md font-bold text-fts-navy">
              {brand}
            </a>
          )}
          <p className="mt-2">{t.footer.note}</p>
        </div>
        {!isLp && (
          <ul className="flex gap-6">
            <li><a href={links.ftsHome} className="hover:text-fts-navy">{t.footer.site}</a></li>
            <li><a href={links.contact} className="hover:text-fts-navy">{t.footer.contact}</a></li>
          </ul>
        )}
      </div>
    </footer>
  );
};

export default Footer;
