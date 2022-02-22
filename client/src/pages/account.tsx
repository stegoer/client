import AuthView from "@components/account/auth-view/auth-view";
import AuthForm from "@components/account/forms/auth.form";
import useUser from "@hooks/user.hook";

import { Paper } from "@mantine/core";

import type { NextPage } from "next";

const Account: NextPage = () => {
  const { user } = useUser();

  return (
    <Paper style={{ width: 300, position: `relative` }}>
      {user ? <AuthView user={user} /> : <AuthForm />}
    </Paper>
  );
};

export default Account;
