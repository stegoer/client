import { ActionIcon } from "@mantine/core";
import { ArrowLeftIcon, ArrowRightIcon } from "@modulz/radix-icons";

import type { MoveDirection } from "@custom-types/images.types";
import type { FC } from "react";

type Props = {
  disabled: boolean;
  direction: MoveDirection;
  onMove(direction: MoveDirection): void;
};

const ImageTableNavigationIcon: FC<Props> = ({
  disabled,
  direction,
  onMove,
}) => {
  return (
    <ActionIcon onClick={() => onMove(direction)} disabled={disabled}>
      {direction === `left` ? (
        <ArrowLeftIcon width={25} height={25} />
      ) : (
        <ArrowRightIcon width={25} height={25} />
      )}
    </ActionIcon>
  );
};

export default ImageTableNavigationIcon;
