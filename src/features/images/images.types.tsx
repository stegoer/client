import type { Channel } from "@graphql/generated/codegen.generated";
import type { MantineColor } from "@mantine/core";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type ImagesFormType = `encode` | `decode`;

export type UseImagesFormType = UseForm<{
  data: string;
  encryptionKey?: string;
  lsbUsed: number;
  channel?: Channel;
  evenDistribution: boolean;
  file?: File;
}>;

export type ChannelSwitchStyleType = {
  label: string;
  color: MantineColor;
};

export type ChannelSwitchStateType = {
  checked: boolean;
  setChecked(checked: boolean): void;
};

export type ChannelSwitchType = {
  style: ChannelSwitchStyleType;
  state: ChannelSwitchStateType;
};
