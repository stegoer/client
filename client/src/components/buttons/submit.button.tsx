import { Button } from "@mantine/core";

import type { FC } from "react";

type Props = {
  text: string;
};

const SubmitButton: FC<Props> = ({ text }) => {
  return <Button type="submit">{text}</Button>;
};

export default SubmitButton;
