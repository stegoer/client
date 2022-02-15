import { SERVER_GRAPHQL_ENDPOINT } from "@config/environment";
import scalarsExchange from "@graphql/exchange/scalars.exchange";
import LocalStorageService from "@services/base/local-storage.service";

import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { createClient as createURQLClient } from "urql";

const createClient = (options?: RequestInit) => {
  return createURQLClient({
    url: SERVER_GRAPHQL_ENDPOINT,
    exchanges: [scalarsExchange, multipartFetchExchange],
    fetchOptions: () => {
      return {
        headers: {
          Authorization: LocalStorageService.get(`token`) ?? ``,
          ...(options?.headers ? options.headers : {}),
        },
      };
    },
  });
};

export default createClient;
