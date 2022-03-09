import ImageFileInput from "@components/input/image-file.input";
import MessageInput from "@components/input/message.input";
import ChannelSwitches from "@features/images/components/images-form/channel.switch";
import LSBUsedSlider from "@features/images/components/images-form/lsb-used.slider";

import type { Channel } from "@graphql/generated/codegen.generated";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

type Props = {
  form: UseForm<{
    message: string;
    lsbUsed: number;
    channel?: Channel;
    file?: File;
  }>;
  disabled: boolean;
};

const ImagesFormInput = ({ form, disabled }: Props): JSX.Element => {
  return (
    <>
      <MessageInput
        form={form}
        placeholder="Message to encode into your image"
        disabled={disabled}
      />
      <LSBUsedSlider form={form} />
      <ChannelSwitches form={form} disabled={disabled} />
      <ImageFileInput form={form} disabled={disabled} />
    </>
  );
};

export default ImagesFormInput;
