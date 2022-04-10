import { PasswordInput as MantinePasswordInput } from "@mantine/core";
import { LockClosedIcon } from "@modulz/radix-icons";

import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type ConfirmPasswordInputProps<T extends { confirmPassword: string }> = {
  form: UseForm<T>;
  disabled?: boolean;
};

const ConfirmPasswordInput = <T extends { confirmPassword: string }>({
  form,
  disabled,
}: ConfirmPasswordInputProps<T>) => {
  return (
    <MantinePasswordInput
      required
      label="Confirm Password"
      placeholder="Confirm Password"
      toggleTabIndex={0}
      icon={<LockClosedIcon />}
      disabled={disabled}
      onBlur={() => form.validateField(`confirmPassword`)}
      {...form.getInputProps(`confirmPassword`)}
    />
  );
};

export default ConfirmPasswordInput;
