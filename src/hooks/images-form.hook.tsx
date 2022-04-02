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

const DATA_EMPTY = `<p><br></p>`;

const useImagesForm = (formType: ImagesFormType): UseImagesFormType => {
  const encryptionKeyValidator = aesValidator();

  return useForm<{
    data: string;
    encryptionKey?: string;
    lsbUsed: number;
    channel?: Channel;
    file?: File;
  }>({
    initialValues: {
      data: DATA_EMPTY,
      encryptionKey: undefined,
      lsbUsed: LSB_USED_MARK,
      channel: Channel.RedGreenBlue,
      file: undefined,
    },

    validationRules: {
      data: (value) =>
        formType === `decode` || (!!value && value !== DATA_EMPTY),
      encryptionKey: (value) =>
        value === undefined || encryptionKeyValidator(value),
      lsbUsed: (value) => {
        if (formType === `decode`) {
          return true;
        }
        value = (LSB_USED_MAX * LSB_USED_MARK) / value;
        return value >= LSB_USED_MIN && value <= LSB_USED_MAX;
      },
      channel: (value) => formType === `decode` || value !== undefined,
      file: (value) => value !== undefined,
    },

    errorMessages: {
      data: `Data is missing`,
      encryptionKey: `Encryption key is not a valid `,
      channel: `Please choose at least one color channel`,
      file: `Image file is required`,
    },
  });
};

export default useImagesForm;
