import NotificationButton from "@components/buttons/notification.button";
import useUser from "@hooks/user.hook";
import loginRequiredNotification from "@notifications/login-required.notification";

import { LockClosedIcon, LockOpen1Icon } from "@modulz/radix-icons";
import Link from "next/link";

import type { FC } from "react";

type Props = {
  to: string;
};

const blankHref = `#`;

const LoginRequiredLink: FC<Props> = ({ children, to }) => {
  const { isAuthenticated } = useUser();

  const content = isAuthenticated ? (
    <>
      <LockOpen1Icon />
      {children}
    </>
  ) : (
    <NotificationButton
      notificationProps={loginRequiredNotification(children, to)}
    >
      {<LockClosedIcon />}
      {children}
    </NotificationButton>
  );

  return (
    <Link href={isAuthenticated ? to : blankHref}>
      <a>{content}</a>
    </Link>
  );
};

export default LoginRequiredLink;
