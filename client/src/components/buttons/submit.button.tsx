import { Button } from "@mantine/core";

import type { PropsWithChildren } from "react";

export type Props = PropsWithChildren<{
  disabled: boolean;
}>;

const SubmitButton = ({ children, disabled }: Props): JSX.Element => {
  return (
    <Button type="submit" disabled={disabled}>
      {children}
    </Button>
  );
};

export default SubmitButton;
