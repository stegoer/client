import NextLink from "@components/navigation/next.link";

import { Navbar as MantineNavbar } from "@mantine/core";

import type { MantineNumberSize } from "@mantine/core";
import type { Ref } from "react";

type NavbarProps = {
  opened: boolean;
  breakpoint: MantineNumberSize;
  setRef?: Ref<HTMLElement>;
};

const Navbar = ({ opened, breakpoint, setRef }: NavbarProps): JSX.Element => {
  return (
    <MantineNavbar
      hiddenBreakpoint={breakpoint}
      hidden={!opened}
      p="xs"
      width={{ sm: 100, lg: 100, base: 100 }}
      ref={setRef}
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
