import { images } from "../content/images";
import { links } from "../content/links";

const Footer = () => (
  <footer className="border-t border-fts-line bg-white">
    <div className="mx-auto flex max-w-page flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-0">
      <div>
        <a href={links.ftsHome} className="inline-flex items-center gap-2 rounded-md">
          <img src={images.ftsLogo.src} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
          <span className="font-bold">Fujiyama</span>
        </a>
        <p className="mt-2 text-sm text-fts-ink">© {new Date().getFullYear()} Fujiyama Technology Solutions</p>
      </div>

      <nav aria-label="Footer">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fts-ink">
          <li><a href={links.services} className="hover:text-fts-navy">Services</a></li>
          <li><a href="#experiences" className="hover:text-fts-navy">AI Applications</a></li>
          <li><a href={links.aiAutomationServices} className="hover:text-fts-navy">AI Automation</a></li>
          <li><a href={links.contact} className="hover:text-fts-navy">Contact</a></li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
