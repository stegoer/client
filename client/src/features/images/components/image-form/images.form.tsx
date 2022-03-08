import SubmitButton from "@components/buttons/submit.button";
import ImageFileInput from "@components/input/image-file.input";
import MessageInput from "@components/input/message.input";
import ImageData from "@features/images/components/image-data";
import ChannelSwitches from "@features/images/components/image-form/channel.switch";
import LSBUsedSlider from "@features/images/components/image-form/lsb-used.slider";
import { LSB_USED_MARK } from "@features/images/images.constants";
import { useEncodeImageMutation } from "@graphql/generated/codegen.generated";
import useImagesForm from "@hooks/images-form.hook";

import { LoadingOverlay, Text } from "@mantine/core";
import NextImage from "next/image";
import { useCallback, useEffect, useState } from "react";

import type { Image, Channel } from "@graphql/generated/codegen.generated";

const ImagesForm = (): JSX.Element => {
  const form = useImagesForm();
  const [encodeImageResult, encodeImage] = useEncodeImageMutation();
  const [imageChannel, setImageChannel] = useState<Channel>();
  const [imageFile, setImageFile] = useState<File>();
  const [image, setImage] = useState<Image>();
  const [error, setError] = useState<string>();
  const loading = encodeImageResult.fetching;

  const onSubmit = useCallback(
    (values: typeof form[`values`]) => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setError(undefined);

      if (imageFile && values.channel) {
        void encodeImage({
          message: values.message,
          lsbUsed: values.lsbUsed / LSB_USED_MARK,
          channel: values.channel,
          file: imageFile,
        }).then((result) => {
          if (result.error) {
            setError(result.error.message);
          } else if (result.data?.encodeImage)
            setImage(result.data.encodeImage.image);
        });
      }
    },
    [encodeImage, imageFile],
  );

  useEffect(() => {
    form.setFieldValue(`channel`, imageChannel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageChannel]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <LoadingOverlay visible={loading} />

      <MessageInput
        form={form}
        placeholder="Message to encode into your image"
        disabled={loading}
      />
      <LSBUsedSlider form={form} />
      <ChannelSwitches
        disabled={loading}
        error={form.errors.channel}
        setChannel={setImageChannel}
      />
      <ImageFileInput form={form} setSelectedFile={setImageFile} />

      {error && (
        <Text color="red" size="sm" mt="sm">
          {error}
        </Text>
      )}

      {image && <ImageData image={image} />}
      {encodeImageResult.data?.encodeImage && (
        <NextImage
          src={`data:image/png;base64,${encodeImageResult.data.encodeImage.file.content}`}
          layout="fill"
        />
      )}

      <SubmitButton disabled={loading}>Encode</SubmitButton>
    </form>
  );
};

export default ImagesForm;
