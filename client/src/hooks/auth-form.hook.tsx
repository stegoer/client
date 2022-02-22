import { calculateStrength } from "@components/account/input/password-strength/constants";
import EmailValidator from "@validators/account/email.validator";
import StringValidator from "@validators/account/string.validator";

import { useForm } from "@mantine/hooks";

import type { FormType } from "@custom-types/account.types";
import type { User } from "@graphql/generated/codegen.generated";

const useAuthForm = (
  formType: FormType,
  validatePassword: boolean,
  user?: User,
) => {
  return useForm({
    initialValues: {
      username: user ? user.username : ``,
      email: user ? user.email : ``,
      password: ``,
      confirmPassword: ``,
    },

    validationRules: {
      username: (value) => formType === `login` || StringValidator(6)(value),
      email: EmailValidator,
      password: (value) =>
        !validatePassword ||
        formType === `login` ||
        calculateStrength(value) === 100,
      confirmPassword: (value, values) =>
        !validatePassword ||
        formType === `login` ||
        value.trim() === values?.password.trim(),
    },

    errorMessages: {
      username: `Username must contain at least 6 characters`,
      email: `Invalid email address`,
      password: `Invalid password`,
      confirmPassword: `Passwords don't match. Try again`,
    },
  });
};

export default useAuthForm;
