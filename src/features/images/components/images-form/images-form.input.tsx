import SubmitButton from "@components/buttons/submit.button";
import ErrorText from "@components/errors/error.text";
import ChannelSwitches from "@components/input/channel.switch";
import ImageDropzone from "@components/input/image.dropzone";
import LSBUsedSlider from "@components/input/lsb-used.slider";
import MessageInput from "@components/input/message.input";
import { capitalize } from "@utils/format.utils";

import { Group } from "@mantine/core";

import type { FormType } from "@features/images/images.types";
import type { Channel } from "@graphql/generated/codegen.generated";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import type { ReactNode } from "react";

export type ImagesFormInputProps = {
  form: UseForm<{
    message: string;
    lsbUsed: number;
    channel?: Channel;
    file?: File;
  }>;
  formType: FormType;
  disabled: boolean;
  error?: ReactNode;
};

const ImagesFormInput = ({
  form,
  formType,
  disabled,
  error,
}: ImagesFormInputProps): JSX.Element => {
  return (
    <Group
      grow
      direction="column"
      spacing="xl"
    >
      {formType === `encode` && (
        <MessageInput
          form={form}
          placeholder={`Message to ${formType} into your image`}
          disabled={disabled}
        />
      )}
      <LSBUsedSlider form={form} />
      <ChannelSwitches
        form={form}
        disabled={disabled}
      />
      <ImageDropzone
        form={form}
        loading={disabled}
      />

      {error && <ErrorText error={error} />}

      <SubmitButton disabled={disabled}>{capitalize(formType)}</SubmitButton>
    </Group>
  );
};

export default ImagesFormInput;
