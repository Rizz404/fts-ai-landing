import Footer from "./components/Footer";
import Header from "./components/Header";
import { useReveal } from "./hooks/useReveal";
import Benefits from "./sections/Benefits";
import Experiences from "./sections/Experiences";
import FinalCta from "./sections/FinalCta";
import Hero from "./sections/Hero";
import Problems from "./sections/Problems";
import Steps from "./sections/Steps";

const App = () => {
  useReveal();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-white px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Problems />
        <Experiences />
        <Benefits />
        <Steps />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
};

export default App;
