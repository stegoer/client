import ImagesFormComponent from "@features/images/components/images-form/images-form.component";
import { LSB_USED_MARK } from "@features/images/images.constants";
import encodedFileDownloadedNotification from "@features/images/notifications/encoded.notification";
import { useEncodeImageMutation } from "@graphql/generated/codegen.generated";
import { base64toBlob, download } from "@utils/file.utils";

import { MIME_TYPES } from "@mantine/dropzone";
import { useScrollIntoView } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import type { UseImagesFormType } from "@features/images/images.types";
import type { FileType } from "@graphql/generated/codegen.generated";
import type { ImageProps } from "@mantine/core";
import type { ReactNode, RefAttributes } from "react";

const Image = dynamic<ImageProps & RefAttributes<HTMLDivElement>>(() =>
  import(`@mantine/core`).then((module_) => module_.Image),
);

const EncodeImagesComponent = (): JSX.Element => {
  const notifications = useNotifications();
  const [encodeImageResult, encodeImage] = useEncodeImageMutation();
  const [file, setFile] = useState<FileType>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [error, setError] = useState<ReactNode>();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  const onSubmit = useCallback(
    (values: UseImagesFormType[`values`]) => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setError(undefined);
      // eslint-disable-next-line unicorn/no-useless-undefined
      setImageUrl(undefined);

      if (values.file && values.channel) {
        void encodeImage({
          data: values.data,
          encryptionKey: values.encryptionKey ?? undefined,
          lsbUsed: values.lsbUsed / LSB_USED_MARK,
          channel: values.channel,
          upload: values.file,
        }).then((result) => {
          if (result.error) {
            setError(result.error.message);
          } else if (result.data?.encodeImage.file) {
            setFile(result.data.encodeImage.file);
          }
        });
      }
    },
    [encodeImage],
  );

  // show and download image whenever blob is changed
  useEffect(() => {
    let objectUrl: string;

    if (file && !imageUrl) {
      void base64toBlob(file.content, MIME_TYPES.png).then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);

        download(objectUrl, file.name);
        notifications.showNotification(
          encodedFileDownloadedNotification(file.name),
        );
      });
    }

    // free memory on cleanup
    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, imageUrl]);

  return (
    <>
      <ImagesFormComponent
        formType="encode"
        loading={encodeImageResult.fetching}
        onSubmit={onSubmit}
        error={error}
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          fit="contain"
          alt="Image with encoded message"
          withPlaceholder
          mt={20}
          mb={20}
          ref={targetRef}
          onLoad={() => scrollIntoView()}
        />
      )}
    </>
  );
};

export default EncodeImagesComponent;
