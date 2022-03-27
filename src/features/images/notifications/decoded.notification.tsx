import {
  GREEN_CHECK,
  NotificationTitle,
} from "@constants/notifications.constants";

import type { NotificationProps } from "@mantine/notifications";

const decodedMessageCopiedNotification = (): NotificationProps => {
  return {
    ...GREEN_CHECK,
    title: NotificationTitle.ACCOUNT,
    message: `Decoded message has been copied to clipboard`,
  };
};

export default decodedMessageCopiedNotification;
