import useColorScheme from "@hooks/base/color-cheme.hook";
import Head from "@layouts/head/head";
import Header from "@layouts/header/header";
import Navbar from "@layouts/navbar/navbar";
import ColorSchemeProvider from "@providers/base/color-scheme.provider";
import GraphqlProvider from "@providers/base/graphql.provider";
import UserProvider from "@providers/base/user.provider";
import "@styles/base/globals.style.css";

import { AppShell, MantineProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";

import type { NextComponentType } from "next";
import type { AppContext, AppInitialProps, AppProps } from "next/app";

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  const [colorScheme, toggleColorScheme] = useColorScheme();

  useHotkeys([[`mod+J`, () => toggleColorScheme()]]);

  return (
    <>
      <Head />
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <NotificationsProvider limit={3}>
            <GraphqlProvider>
              <UserProvider>
                <AppShell padding="xl" navbar={<Navbar />} header={<Header />}>
                  <Component {...pageProps} />
                </AppShell>
              </UserProvider>
            </GraphqlProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
