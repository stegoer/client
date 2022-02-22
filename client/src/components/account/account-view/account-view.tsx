import UpdateModal from "@components/account/account-view/modals/update.modal";
import UserData from "@components/account/account-view/user-data";
import LogoutButton from "@components/buttons/logout.button";

import { Button, Group, Title } from "@mantine/core";
import { useState } from "react";

import type { User } from "@graphql/generated/codegen.generated";
import type { FC } from "react";

type Props = {
  user: User;
};

const AccountView: FC<Props> = ({ user }) => {
  const [modelOpened, setModalOpened] = useState(false);

  return (
    <>
      <Title>Account</Title>
      <UserData user={user} />
      <UpdateModal
        user={user}
        opened={modelOpened}
        setOpened={setModalOpened}
      />
      <Group>
        <Button onClick={() => setModalOpened(true)} disabled={modelOpened}>
          Update Account
        </Button>
        <LogoutButton user={user} disabled={modelOpened} />
      </Group>
    </>
  );
};

export default AccountView;
