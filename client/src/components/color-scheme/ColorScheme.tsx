import { FC } from "react";
import { Card, useMantineColorScheme } from "@mantine/core";
import ColorSchemeIcon from "./ColorSchemeIcon";

const ColorScheme: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === `dark`;

  return (
    <div style={{ position: `absolute`, right: 10, top: 10 }}>
      <Card>
        {isDark ? `Light` : `Dark`}
        <ColorSchemeIcon
          isDark={isDark}
          toggleColorScheme={toggleColorScheme}
        />
      </Card>
    </div>
  );
};

export default ColorScheme;
