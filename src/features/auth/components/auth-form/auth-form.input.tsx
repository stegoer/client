import ConfirmPasswordInput from "@components/input/confirm-password.input";
import EmailInput from "@components/input/email.input";
import PasswordStrength from "@components/input/password-strength/password-strength.input";
import PasswordInput from "@components/input/password.input";
import UsernameInput from "@components/input/username.input";

import { Group } from "@mantine/core";

import type { FormType, UseAuthFormType } from "@features/auth/auth.types";

export type AuthFormInputProps = {
  form: UseAuthFormType;
  formType: FormType;
  disabled: boolean;
};

const AuthFormInput = ({
  form,
  formType,
  disabled,
}: AuthFormInputProps): JSX.Element => {
  return (
    <Group
      grow
      direction="column"
    >
      {formType === `register` && (
        <UsernameInput
          form={form}
          disabled={disabled}
        />
      )}
      <EmailInput
        form={form}
        disabled={disabled}
      />
      {formType === `register` ? (
        <PasswordStrength
          form={form}
          disabled={disabled}
        />
      ) : (
        <PasswordInput
          form={form}
          disabled={disabled}
        />
      )}
      {formType === `register` && (
        <ConfirmPasswordInput
          form={form}
          disabled={disabled}
        />
      )}
    </Group>
  );
};

export default AuthFormInput;
