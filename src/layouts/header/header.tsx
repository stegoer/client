import NextLink from "@components/navigation/next.link";
import ColorScheme from "@features/color-scheme/components/color-scheme";

import {
  Burger,
  Header as MantineHeader,
  MediaQuery,
  Title,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";

import type { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ opened, setOpened }: HeaderProps): JSX.Element => {
  const ref = useClickOutside(() => setOpened(false));

  return (
    <MantineHeader
      height={70}
      padding="xs"
    >
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          height: `100%`,
        }}
      >
        <MediaQuery
          largerThan="sm"
          styles={{ display: `none` }}
        >
          <Burger
            opened={opened}
            onClick={() => setOpened((opened) => !opened)}
            size="sm"
            mr="xl"
            ref={ref}
          />
        </MediaQuery>
        <div style={{ textAlign: `left` }}>
          <NextLink
            href="/"
            passHref
          >
            <Title>stegoer</Title>
          </NextLink>
        </div>
        <div style={{ textAlign: `right` }}>
          <ColorScheme />
        </div>
      </div>
    </MantineHeader>
  );
};

export default Header;
