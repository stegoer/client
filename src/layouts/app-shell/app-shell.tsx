import Header from "@layouts/header/header";
import Navbar from "@layouts/navbar/navbar";

import { AppShell as MantineAppShell } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";

import type { MantineNumberSize } from "@mantine/core";
import type { PropsWithChildren } from "react";

const navbarBreakpoint: MantineNumberSize = `sm`;

export type AppShellProps = PropsWithChildren<Record<never, never>>;

const AppShell = ({ children }: AppShellProps): JSX.Element => {
  const [opened, setOpened] = useState(false);
  const [burgerRef, setBurgerRef] = useState<HTMLButtonElement | null>();
  const [navbarRef, setNavbarRef] = useState<HTMLElement | null>();

  useClickOutside<HTMLButtonElement>(
    () => opened && setOpened(false),
    undefined,
    navbarRef && burgerRef ? [navbarRef, burgerRef] : undefined,
  );

  return (
    <MantineAppShell
      fixed
      navbarOffsetBreakpoint={navbarBreakpoint}
      padding="xl"
      navbar={
        <Navbar
          opened={opened}
          breakpoint={navbarBreakpoint}
          setRef={setNavbarRef}
        />
      }
      header={
        <Header
          opened={opened}
          setOpened={setOpened}
          setBurgerRef={setBurgerRef}
        />
      }
    >
      {children}
    </MantineAppShell>
  );
};

export default AppShell;
