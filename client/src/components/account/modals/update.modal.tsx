import UpdateForm from "@components/account/forms/update.form";
import LogoutButton from "@components/buttons/logout.button";

import { Button, Group, Modal } from "@mantine/core";
import { useState } from "react";

import type { User } from "@graphql/generated/codegen.generated";
import type { FC } from "react";

type Props = {
  user: User;
  onSuccess(): void;
};

const UpdateModal: FC<Props> = ({ user, onSuccess }) => {
  const [opened, setOpened] = useState(false);
  const updateTitle = `Update ${user.username} account`;

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={updateTitle}
      >
        <UpdateForm user={user} onSuccess={onSuccess} />
      </Modal>

      <Group grow>
        <Button onClick={() => setOpened(true)}>{updateTitle}</Button>
        <LogoutButton user={user} />
      </Group>
    </>
  );
};

export default UpdateModal;
