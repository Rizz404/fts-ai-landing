import type { ReactNode } from "react";
import { isLp } from "../page";

// An outbound link on the showcase. On the LP it renders the same element without the link,
// so both pages look identical.
const LinkOrBox = ({
  href,
  className,
  children,
  newTab = false,
  hidden = false,
}: {
  href: string;
  className: string;
  children: ReactNode;
  newTab?: boolean;
  hidden?: boolean;
}) =>
  isLp ? (
    <div className={className} aria-hidden={hidden || undefined}>
      {children}
    </div>
  ) : (
    <a
      href={href}
      className={className}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(hidden ? { tabIndex: -1, "aria-hidden": true } : {})}
    >
      {children}
    </a>
  );

export default LinkOrBox;
