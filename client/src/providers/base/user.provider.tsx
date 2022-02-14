import { intervalMilliseconds } from "@constants/base/user.constants";
import { useOverviewQuery } from "@graphql/generated/codegen.generated";

import { createContext, useCallback, useEffect } from "react";

import type { UserPayload } from "@custom-types/base/user.types";
import type { FC } from "react";
import type { OperationContext } from "urql";

export const UserContext = createContext<UserPayload | undefined>(undefined);

const UserProvider: FC = ({ children }) => {
  const [overviewQuery, fetchOverviewQuery] = useOverviewQuery();

  const reFetch = useCallback(
    (options?: Partial<OperationContext> | undefined) => {
      fetchOverviewQuery({ requestPolicy: `network-only`, ...options });
    },
    [fetchOverviewQuery],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      reFetch();
    }, intervalMilliseconds);

    return () => clearInterval(interval);
  }, [reFetch]);

  return (
    <UserContext.Provider value={[overviewQuery.data?.overview.user, reFetch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
