import AuthForm from "@components/account/forms/auth.form";
import UpdateModal from "@components/account/modals/update.modal";
import UserData from "@components/account/user-data/user-data";
import {
  FetchNewOverviewContext,
  UserContext,
} from "@providers/user.provider";

import { Paper, Title } from "@mantine/core";
import { useCallback, useContext, useEffect, useState } from "react";

import type { NextPage } from "next";

const Account: NextPage = () => {
  const contextUser = useContext(UserContext);
  const [user, setUser] = useState(contextUser);
  const fetchNewOverview = useContext(FetchNewOverviewContext);

  const fetchNew = useCallback(
    () => fetchNewOverview({ requestPolicy: `network-only` }),
    [fetchNewOverview],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchNew, []);

  return (
    <Paper style={{ width: 300, position: `relative` }}>
      {user ? (
        <>
          <Title>Account</Title>
          <UserData user={user} />
          <UpdateModal user={user} onSuccess={fetchNew} />
        </>
      ) : (
        <AuthForm setUser={setUser} />
      )}
    </Paper>
  );
};

export default Account;
