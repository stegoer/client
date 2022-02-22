import useAuth from "@hooks/auth.hook";

import { Button } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { AvatarIcon } from "@modulz/radix-icons";
import { useCallback } from "react";

import type { User } from "@graphql/generated/codegen.generated";
import type { FC } from "react";

type Props = {
  user: User;
  disabled: boolean;
};

const LogoutButton: FC<Props> = ({ user, disabled }) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { logout } = useAuth();
  const notifications = useNotifications();

  const onClick = useCallback(() => {
    logout();
    notifications.showNotification({
      title: `Account ${user.username}`,
      message: `Successfully logged out`,
      icon: <AvatarIcon />,
      color: `green`,
    });
  }, [logout, notifications, user.username]);

  return (
    <Button onClick={onClick} disabled={disabled}>
      Logout
    </Button>
  );
};

export default LogoutButton;
