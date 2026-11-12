const steps = [
  { title: "Choose a challenge", body: "Pick the work to improve." },
  { title: "Explore what exists", body: "See the status of each path." },
  { title: "Take the next step", body: "Visit an approved experience or contact us." },
];

const Steps = () => (
  <section id="how-it-works" aria-labelledby="steps-title" className="bg-white py-16">
    <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-0">
      <div data-reveal>
        <p className="eyebrow">04 / How it works</p>
        <h2 id="steps-title" className="mt-3 text-[1.75rem] font-bold tracking-tight sm:text-4xl lg:text-[2.6rem]">
          One clear step at a time.
        </h2>
      </div>

      <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
        <span
          aria-hidden
          className="absolute bottom-6 left-6 top-6 w-0.5 bg-[#B9E3F4] md:bottom-auto md:left-12 md:right-[8%] md:top-6 md:h-0.5 md:w-auto"
        />
        {steps.map((step, index) => (
          <li key={step.title} data-reveal className="relative flex gap-5 md:block">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fts-sky-strong text-lg font-bold text-white ring-8 ring-white md:ml-6">
              {index + 1}
            </span>
            <div className="pt-2 md:pt-8">
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-1 text-fts-ink">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Steps;
