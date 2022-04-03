import useColorScheme from "@hooks/color-cheme.hook";
import AppShell from "@layouts/app-shell/app-shell";
import AuthProvider from "@providers/auth.provider";
import ColorSchemeProvider from "@providers/color-scheme.provider";
import GraphqlProvider from "@providers/graphql.provider";
import UserProvider from "@providers/user.provider";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import type { PropsWithChildren } from "react";

export type AppProviderProps = PropsWithChildren<Record<never, never>>;

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  const [colorScheme, toggleColorScheme] = useColorScheme();

  return (
    <UserProvider>
      <GraphqlProvider>
        <AuthProvider>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{ colorScheme }}
            >
              <NotificationsProvider
                limit={3}
                autoClose={2000}
              >
                <AppShell>{children}</AppShell>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </AuthProvider>
      </GraphqlProvider>
    </UserProvider>
  );
};

export default AppProvider;
