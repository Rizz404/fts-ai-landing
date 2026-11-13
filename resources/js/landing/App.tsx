import { useState } from "react";
import ChatWidget from "./chat/ChatWidget";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useLang } from "./i18n/lang";
import Booking from "./sections/Booking";
import Demos from "./sections/Demos";
import Features from "./sections/Features";
import FinalCta from "./sections/FinalCta";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Solutions from "./sections/Solutions";

const page = window.FTS_PAGE ?? "home";

const App = () => {
  const { t } = useLang();
  const [chatOpen, setChatOpen] = useState(false);
  const askAi = () => setChatOpen(true);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-white px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.skip}
      </a>
      <Header page={page} />
      <main id="main">
        {page === "consultation" ? (
          <Booking onAskAi={askAi} />
        ) : (
          <>
            <Hero onAskAi={askAi} />
            <Solutions />
            <Demos />
            <Features />
            <HowItWorks />
            <FinalCta onAskAi={askAi} />
          </>
        )}
      </main>
      <Footer />
      <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
};

export default App;
