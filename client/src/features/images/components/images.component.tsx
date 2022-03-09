import SubmitButton from "@components/buttons/submit.button";
import ErrorText from "@components/errors/error.text";
import ImageData from "@features/images/components/image-data";
import ImagesFormInput from "@features/images/components/images-form/images-form.input";
import {
  IMAGE_DATA_URI_PREFIX,
  LSB_USED_MARK,
} from "@features/images/images.constants";
import { useEncodeImageMutation } from "@graphql/generated/codegen.generated";
import useImagesForm from "@hooks/images-form.hook";

import { LoadingOverlay } from "@mantine/core";
import NextImage from "next/image";
import { useCallback, useEffect, useState } from "react";

import type { Image } from "@graphql/generated/codegen.generated";
import type { ReactNode } from "react";

const ImagesComponent = (): JSX.Element => {
  const form = useImagesForm();
  const [encodeImageResult, encodeImage] = useEncodeImageMutation();
  const [image, setImage] = useState<Image>();
  const [error, setError] = useState<ReactNode>();
  const loading = encodeImageResult.fetching;

  const onSubmit = useCallback(
    (values: typeof form[`values`]) => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setError(undefined);

      if (values.file && values.channel) {
        // noinspection TypeScriptValidateTypes
        void encodeImage({
          message: values.message,
          lsbUsed: values.lsbUsed / LSB_USED_MARK,
          channel: values.channel,
          file: values.file,
        }).then((result) => {
          if (result.error) {
            setError(result.error.message);
          } else if (result.data?.encodeImage)
            setImage(result.data.encodeImage.image);
        });
      }
    },
    [encodeImage],
  );

  useEffect(() => {
    const error =
      form.errors.message ||
      form.errors.lsbUsed ||
      form.errors.channel ||
      form.errors.file;
    setError(error);
  }, [
    form.errors.channel,
    form.errors.file,
    form.errors.lsbUsed,
    form.errors.message,
  ]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <LoadingOverlay visible={loading} />

      <ImagesFormInput form={form} disabled={loading} />

      {error && <ErrorText error={error} />}

      {image && <ImageData image={image} />}
      {encodeImageResult.data?.encodeImage && (
        <NextImage
          src={`${IMAGE_DATA_URI_PREFIX}${encodeImageResult.data.encodeImage.file.content}`}
          layout="fill"
        />
      )}

      <SubmitButton disabled={loading}>Encode</SubmitButton>
    </form>
  );
};

export default ImagesComponent;
