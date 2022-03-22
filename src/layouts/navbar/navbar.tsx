import NextLink from "@components/navigation/next.link";

import { Navbar as MantineNavbar } from "@mantine/core";

import type { MantineNumberSize } from "@mantine/core";
import type { MutableRefObject } from "react";

type NavbarProps = {
  opened: boolean;
  breakpoint: MantineNumberSize;
  ref: MutableRefObject<HTMLButtonElement>;
};

const Navbar = ({ opened, breakpoint, ref }: NavbarProps): JSX.Element => {
  return (
    <MantineNavbar
      hiddenBreakpoint={breakpoint}
      hidden={!opened}
      padding="xs"
      width={{ sm: 100, lg: 100, base: 100 }}
      ref={ref}
    >
      <MantineNavbar.Section>
        <NextLink href="/account">account</NextLink>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <NextLink href="/encode">encode</NextLink>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <NextLink href="/decode">decode</NextLink>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <NextLink href="/images">images</NextLink>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <NextLink href="/docs">docs</NextLink>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
