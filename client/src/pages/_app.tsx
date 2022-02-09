import "../styles/globals.css";
import type { AppProps } from "next/app";
import GraphqlProvider from "../providers/GraphqlProvider";
import Head from "../components/head/Head";
import { AppShell, MantineProvider } from "@mantine/core";
import ColorSchemeProvider from "../providers/ColorSchemeProvider";
import { useHotkeys } from "@mantine/hooks";
import useColorScheme from "../hooks/colorScheme";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";

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
