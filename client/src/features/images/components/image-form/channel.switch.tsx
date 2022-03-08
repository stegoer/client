import { CHANNEL_SWITCH_STYLES } from "@features/images/images.constants";
import { Channel } from "@graphql/generated/codegen.generated";

import { Switch, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import type {
  ChannelSwitchStateType,
  ChannelSwitchType,
} from "@features/images/images.types";
import type { ReactNode } from "react";

type Props = {
  disabled: boolean;
  error: ReactNode;
  setChannel(channel?: Channel): void;
};

const ChannelSwitches = ({
  disabled,
  error,
  setChannel,
}: Props): JSX.Element => {
  const [redChecked, setRedChecked] = useState(true);
  const [greenChecked, setGreenChecked] = useState(true);
  const [blueChecked, setBlueChecked] = useState(true);

  const switchStates: ChannelSwitchStateType[] = [
    { checked: redChecked, setChecked: setRedChecked },
    { checked: greenChecked, setChecked: setGreenChecked },
    { checked: blueChecked, setChecked: setBlueChecked },
  ];
  const switches: ChannelSwitchType[] = CHANNEL_SWITCH_STYLES.map(
    (channelStyle, index) => {
      return { style: channelStyle, state: switchStates[index] };
    },
  );

  useEffect(() => {
    let updatedChannel;
    if (redChecked && greenChecked && blueChecked) {
      updatedChannel = Channel.RedGreenBlue;
    } else if (redChecked && greenChecked && !blueChecked) {
      updatedChannel = Channel.RedGreen;
    } else if (redChecked && !greenChecked && blueChecked) {
      updatedChannel = Channel.RedBlue;
    } else if (redChecked && !greenChecked && !blueChecked) {
      updatedChannel = Channel.Red;
    } else if (!redChecked && greenChecked && blueChecked) {
      updatedChannel = Channel.GreenBlue;
    } else if (!redChecked && greenChecked && !blueChecked) {
      updatedChannel = Channel.Green;
    } else if (!redChecked && !greenChecked && blueChecked) {
      updatedChannel = Channel.Blue;
    }
    setChannel(updatedChannel);
  }, [blueChecked, greenChecked, redChecked, setChannel]);

  return (
    <>
      {switches.map((channelSwitch, index) => (
        <Switch
          key={index}
          label={channelSwitch.style.label}
          color={channelSwitch.style.color}
          checked={channelSwitch.state.checked}
          onChange={(event) =>
            channelSwitch.state.setChecked(event.currentTarget.checked)
          }
          disabled={disabled}
        />
      ))}
      {
        <Text color="red" size="sm" mt="sm">
          {error}
        </Text>
      }
    </>
  );
};

export default ChannelSwitches;
