import "../styles/globals.css";
import type { AppProps } from "next/app";
import GraphqlProvider from "../providers/GraphqlProvider";
import Head from "../components/Head";
import { MantineProvider } from "@mantine/core";
import ColorSchemeProvider from "../providers/ColorSchemeProvider";
import { useHotkeys } from "@mantine/hooks";
import useColorScheme from "../hooks/colorScheme";

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
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </GraphqlProvider>
    </>
  );
}

export default Stegoer;
