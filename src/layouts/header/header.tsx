import NextLink from "@components/navigation/next.link";
import ColorScheme from "@features/color-scheme/components/color-scheme";

import {
  Burger,
  Header as MantineHeader,
  MediaQuery,
  Title,
} from "@mantine/core";

import type { Dispatch, Ref, SetStateAction } from "react";

type HeaderProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setBurgerRef?: Ref<HTMLButtonElement>;
};

const Header = ({
  opened,
  setOpened,
  setBurgerRef,
}: HeaderProps): JSX.Element => {
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
            ref={setBurgerRef}
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
