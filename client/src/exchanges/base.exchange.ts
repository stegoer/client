import authExchange from "@exchanges/auth.exchange";
import errorExchange from "@exchanges/error.exchange";
import retryExchange from "@exchanges/retry.exchange";
import scalarsExchange from "@exchanges/scalars.exchange";

import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { cacheExchange, dedupExchange } from "urql";

import type { Exchange } from "urql";

const Exchanges: Exchange[] = [
  dedupExchange,
  scalarsExchange,
  cacheExchange,
  errorExchange,
  authExchange,
  retryExchange,
  multipartFetchExchange,
];

export default Exchanges;
