// inspired by https://mantine.dev/core/password-input/

import PasswordRequirement from "@components/input/password-strength/password-requirement";
import {
  calculateStrength,
  Requirements,
} from "@components/input/password-strength/password-strength.constants";
import PasswordInput from "@components/input/password.input";

import { Popover, Progress } from "@mantine/core";
import { useState } from "react";

import type { PasswordInputProps } from "@mantine/core/lib/components/PasswordInput/PasswordInput";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type PasswordStrengthProps<T extends { password: string }> = {
  form: UseForm<T>;
  inputProps?: PasswordInputProps;
  disabled: boolean;
};

const PasswordStrength = <T extends { password: string }>({
  form,
  inputProps,
  disabled,
}: PasswordStrengthProps<T>) => {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const requirements = Requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const strength = calculateStrength(form.values.password);
  const color = strength === 100 ? `teal` : strength > 50 ? `yellow` : `red`;

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      placement="start"
      withArrow
      styles={{ popover: { minWidth: `100%` } }}
      trapFocus={false}
      transition="pop-top-left"
      onFocusCapture={() => setPopoverOpened(true)}
      onBlurCapture={() => setPopoverOpened(false)}
      target={
        <PasswordInput
          form={form}
          props={{
            value: form.values.password,
            onChange: (event) => {
              form.setFieldValue(`password`, event.currentTarget.value);
            },
            ...inputProps,
          }}
          disabled={disabled}
        />
      }
    >
      <Progress
        color={color}
        value={strength}
        size={5}
        style={{ marginBottom: 10 }}
      />
      <PasswordRequirement
        label="Includes at least 6 characters"
        meets={form.values.password.length > 5}
      />
      {requirements}
    </Popover>
  );
};

export default PasswordStrength;
