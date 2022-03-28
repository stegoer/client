import {
  GREEN_CHECK,
  NotificationTitle,
} from "@constants/notifications.constants";

import type { NotificationProps } from "@mantine/notifications";

const encodedFileDownloadedNotification = (
  filename: string,
): NotificationProps => {
  return {
    ...GREEN_CHECK,
    title: NotificationTitle.ENCODE,
    message: `File ${filename} with encoded data has been successfully downloaded.`,
  };
};

export default encodedFileDownloadedNotification;
