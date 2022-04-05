import useUser from "@hooks/user.hook";
import PageLayout from "@layouts/page-layout/page.layout";

import dynamic from "next/dynamic";
import { useState } from "react";

import type { NextPage } from "next";

const AccountComponent = dynamic(
  () => import(`@features/account/components/account.component`),
);
const AuthComponent = dynamic(
  () => import(`@features/auth/components/auth.component`),
);

const DEFAULT_TITLE = `account`;

const Account: NextPage = () => {
  const [user] = useUser();
  const [title, setTitle] = useState(DEFAULT_TITLE);

  return (
    <PageLayout title={title}>
      {user ? (
        <AccountComponent
          user={user}
          setTitle={setTitle}
        />
      ) : (
        <AuthComponent setTitle={setTitle} />
      )}
    </PageLayout>
  );
};

export default Account;
