import LocalStorageService from "@/services/local-storage.service";

import { Button } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { AvatarIcon } from "@modulz/radix-icons";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import type { User } from "@/graphql/generated/codegen.generated";
import type { FC } from "react";

type Props = {
  user: User;
};

const LogoutButton: FC<Props> = ({ user }) => {
  const router = useRouter();
  const notifications = useNotifications();

  const onClick = useCallback(() => {
    LocalStorageService.remove(`token`);
    void router.push(`/`);
    notifications.showNotification({
      title: `Account ${user.username}`,
      message: `Successfully logged out`,
      icon: <AvatarIcon />,
      color: `green`,
    });
  }, [notifications, router, user.username]);

  return <Button onClick={onClick}>Logout</Button>;
};

export default LogoutButton;
