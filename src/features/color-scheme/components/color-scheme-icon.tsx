import { ActionIcon } from "@mantine/core";
import dynamic from "next/dynamic";

import type { ColorScheme } from "@mantine/styles/lib/theme/types";
import type { IconProps } from "@modulz/radix-icons/dist/types";

const SunIcon = dynamic<IconProps>(() =>
  import(`@modulz/radix-icons`).then((module_) => module_.SunIcon),
);
const MoonIcon = dynamic<IconProps>(() =>
  import(`@modulz/radix-icons`).then((module_) => module_.MoonIcon),
);

export type ColorSchemeIconProps = {
  isDark: boolean;
  toggleColorScheme(colorScheme?: ColorScheme): void;
};

const ColorSchemeIcon = ({
  isDark,
  toggleColorScheme,
}: ColorSchemeIconProps): JSX.Element => {
  const [width, height] = [25, 25];

  return (
    <ActionIcon
      variant="light"
      color={isDark ? `yellow` : `blue`}
      onClick={() => toggleColorScheme()}
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
