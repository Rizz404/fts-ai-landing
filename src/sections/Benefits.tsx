import { ArrowLeftRight, ArrowUpRight, Diamond, type LucideIcon } from "lucide-react";

type Benefit = {
  title: string;
  body: string;
  icon: LucideIcon;
  tileClass: string;
  iconClass: string;
};

const benefits: Benefit[] = [
  {
    title: "Less friction",
    body: "A simpler view of everyday work.",
    icon: ArrowUpRight,
    tileClass: "bg-[#E8F5FB]",
    iconClass: "text-fts-sky-strong",
  },
  {
    title: "Clearer choices",
    body: "See which next step makes sense.",
    icon: Diamond,
    tileClass: "bg-[#EAF6EF]",
    iconClass: "text-fts-sky-strong",
  },
  {
    title: "Better conversations",
    body: "Start with the problem you know.",
    icon: ArrowLeftRight,
    tileClass: "bg-[#FDF2EE]",
    iconClass: "text-fts-blue",
  },
];

const Benefits = () => (
  <section id="why-it-matters" aria-labelledby="benefits-title" className="bg-white pb-8 pt-16 lg:pt-24">
    <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-0">
      <div data-reveal>
        <p className="eyebrow">03 / Why it matters</p>
        <h2 id="benefits-title" className="mt-3 text-[1.75rem] font-bold tracking-tight sm:text-4xl lg:text-[2.6rem]">
          Make room for what matters.
        </h2>
        <p className="mt-3 text-base text-fts-ink sm:text-lg">
          Outcomes to explore, not guaranteed product results.
        </p>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
        {benefits.map(({ title, body, icon: Icon, tileClass, iconClass }) => (
          <li key={title} data-reveal className={`rounded-3xl px-6 py-7 ${tileClass}`}>
            <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-white ${iconClass}`}>
              <Icon aria-hidden className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-xl font-bold">{title}</h3>
            <p className="mt-2 text-fts-ink">{body}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Benefits;
