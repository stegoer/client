import Link from "next/link";

import type { PropsWithChildren } from "react";

type NextLinkProps = PropsWithChildren<{
  href: string;
  passHref?: boolean;
}>;

const NextLink = ({ children, href, passHref }: NextLinkProps): JSX.Element => {
  return (
    <Link
      href={href}
      passHref={passHref}
    >
      <a>{children}</a>
    </Link>
  );
};

export default NextLink;
