import AuthForm from "@components/account/forms/auth.form";
import UpdateModal from "@components/account/modals/update.modal";
import UserData from "@components/account/user-data/user-data";
import useUser from "@hooks/base/user.hook";

import { Paper, Title } from "@mantine/core";

import type { NextPage } from "next";

const Account: NextPage = () => {
  const [user, updateUser] = useUser();

  return (
    <Paper style={{ width: 300, position: `relative` }}>
      {user ? (
        <>
          <Title>Account</Title>
          <UserData user={user} />
          <UpdateModal user={user} onSuccess={updateUser} />
        </>
      ) : (
        <AuthForm dispatch={updateUser} />
      )}
    </Paper>
  );
};

export default Account;
