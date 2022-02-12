import EmailValidator from "@/validators/email.validator";
import StringValidator from "@/validators/string.validator";

import { useForm } from "@mantine/hooks";

import type { User } from "@/graphql/generated/codegen.generated";

const useUpdateForm = (user: User) => {
  return useForm({
    initialValues: {
      username: user.username,
      email: user.email,
      password: ``,
    },

    validationRules: {
      username: StringValidator(6),
      email: EmailValidator,
      password: StringValidator(6),
    },

    errorMessages: {
      username: `Username must contain at least 6 characters`,
      email: `Invalid email address`,
      password: `Invalid password`,
    },
  });
};

export default useUpdateForm;
