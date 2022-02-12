import AuthForm from "@/components/account/forms/auth.form";
import UpdateForm from "@/components/account/forms/update.form";
import UserData from "@/components/account/user-data/user-data";
import { useOverviewQuery } from "@/graphql/generated/codegen.generated";

import { Loader, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

import type { User } from "@/graphql/generated/codegen.generated";
import type { NextPage } from "next";

const Account: NextPage = () => {
  const [overviewQuery] = useOverviewQuery();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (overviewQuery.data?.overview.user) {
      setUser(overviewQuery.data.overview.user);
    }
  }, [overviewQuery]);

  if (overviewQuery.fetching) {
    return <Loader />;
  } else if (overviewQuery.error) {
    return <AuthForm />;
  }

  return (
    <>
      <Title>Account</Title>
      {user && (
        <>
          <UserData user={user} />
          <UpdateForm user={user} />
        </>
      )}
    </>
  );
};

export default Account;
