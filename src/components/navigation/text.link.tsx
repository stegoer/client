import { Text } from "@mantine/core";

import type { PropsWithChildren } from "react";

type TextLinkProps = PropsWithChildren<{
  href: string;
}>;

const TextLink = ({ children, href }: TextLinkProps): JSX.Element => {
  return (
    <Text
      variant="link"
      target="_blank"
      component="a"
      href={href}
    >
      {children}
    </Text>
  );
};

export default TextLink;
