import Footer from "./components/Footer";
import Header from "./components/Header";
import { useLang } from "./i18n/lang";
import Demos from "./sections/Demos";
import Features from "./sections/Features";
import FinalCta from "./sections/FinalCta";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";

const App = () => {
  const { t } = useLang();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-white px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Demos />
        <Features />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
};

export default App;
