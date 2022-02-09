import { FC } from "react";
import { Center, useMantineColorScheme } from "@mantine/core";
import ColorSchemeIcon from "./ColorSchemeIcon";

const ColorScheme: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === `dark`;

  return (
    <Center inline>
      <ColorSchemeIcon isDark={isDark} toggleColorScheme={toggleColorScheme} />
    </Center>
  );
};

export default ColorScheme;
