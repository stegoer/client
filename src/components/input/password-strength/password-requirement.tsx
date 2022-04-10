import { Box, Text } from "@mantine/core";
import dynamic from "next/dynamic";

import type { IconProps } from "@modulz/radix-icons/dist/types";

const CheckIcon = dynamic<IconProps>(() =>
  import(`@modulz/radix-icons`).then((module_) => module_.CheckIcon),
);
const Cross1Icon = dynamic<IconProps>(() =>
  import(`@modulz/radix-icons`).then((module_) => module_.Cross1Icon),
);

export type PasswordRequirementProps = {
  meets: boolean;
  label: string;
};

const PasswordRequirement = ({
  meets,
  label,
}: PasswordRequirementProps): JSX.Element => {
  return (
    <Text
      color={meets ? `teal` : `red`}
      sx={{ display: `flex`, alignItems: `center` }}
      mt={7}
      size="sm"
    >
      {meets ? <CheckIcon /> : <Cross1Icon />} <Box ml={10}>{label}</Box>
    </Text>
  );
};

export default PasswordRequirement;
