import {
  LSB_USED_MARK,
  LSB_USED_MAX,
  LSB_USED_MIN,
} from "@features/images/images.constants";
import { Channel } from "@graphql/generated/codegen.generated";
import aesValidator from "@validators/aes.validator";

import { useForm } from "@mantine/hooks";

import type {
  ImagesFormType,
  UseImagesFormType,
} from "@features/images/images.types";

const useImagesForm = (formType: ImagesFormType): UseImagesFormType => {
  const encryptionKeyValidator = aesValidator();

  return useForm<{
    message: string;
    encryptionKey?: string;
    lsbUsed: number;
    channel?: Channel;
    file?: File;
  }>({
    initialValues: {
      message: ``,
      encryptionKey: undefined,
      lsbUsed: LSB_USED_MARK,
      channel: Channel.RedGreenBlue,
      file: undefined,
    },

    validationRules: {
      message: (value) => formType === `decode` || !!value,
      encryptionKey: (value) => !value || encryptionKeyValidator(value),
      lsbUsed: (value) => {
        value = (LSB_USED_MAX * LSB_USED_MARK) / value;
        return value >= LSB_USED_MIN && value <= LSB_USED_MAX;
      },
      channel: (value) => value !== undefined,
      file: (value) => value !== undefined,
    },

    errorMessages: {
      message: `Message can't be empty`,
      encryptionKey: `Encryption key is not a valid `,
      channel: `Please choose at least one color channel`,
      file: `Image file is required`,
    },
  });
};

export default useImagesForm;
