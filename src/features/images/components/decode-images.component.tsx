import ImagesFormComponent from "@features/images/components/images-form/images-form.component";
import { LSB_USED_MARK } from "@features/images/images.constants";
import decodedMessageCopiedNotification from "@features/images/notifications/decoded.notification";
import { useDecodeImageMutation } from "@graphql/generated/codegen.generated";

import { TypographyStylesProvider } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { useCallback, useState } from "react";

import type { UseImagesFormType } from "@features/images/images.types";
import type { ReactNode } from "react";

const DecodeImagesComponent = (): JSX.Element => {
  const clipboard = useClipboard();
  const notifications = useNotifications();
  const [decodeImageResult, decodeImage] = useDecodeImageMutation();
  const [error, setError] = useState<ReactNode>();

  const onSubmit = useCallback(
    (values: UseImagesFormType[`values`]) => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setError(undefined);

      if (values.file && values.channel) {
        void decodeImage({
          lsbUsed: values.lsbUsed / LSB_USED_MARK,
          channel: values.channel,
          file: values.file,
        }).then((result) => {
          if (result.error) {
            setError(result.error.message);
          } else if (result.data?.decodeImage) {
            clipboard.copy(result.data.decodeImage.message);
            notifications.showNotification(decodedMessageCopiedNotification()); // todo add filename?
          }
        });
      }
    },
    [clipboard, decodeImage, notifications],
  );

  return (
    <>
      <ImagesFormComponent
        formType="decode"
        loading={decodeImageResult.fetching}
        onSubmit={onSubmit}
        error={error}
      />
      {decodeImageResult.data?.decodeImage && (
        <TypographyStylesProvider>
          <div
            dangerouslySetInnerHTML={{
              __html: decodeImageResult.data.decodeImage.message,
            }}
          />
        </TypographyStylesProvider>
      )}
    </>
  );
};

export default DecodeImagesComponent;
