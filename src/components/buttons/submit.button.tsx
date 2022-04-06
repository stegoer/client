import { Button } from "@mantine/core";

import type { MantineNumberSize } from "@mantine/core";
import type { PropsWithChildren } from "react";

export type SubmitButtonProps = PropsWithChildren<{
  disabled: boolean;
  mb?: MantineNumberSize | string;
}>;

const SubmitButton = ({
  children,
  disabled,
  mb,
}: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      type="submit"
      disabled={disabled}
      mb={mb}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
