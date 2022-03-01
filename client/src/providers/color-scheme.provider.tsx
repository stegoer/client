import { ColorSchemeProvider as MantineColorSchemeProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";

import type { ColorScheme } from "@mantine/core";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  colorScheme: ColorScheme;
  toggleColorScheme(colorScheme?: ColorScheme): void;
};

const ColorSchemeProvider = ({
  children,
  colorScheme,
  toggleColorScheme,
}: Props): JSX.Element => {
  useHotkeys([[`mod+J`, () => toggleColorScheme()]]);

  return (
    <MantineColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </MantineColorSchemeProvider>
  );
};

export default ColorSchemeProvider;
