import EmailInput from "@/components/account/input/email.input";
import PasswordStrength from "@/components/account/input/password-strength/password-strength.input";
import UsernameInput from "@/components/account/input/username.input";
import SubmitButton from "@/components/buttons/submit.button";
import { useUpdateUserMutation } from "@/graphql/generated/codegen.generated";
import useUpdateForm from "@/hooks/account/update-form.hook";

import { LoadingOverlay, Paper, Text } from "@mantine/core";
import React, { useState } from "react";

import type { User } from "@/graphql/generated/codegen.generated";
import type { FC } from "react";

type Props = {
  user: User;
};

const UserForm: FC<Props> = ({ user }) => {
  const form = useUpdateForm(user);
  const [updateResult, update] = useUpdateUserMutation();
  const [error, setError] = useState<string>();

  const onSubmit = (values: {
    username?: string;
    email?: string;
    password?: string;
  }) => {
    void update({
      username: values.username?.trim(),
      email: values.email?.trim(),
      password: values.password?.trim(),
    }).then((result) => {
      if (result.error) {
        setError(result.error.message);
      }
    });
  };

  return (
    <Paper style={{ width: 300, position: `relative` }}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <LoadingOverlay visible={updateResult.fetching} />
        <UsernameInput form={form} />
        <EmailInput form={form} />
        <PasswordStrength form={form} />
        {error && (
          <Text color="red" size="sm" mt="sm">
            {error}
          </Text>
        )}
        <SubmitButton text="Update" />
      </form>
    </Paper>
  );
};

export default UserForm;
