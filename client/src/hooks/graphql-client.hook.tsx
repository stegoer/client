import createClient from "@graphql/client";

import { useMemo } from "react";

import type { Client } from "urql";

const useClient = (
  isAuthenticated: boolean,
  options?: RequestInit,
): Client => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createClient(options), [isAuthenticated, options]);
};

export default useClient;
