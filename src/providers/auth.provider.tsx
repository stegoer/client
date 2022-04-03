import AuthContext from "@context/auth.context";
import {
  useOverviewQuery,
  useRefreshTokenMutation,
} from "@graphql/generated/codegen.generated";
import useLocalStorageValue from "@hooks/local-storage.hook";
import useUser from "@hooks/user.hook";
import LocalStorageService from "@services/local-storage.service";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect } from "react";

import type { User } from "@graphql/generated/codegen.generated";
import type { PropsWithChildren } from "react";

export const REFRESH_INTERVAL = 600_000; // 10 minutes

export type AuthProviderProps = PropsWithChildren<Record<never, never>>;

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [overviewQuery, fetchOverviewQuery] = useOverviewQuery();
  const [, refreshToken] = useRefreshTokenMutation();
  const [token, setToken] = useLocalStorageValue({ key: `token` });
  const [, setUser] = useUser();

  const updateToken = useCallback(() => {
    if (token) {
      void refreshToken({ token }, { requestPolicy: `network-only` }).then(
        (r) => {
          if (r.data?.refreshToken) {
            setToken(r.data.refreshToken.auth.token);
            setUser(r.data.refreshToken.user);
          }
        },
      );
    }
  }, [refreshToken, setToken, setUser, token]);

  const interval = useInterval(() => updateToken(), REFRESH_INTERVAL);

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // whenever token is changed/removed we want to fetch the latest data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchOverviewQuery(), [token]);

  // whenever overview has new data we update user accordingly
  useEffect(() => {
    setUser(overviewQuery.data?.overview.user);
  }, [overviewQuery.data?.overview.user, setUser]);

  const afterLogin = useCallback(
    (token: string, user: User) => {
      setToken(token);
      setUser(user);
    },
    [setToken, setUser],
  );

  const logout = useCallback(() => {
    LocalStorageService.remove(`token`);
    // eslint-disable-next-line unicorn/no-useless-undefined
    setUser(undefined);
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{ fetching: overviewQuery.fetching, afterLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
