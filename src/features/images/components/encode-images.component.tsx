import ImagesFormComponent from "@features/images/components/images-form/images-form.component";
import {
  IMAGE_DATA_URI_PREFIX,
  LSB_USED_MARK,
} from "@features/images/images.constants";
import { useEncodeImageMutation } from "@graphql/generated/codegen.generated";

import { Image } from "@mantine/core";
import { useCallback, useState } from "react";

import type { UseFormType } from "@features/images/images.types";
import type { ReactNode } from "react";

const EncodeImagesComponent = (): JSX.Element => {
  const [encodeImageResult, encodeImage] = useEncodeImageMutation();
  const [error, setError] = useState<ReactNode>();

  const onSubmit = useCallback(
    (values: UseFormType[`values`]) => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setError(undefined);

      if (values.file && values.channel) {
        void encodeImage({
          message: values.message,
          lsbUsed: values.lsbUsed / LSB_USED_MARK,
          channel: values.channel,
          file: values.file,
        }).then((result) => {
          if (result.error) {
            setError(result.error.message);
          }
        });
      }
    },
    [encodeImage],
  );

  return (
    <>
      <ImagesFormComponent
        formType="encode"
        loading={encodeImageResult.fetching}
        onSubmit={onSubmit}
        error={error}
      />
      {encodeImageResult.data?.encodeImage && (
        <Image
          src={`${IMAGE_DATA_URI_PREFIX}${encodeImageResult.data.encodeImage.file.content}`}
          fit="contain"
          alt="Image with encoded message"
          withPlaceholder
          mb={20}
        />
      )}
    </>
  );
};

export default EncodeImagesComponent;
