import { Button } from "@mantine/core";

import type { FC } from "react";

type Props = {
  text: string;
  disabled: boolean;
};

const SubmitButton: FC<Props> = ({ text, disabled }) => {
  return (
    <Button type="submit" disabled={disabled}>
      {text}
    </Button>
  );
};

export default SubmitButton;
