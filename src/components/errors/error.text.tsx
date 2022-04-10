import { capitalize } from "@utils/format.utils";

import { Text } from "@mantine/core";

import type { SharedTextProps } from "@mantine/core";

export type ErrorTextProps = {
  error: string;
  textProps?: SharedTextProps;
};

const ErrorText = ({ error, textProps }: ErrorTextProps): JSX.Element => {
  return (
    <Text
      color="red"
      size="sm"
      mt="sm"
      {...textProps}
    >
      {capitalize(error.replace(`[GraphQL]`, ``).trim())}
    </Text>
  );
};

export default ErrorText;
