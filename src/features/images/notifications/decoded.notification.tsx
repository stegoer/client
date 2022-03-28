import {
  GREEN_CHECK,
  NotificationTitle,
} from "@constants/notifications.constants";

import type { NotificationProps } from "@mantine/notifications";

const decodedDataCopiedNotification = (): NotificationProps => {
  return {
    ...GREEN_CHECK,
    title: NotificationTitle.DECODE,
    message: `Decoded data has been copied to clipboard.`,
  };
};

export default decodedDataCopiedNotification;
