import { ArrowRight, ArrowUpRight } from "lucide-react";
import SiteImg from "../components/SiteImg";
import { images } from "../content/images";
import { links } from "../content/links";

// Task tiles are navigation to the right place on this page, not separate products.
const tasks = [
  { label: "Explore a menu", context: "Cafe AI", href: "#cafe-ai" },
  { label: "Find a seat", context: "Cafe AI", href: "#cafe-ai" },
  { label: "Ask for help", context: "AI Barista", href: "#cafe-ai" },
  { label: "Discuss a workflow", context: "FTS services", href: "#other-challenges" },
];

const Experiences = () => (
  <section id="experiences" aria-labelledby="experiences-title" className="bg-fts-mist py-16 lg:py-24">
    <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-0">
      <div data-reveal>
        <p className="eyebrow">02 / Explore the ecosystem</p>
        <h2 id="experiences-title" className="mt-3 text-[1.75rem] font-bold tracking-tight sm:text-4xl lg:text-[2.6rem]">
          Meet AI through real experiences.
        </h2>
        <p className="mt-3 text-base text-fts-ink sm:text-lg">
          Start with a task, then enter the application or talk to FTS.
        </p>
      </div>

      <nav aria-label="Choose a task" className="mt-8">
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {tasks.map((task) => (
            <li key={task.label}>
              <a
                href={task.href}
                className="tile-hover flex h-full flex-col rounded-2xl border border-fts-line bg-white px-4 py-4 sm:px-5"
              >
                <span className="font-semibold text-fts-navy">{task.label}</span>
                <span className="mt-1 text-sm text-fts-ink">{task.context}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <article
        id="cafe-ai"
        aria-labelledby="cafe-ai-title"
        data-reveal
        className="mt-8 grid gap-8 rounded-[28px] bg-cafe-cream p-6 sm:p-8 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:gap-10"
      >
        <div className="flex flex-col">
          <p className="text-sm font-bold uppercase tracking-[0.06em] text-cafe-terracotta-strong">
            Featured experience&nbsp;&nbsp;/&nbsp;&nbsp;Cafe AI
          </p>
          <h3 id="cafe-ai-title" className="mt-5 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
            Cafe AI, up close.
          </h3>
          <p className="mt-2 text-base leading-relaxed text-fts-ink sm:text-lg">
            Meet the AI Barista.
            <br />
            Browse, chat or reserve a table.
          </p>

          <figure className="mt-6 lg:mt-auto">
            <SiteImg
              image={images.cafeAiBaristaCharacter}
              className="mx-auto h-auto w-full max-w-[240px] lg:max-w-[260px]"
            />
            <figcaption className="relative z-10 -mt-2 rounded-2xl bg-white px-5 py-4">
              <span className="block text-sm font-bold uppercase text-cafe-terracotta-strong">AI Barista</span>
              <span className="mt-1 block text-sm text-fts-ink">Character artwork from Cafe AI</span>
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-col">
          <figure className="rounded-3xl bg-white p-3 sm:p-5">
            <SiteImg
              image={images.cafeAiInterfacePreview}
              className="h-auto w-full rounded-xl"
            />
            <figcaption className="mt-3 px-1 text-sm text-fts-ink">
              Composite of two real Cafe AI states: homepage and chat drawer. The chat shows the initial
              greeting only.
            </figcaption>
          </figure>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={links.cafeAi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 rounded-2xl bg-cafe-terracotta-strong px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-cafe-terracotta-hover sm:min-w-[300px]"
            >
              Visit Cafe AI
              <ArrowUpRight aria-hidden className="h-5 w-5" />
              <span className="sr-only">(opens cafe-ai.fts-tech.co.id in a new tab)</span>
            </a>
            <p className="text-sm text-fts-ink">
              Opens cafe-ai.fts-tech.co.id. Table availability is confirmed by the cafe team.
            </p>
          </div>
        </div>
      </article>

      <div id="other-challenges" className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
        <a
          href={links.aiAutomationServices}
          className="tile-hover group rounded-3xl border border-fts-line bg-white px-6 py-6 sm:px-8"
        >
          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-fts-sky-strong">
            AI automation services
          </span>
          <span className="mt-3 block text-xl font-bold text-fts-navy">Have a different business challenge?</span>
          <span className="mt-2 inline-flex items-center gap-2 font-semibold text-fts-blue group-hover:underline">
            Explore FTS services
            <ArrowRight aria-hidden className="h-4 w-4" />
          </span>
        </a>
        <a
          href={links.contact}
          className="tile-hover group rounded-3xl bg-fts-navy px-6 py-6 sm:px-8"
        >
          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-[#7DD3FC]">
            Need a conversation?
          </span>
          <span className="mt-3 block text-xl font-bold text-white">Tell us what you need.</span>
          <span className="mt-2 inline-flex items-center gap-2 font-semibold text-[#7DD3FC] group-hover:underline">
            Contact FTS
            <ArrowRight aria-hidden className="h-4 w-4" />
          </span>
        </a>
      </div>
    </div>
  </section>
);

export default Experiences;
