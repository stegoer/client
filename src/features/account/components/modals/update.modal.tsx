import { Modal } from "@mantine/core";
import dynamic from "next/dynamic";

import type { User } from "@graphql/generated/codegen.generated";
import type { Dispatch, SetStateAction } from "react";

const UpdateForm = dynamic(
  () => import(`@features/account/components/update.form`),
);

export type UpdateModalProps = {
  user: User;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const UpdateModal = ({
  user,
  opened,
  setOpened,
}: UpdateModalProps): JSX.Element => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Update ${user.username} account`}
    >
      <UpdateForm user={user} />
    </Modal>
  );
};

export default UpdateModal;
