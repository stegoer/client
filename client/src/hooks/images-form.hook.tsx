import { MAX_LSB_USED, MIN_LSB_USED } from "@features/images/images.constants";
import { Channel } from "@graphql/generated/codegen.generated";

import { useForm } from "@mantine/hooks";

const useImagesForm = () => {
  return useForm<{
    message: string;
    lsbUsed: number;
    channel?: Channel;
    file?: File;
  }>({
    initialValues: {
      message: ``,
      lsbUsed: 1,
      channel: Channel.RedGreenBlue,
      file: undefined,
    },

    validationRules: {
      message: (value) => !!value,
      lsbUsed: (value) => {
        value = 100 / value;
        return value >= MIN_LSB_USED && value <= MAX_LSB_USED;
      },
      channel: (value) => !!value,
      file: (value) => !!value,
    },

    errorMessages: {
      message: `Message can't be empty`,
      lsbUsed: `Least significant bits should be within the range [${MIN_LSB_USED}:${MAX_LSB_USED}]`,
      channel: `Please pick which color channels to use when encoding the message`,
      file: `Please choose an image file to encode your message into`,
    },
  });
};

export default useImagesForm;
