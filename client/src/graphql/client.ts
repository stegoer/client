import { useMemo } from "react";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { getItem } from "../utils/localStorage";
import { createClient } from "urql";

const useClient = (options?: RequestInit) => {
  const token = getItem(`token`) ?? ``;

  return useMemo(() => {
    return createClient({
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}/graphql`,
      exchanges: [multipartFetchExchange],
      fetchOptions: () => {
        return {
          headers: {
            Authorization: token,
            ...(options?.headers ? options.headers : {}),
          },
        };
      },
    });
  }, [token, options]);
};

export default useClient;
