import EmailValidator from "@/validators/email.validator";
import StringValidator from "@/validators/string.validator";

import { useForm } from "@mantine/hooks";

const useAuthForm = (formType: `login` | `register`) => {
  return useForm({
    initialValues: {
      username: ``,
      email: ``,
      password: ``,
      confirmPassword: ``,
    },

    validationRules: {
      username: (value) => formType === `login` || StringValidator(6)(value),
      email: EmailValidator,
      confirmPassword: (value, values) =>
        formType === `login` || value.trim() === values?.password.trim(),
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
