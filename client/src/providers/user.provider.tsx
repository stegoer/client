import { useOverviewQuery } from "@graphql/generated/codegen.generated";

import { createContext } from "react";

import type { User } from "@graphql/generated/codegen.generated";
import type { FC } from "react";
import type { OperationContext } from "urql";

export const UserContext = createContext<User | undefined>(undefined);

export const FetchNewOverviewContext = createContext<
  (options?: Partial<OperationContext> | undefined) => void
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(() => {});

const interval = 600_000; // 10 minutes

const UserProvider: FC = ({ children }) => {
  const [overviewQuery, fetchOverviewQuery] = useOverviewQuery();

  setInterval(fetchOverviewQuery, interval);

  return (
    <UserContext.Provider value={overviewQuery.data?.overview.user}>
      <FetchNewOverviewContext.Provider value={fetchOverviewQuery}>
        {children}
      </FetchNewOverviewContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
