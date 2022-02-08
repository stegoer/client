import { FC } from "react";
import {
  ColorScheme,
  ColorSchemeProvider as MantineColorSchemeProvider,
} from "@mantine/core";

type Props = {
  colorScheme: ColorScheme;
  toggleColorScheme(colorScheme?: ColorScheme): void;
};

const ColorSchemeProvider: FC<Props> = ({
  children,
  colorScheme,
  toggleColorScheme,
}) => {
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
