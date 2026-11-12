import { useEffect } from "react";

// Fades in elements marked with `data-reveal` once they scroll into view.
// The CSS only hides them when motion is allowed, so reduced-motion users see everything immediately.
export const useReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};
