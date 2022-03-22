import Header from "@layouts/header/header";
import Navbar from "@layouts/navbar/navbar";

import { AppShell as MantineAppShell } from "@mantine/core";
import { useState } from "react";

import type { MantineNumberSize } from "@mantine/core";
import type { PropsWithChildren } from "react";

type AppShellProps = PropsWithChildren<Record<never, never>>;

const navbarBreakpoint: MantineNumberSize = `sm`;

const AppShell = ({ children }: AppShellProps): JSX.Element => {
  const [opened, setOpened] = useState(false);

  return (
    <MantineAppShell
      fixed
      navbarOffsetBreakpoint={navbarBreakpoint}
      padding="xl"
      navbar={
        <Navbar
          opened={opened}
          breakpoint={navbarBreakpoint}
        />
      }
      header={
        <Header
          opened={opened}
          setOpened={setOpened}
        />
      }
    >
      {children}
    </MantineAppShell>
  );
};

export default AppShell;
