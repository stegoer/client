import "../styles/globals.css";
import type { AppProps } from "next/app";
import GraphqlProvider from "../graphql/provider";
import Head from "../components/Head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import {
  useColorScheme,
  useHotkeys,
  useLocalStorageValue,
} from "@mantine/hooks";

function Stegoer({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: `mantine-color-scheme`,
    defaultValue: useColorScheme(),
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === `dark` ? `light` : `dark`));

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
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </GraphqlProvider>
    </>
  );
}

export default Stegoer;
