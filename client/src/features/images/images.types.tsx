import type { MantineColor } from "@mantine/core";

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
