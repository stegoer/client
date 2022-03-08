import type { ChannelSwitchStyleType } from "@features/images/images.types";

export const MIN_LSB_USED = 1;
export const MAX_LSB_USED = 8;
export const LSB_USED_MARK = 12.5;

export const CHANNEL_SWITCH_STYLES: ChannelSwitchStyleType[] = [
  { label: `use red color channel`, color: `red` },
  { label: `use green color channel`, color: `green` },
  { label: `use blue color channel`, color: `blue` },
];
