import AccountComponent from "@features/account/components/account.component";
import AuthComponent from "@features/auth/components/auth.component";
import useUser from "@hooks/user.hook";
import PageLayout from "@layouts/page.layout";

import type { NextPage } from "next";

const Account: NextPage = () => {
  const [user] = useUser();

  return (
    <PageLayout title="account">
      {user ? <AccountComponent user={user} /> : <AuthComponent />}
    </PageLayout>
  );
};

export default Account;
