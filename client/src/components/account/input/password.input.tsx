import { PasswordInput as MantinePasswordInput } from "@mantine/core";
import { LockClosedIcon } from "@modulz/radix-icons";

import type { PasswordInputProps } from "@mantine/core/lib/components/PasswordInput/PasswordInput";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

type Props<T> = {
  form: UseForm<{ password: string } & T>;
  props?: PasswordInputProps;
};

const PasswordInput = <T,>({ form, props }: Props<T>) => {
  return (
    <MantinePasswordInput
      required
      label="Password"
      placeholder="Password"
      toggleTabIndex={0}
      icon={<LockClosedIcon />}
      {...form.getInputProps(`password`)}
      {...props}
    />
  );
};

export default PasswordInput;