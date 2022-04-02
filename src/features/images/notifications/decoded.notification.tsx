import {
  GREEN_CHECK,
  NotificationTitle,
} from "@constants/notifications.constants";

import type { NotificationProps } from "@mantine/notifications";

const decodedDataCopiedNotification = (filename: string): NotificationProps => {
  return {
    ...GREEN_CHECK,
    title: NotificationTitle.DECODE,
    message: `Decoded data from ${filename} has been copied to clipboard.`,
  };
};

export default decodedDataCopiedNotification;
