import {
  LSB_USED_MARK,
  LSB_USED_MAX,
  LSB_USED_MIN,
} from "@features/images/images.constants";
import { Channel } from "@graphql/generated/codegen.generated";

import { useForm } from "@mantine/hooks";

import type { FormType } from "@features/images/images.types";

const useImagesForm = (formType: FormType) => {
  return useForm<{
    message: string;
    lsbUsed: number;
    channel?: Channel;
    file?: File;
  }>({
    initialValues: {
      message: ``,
      lsbUsed: LSB_USED_MARK,
      channel: Channel.RedGreenBlue,
      file: undefined,
    },

    validationRules: {
      message: (value) => formType === `decode` || !!value,
      lsbUsed: (value) => {
        value = (LSB_USED_MAX * LSB_USED_MARK) / value;
        return value >= LSB_USED_MIN && value <= LSB_USED_MAX;
      },
      channel: (value) => value !== undefined,
      file: (value) => value !== undefined,
    },

    errorMessages: {
      message: `Message can't be empty`,
      channel: `Please choose at least one color channel`,
      file: `Image file is required`,
    },
  });
};

export default useImagesForm;
