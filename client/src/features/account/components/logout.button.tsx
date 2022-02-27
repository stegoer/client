import logoutNotification from "@features/account/notifications/logout.notification";
import useAuth from "@hooks/auth.hook";
import LocalStorageService from "@services/local-storage.service";

import { Button } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useCallback } from "react";

import type { User } from "@graphql/generated/codegen.generated";
import type { FC } from "react";

type Props = {
  user: User;
  disabled: boolean;
};

const LogoutButton: FC<Props> = ({ user, disabled }) => {
  const auth = useAuth();
  const notifications = useNotifications();

  const onClick = useCallback(() => {
    console.log(LocalStorageService.get(`token`));
    auth.logout();
    notifications.showNotification(logoutNotification(user));
  }, [auth, notifications, user]);

  return (
    <Button onClick={onClick} disabled={disabled}>
      Logout
    </Button>
  );
};

export default LogoutButton;
