import ImageTableComponent from "@features/image-table/components/image-table.component";
import ImageTableSkeleton from "@features/image-table/components/image-table.skeleton";
import useAuth from "@hooks/auth.hook";
import useUser from "@hooks/user.hook";
import loginRequiredNotification from "@layouts/navbar/login-required.notification";
import PageLayout from "@layouts/page.layout";

import { Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";

import type { NextPage } from "next";

const Images: NextPage = () => {
  const router = useRouter();
  const notifications = useNotifications();
  const [user] = useUser();
  const auth = useAuth();

  useEffect(() => {
    if (!user && !auth.fetching) {
      notifications.showNotification(
        loginRequiredNotification(`Images`, `/images`),
      );
      void router.push(`/account`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.fetching, user]);

  return (
    <PageLayout title="images">
      <Title>Images</Title>
      {user ? <ImageTableComponent /> : <ImageTableSkeleton />}
    </PageLayout>
  );
};

export default Images;
