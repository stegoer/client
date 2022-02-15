import { intervalMilliseconds } from "@constants/base/user.constants";
import {
  useOverviewQuery,
  useRefreshTokenMutation,
} from "@graphql/generated/codegen.generated";
import useLocalStorageValue from "@hooks/base/local-storage.hook";

import { createContext, useCallback, useEffect } from "react";

import type { UserPayload } from "@custom-types/base/user.types";
import type { FC } from "react";
import type { OperationContext } from "urql";

export const UserContext = createContext<UserPayload | undefined>(undefined);

const UserProvider: FC = ({ children }) => {
  const [overviewQuery, fetchOverviewQuery] = useOverviewQuery();
  const [, refreshToken] = useRefreshTokenMutation();
  const [token, setToken] = useLocalStorageValue({ key: `token` });

  const updateUser = useCallback(
    (options?: Partial<OperationContext> | undefined) => {
      fetchOverviewQuery({ requestPolicy: `network-only`, ...options });
    },
    [fetchOverviewQuery],
  );

  const updateToken = useCallback(() => {
    if (token) {
      void refreshToken({ token }, { requestPolicy: `network-only` }).then(
        (result) => {
          if (result.data?.refreshToken.auth.token) {
            setToken(result.data.refreshToken.auth.token);
          }
        },
      );
    }
  }, [refreshToken, setToken, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateUser();
      updateToken();
    }, intervalMilliseconds);

    return () => clearInterval(interval);
  }, [updateToken, updateUser]);

  return (
    <UserContext.Provider
      value={[overviewQuery.data?.overview.user, updateUser]}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
