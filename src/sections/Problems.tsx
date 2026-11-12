import { ArrowRight, MessagesSquare, RefreshCw, Search, type LucideIcon } from "lucide-react";

type Problem = {
  title: string;
  question: string;
  direction: string;
  icon: LucideIcon;
  iconClass: string;
};

const problems: Problem[] = [
  {
    title: "Repeated work",
    question: "Too many routine steps?",
    direction: "Simplify the path.",
    icon: RefreshCw,
    iconClass: "bg-fts-sky-soft text-fts-sky-strong",
  },
  {
    title: "Scattered questions",
    question: "Inquiries across channels?",
    direction: "Bring clarity to the next step.",
    icon: MessagesSquare,
    iconClass: "bg-[#DCF5EC] text-[#0F8A63]",
  },
  {
    title: "Hard-to-find answers",
    question: "Information in too many places?",
    direction: "Find a better starting point.",
    icon: Search,
    iconClass: "bg-[#FDEBE4] text-cafe-terracotta-strong",
  },
];

const Problems = () => (
  <section id="solutions" aria-labelledby="problems-title" className="bg-white py-16 lg:py-24">
    <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-0">
      <div data-reveal>
        <p className="eyebrow">01 / Start here</p>
        <h2 id="problems-title" className="mt-3 text-[1.75rem] font-bold tracking-tight sm:text-4xl lg:text-[2.6rem]">
          What gets in your way?
        </h2>
        <p className="mt-3 text-base text-fts-ink sm:text-lg">Choose the challenge, not a technical feature.</p>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
        {problems.map(({ title, question, direction, icon: Icon, iconClass }) => (
          <li key={title} data-reveal className="rounded-3xl border border-fts-line bg-white p-7">
            <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${iconClass}`}>
              <Icon aria-hidden className="h-5 w-5" />
            </span>
            <h3 className="mt-6 text-xl font-bold">{title}</h3>
            <p className="mt-2 text-fts-ink">{question}</p>
            <p className="mt-5 flex items-center gap-3 font-semibold text-fts-blue">
              <span aria-hidden className="flex w-12 shrink-0 items-center">
                <span className="h-0.5 flex-1 bg-fts-sky" />
                <span className="h-2.5 w-2.5 rounded-full bg-fts-red" />
              </span>
              {direction}
            </p>
          </li>
        ))}
      </ul>

      <a
        href="#experiences"
        className="mt-10 inline-flex items-center gap-2 font-semibold text-fts-blue hover:underline"
      >
        See the experiences
        <ArrowRight aria-hidden className="h-4 w-4" />
      </a>
    </div>
  </section>
);

export default Problems;
