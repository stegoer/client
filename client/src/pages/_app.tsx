import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClientProvider } from "../graphql/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloClientProvider>
      <Component {...pageProps} />
    </ApolloClientProvider>
  );
}

export default MyApp;
