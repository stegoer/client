import AuthForm from "@/components/account/forms/auth.form";
import UpdateModal from "@/components/account/modals/update.modal";
import UserData from "@/components/account/user-data/user-data";
import { useOverviewQuery } from "@/graphql/generated/codegen.generated";

import { Loader, Paper, Title } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";

import type { User } from "@/graphql/generated/codegen.generated";
import type { NextPage } from "next";

const Account: NextPage = () => {
  const [overviewQuery, fetchOverviewQuery] = useOverviewQuery();
  const [user, setUser] = useState<User>();

  const fetchNew = useCallback(
    () => fetchOverviewQuery({ requestPolicy: `network-only` }),
    [fetchOverviewQuery],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchNew, []);

  useEffect(() => {
    if (overviewQuery.data?.overview.user) {
      setUser(overviewQuery.data.overview.user);
    }
  }, [overviewQuery]);

  let content;
  if (overviewQuery.fetching) {
    content = <Loader />;
  } else if (overviewQuery.error) {
    content = <AuthForm />;
  } else {
    content = (
      <>
        <Title>Account</Title>
        {user && (
          <>
            <UserData user={user} />
            <UpdateModal user={user} onSuccess={fetchNew} />
          </>
        )}
      </>
    );
  }

  return <Paper style={{ width: 300, position: `relative` }}>{content}</Paper>;
};

export default Account;
