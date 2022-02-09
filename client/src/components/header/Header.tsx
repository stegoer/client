import React, { FC } from "react";
import { Header as MantineHeader, Title } from "@mantine/core";
import ColorScheme from "../color-scheme/ColorScheme";
import Link from "next/link";

const Header: FC = () => {
  return (
    <MantineHeader height={55} padding="xs">
      <div>
        <div style={{ float: `left` }}>
          <Link href="/">
            <a>
              <Title>stegoer</Title>
            </a>
          </Link>
        </div>
        <div style={{ float: `right` }}>
          <ColorScheme />
        </div>
      </div>
    </MantineHeader>
  );
};

export default Header;
