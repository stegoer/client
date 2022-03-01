import { Button } from "@mantine/core";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  disabled: boolean;
};

const SubmitButton = ({ children, disabled }: Props): JSX.Element => {
  return (
    <Button type="submit" disabled={disabled}>
      {children}
    </Button>
  );
};

export default SubmitButton;
