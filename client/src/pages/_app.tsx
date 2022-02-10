import useColorScheme from "@/hooks/color-cheme";
import Head from "@/layouts/head/head";
import Header from "@/layouts/header/header";
import Navbar from "@/layouts/navbar/navbar";
import ColorSchemeProvider from "@/providers/color-scheme.provider";
import GraphqlProvider from "@/providers/graphql.provider";
import "@/styles/globals.css";

import { AppShell, MantineProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import React from "react";

import type { AppProps } from "next/app";

function Stegoer({ Component, pageProps }: AppProps) {
  const [colorScheme, toggleColorScheme] = useColorScheme();

  useHotkeys([[`mod+J`, () => toggleColorScheme()]]);

  return (
    <>
      <Head />
      <GraphqlProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
          >
            <AppShell padding="xl" navbar={<Navbar />} header={<Header />}>
              <Component {...pageProps} />
            </AppShell>
          </MantineProvider>
        </ColorSchemeProvider>
      </GraphqlProvider>
    </>
  );
}

export default Stegoer;
