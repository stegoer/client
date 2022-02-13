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

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Update ${user.username} account`}
      >
        <UpdateForm user={user} onSuccess={onSuccess} />
      </Modal>

      <Group>
        <Button onClick={() => setOpened(true)} disabled={opened}>
          Update Account
        </Button>
        <LogoutButton user={user} disabled={opened} />
      </Group>
    </>
  );
};

export default UpdateModal;
