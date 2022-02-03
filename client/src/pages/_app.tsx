import "../styles/globals.css";
import type { AppProps } from "next/app";
import GraphqlProvider from "../graphql/provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GraphqlProvider>
      <Component {...pageProps} />
    </GraphqlProvider>
  );
}

export default MyApp;
