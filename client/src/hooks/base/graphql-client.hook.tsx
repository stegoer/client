import createClient from "@graphql/client";

import { useMemo } from "react";

import type { Client } from "urql";

const useClient = (options?: RequestInit): Client => {
  return useMemo(() => createClient(options), [options]);
};

export default useClient;
