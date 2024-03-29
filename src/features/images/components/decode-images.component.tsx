import ImagesFormComponent from "@features/images/components/images-form/images-form.component";
import decodedMessageCopiedNotification from "@features/images/notifications/decoded.notification";
import { useDecodeImageMutation } from "@graphql/generated/codegen.generated";

import { useClipboard, useScrollIntoView } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import type { UseImagesFormType } from "@features/images/images.types";
import type { TypographyStylesProviderProps } from "@mantine/core";
import type { RefAttributes } from "react";

const TypographyStylesProvider = dynamic<
  TypographyStylesProviderProps & RefAttributes<HTMLDivElement>
>(() =>
  import(`@mantine/core`).then((module_) => module_.TypographyStylesProvider),
);

const DecodeImagesComponent = (): JSX.Element => {
  const clipboard = useClipboard();
  const notifications = useNotifications();
  const [decodeImageResult, decodeImage] = useDecodeImageMutation();
  const [error, setError] = useState<string>();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  const onSubmit = useCallback(
    (values: UseImagesFormType[`values`]) => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setError(undefined);

      if (values.file) {
        void decodeImage({
          encryptionKey: values.encryptionKey ?? undefined,
          upload: values.file,
        }).then((result) => {
          if (result.error) {
            setError(result.error.message);
          } else if (result.data?.decodeImage) {
            clipboard.copy(result.data.decodeImage.data);
            notifications.showNotification(
              decodedMessageCopiedNotification(
                values.file?.name || `<filename>`,
              ),
            );
          }
        });
      }
    },
    [clipboard, decodeImage, notifications],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => scrollIntoView(), [decodeImageResult.data?.decodeImage.data]);

  return (
    <>
      <ImagesFormComponent
        formType="decode"
        loading={decodeImageResult.fetching}
        onSubmit={onSubmit}
        error={error}
      />
      {decodeImageResult.data?.decodeImage && (
        <TypographyStylesProvider mb={20}>
          <div
            dangerouslySetInnerHTML={{
              __html: decodeImageResult.data.decodeImage.data,
            }}
            ref={targetRef}
          />
        </TypographyStylesProvider>
      )}
    </>
  );
};

export default DecodeImagesComponent;
