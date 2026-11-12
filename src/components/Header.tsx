import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { images } from "../content/images";
import { links, navItems } from "../content/links";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-fts-line/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8 lg:px-0">
        <a href={links.ftsHome} className="flex items-center gap-2 rounded-md">
          <img
            src={images.ftsLogo.src}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="text-lg font-bold tracking-tight">Fujiyama</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-sm">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  aria-current={"current" in item ? "page" : undefined}
                  className={
                    "current" in item
                      ? "font-semibold text-fts-blue"
                      : "text-fts-ink transition-colors hover:text-fts-navy"
                  }
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={links.contact}
            className="hidden items-center gap-2 rounded-full bg-fts-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-fts-blue sm:inline-flex"
          >
            Talk to FTS
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fts-navy hover:bg-fts-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-fts-line bg-white lg:hidden">
          <ul className="mx-auto max-w-page px-5 py-3 sm:px-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={"current" in item ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-base ${
                    "current" in item ? "font-semibold text-fts-blue" : "text-fts-navy hover:bg-fts-mist"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
