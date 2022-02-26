import ImageSkeletonView from "@components/image/image-skeleton-view";
import ImageView from "@components/image/image-view";
import { NotificationTitle } from "@constants/notifications.constants";
import useUser from "@hooks/user.hook";
import loginRequiredNotification from "@notifications/login-required.notification";

import { Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";

import type { NextPage } from "next";

const Images: NextPage = () => {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const notifications = useNotifications();

  useEffect(() => {
    if (!isAuthenticated) {
      notifications.showNotification(
        loginRequiredNotification(NotificationTitle.IMAGES, `/images`),
      );
      void router.replace(`/account`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Title>Images</Title>
      {isAuthenticated ? <ImageView /> : <ImageSkeletonView />}
    </>
  );
};

export default Images;
