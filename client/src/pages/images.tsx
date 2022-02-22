import LoginAnchor from "@components/anchors/login.anchor";
import ImageSkeletonView from "@components/image/image-skeleton-view";
import ImageView from "@components/image/image-view";
import useUser from "@hooks/user.hook";

import { Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { Cross2Icon } from "@modulz/radix-icons";
import { useEffect } from "react";

import type { NextPage } from "next";

const Images: NextPage = () => {
  const { isAuthenticated } = useUser();
  const notifications = useNotifications();

  // clean and show notification on mount if user is not authenticated
  useEffect(() => {
    notifications.clean();

    if (!isAuthenticated) {
      const id = notifications.showNotification({
        title: `Images`,
        message: (
          <span>
            Please{` `}
            {
              <LoginAnchor
                disabled={isAuthenticated}
                onClick={() => notifications.hideNotification(id)}
              />
            }
            {` `}
            to access this page
          </span>
        ),
        icon: <Cross2Icon />,
        color: `red`,
        autoClose: false,
      });
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
