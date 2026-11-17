import type { ReactNode } from "react";
import { isLp } from "../page";

// An outbound link on the showcase. On the LP it links to `lpHref` instead (the AI Solutions
// page of the interactive site), or renders the same element without a link when there is none,
// so both pages look identical.
const LinkOrBox = ({
  href,
  lpHref,
  className,
  children,
  newTab = false,
  hidden = false,
}: {
  href: string;
  lpHref?: string;
  className: string;
  children: ReactNode;
  newTab?: boolean;
  hidden?: boolean;
}) => {
  const target = isLp ? lpHref : href;

  if (!target) {
    return (
      <div className={className} aria-hidden={hidden || undefined}>
        {children}
      </div>
    );
  }

  return (
    <a
      href={target}
      className={className}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(hidden ? { tabIndex: -1, "aria-hidden": true } : {})}
    >
      {children}
    </a>
  );
};

export default LinkOrBox;
