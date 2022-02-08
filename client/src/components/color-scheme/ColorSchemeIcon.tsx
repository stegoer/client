import { ActionIcon } from "@mantine/core";
import { MoonIcon, SunIcon } from "@modulz/radix-icons";
import { ColorScheme } from "@mantine/styles/lib/theme/types";
import { FC } from "react";

type Props = {
  isDark: boolean;
  toggleColorScheme(colorScheme?: ColorScheme): void;
};

const ColorSchemeIcon: FC<Props> = ({ isDark, toggleColorScheme }) => {
  const [width, height] = [22, 22];

  return (
    <ActionIcon
      variant="light"
      color={isDark ? `yellow` : `blue`}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      size="lg"
    >
      {isDark ? (
        <SunIcon style={{ width, height }} />
      ) : (
        <MoonIcon style={{ width, height }} />
      )}
    </ActionIcon>
  );
};

export default ColorSchemeIcon;
