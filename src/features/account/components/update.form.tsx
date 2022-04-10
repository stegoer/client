import SubmitButton from "@components/buttons/submit.button";
import ConfirmPasswordInput from "@components/input/confirm-password.input";
import EmailInput from "@components/input/email.input";
import PasswordStrength from "@components/input/password-strength/password-strength.input";
import UsernameInput from "@components/input/username.input";
import userNotUpdatedNotification from "@features/account/notifications/user-not-updated.notification";
import userUpdatedNotification from "@features/account/notifications/user-updated.notification";
import { useUpdateUserMutation } from "@graphql/generated/codegen.generated";
import useAuthForm from "@hooks/auth-form.hook";

import { Anchor, Collapse, Group, LoadingOverlay } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import type { FormType } from "@features/auth/auth.types";
import type { User } from "@graphql/generated/codegen.generated";

const ErrorText = dynamic(() => import(`@components/errors/error.text`));

const DEFAULT_FORM_TYPE: FormType = `register`;

const getUpdatedValue = (user: User, key: keyof User, value?: string) =>
  value && value !== user[key] ? value : undefined;

export type UpdateFormProps = {
  user: User;
};

const UpdateForm = ({ user }: UpdateFormProps): JSX.Element => {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const form = useAuthForm(DEFAULT_FORM_TYPE, passwordOpen, user);
  const [updateResult, updateUser] = useUpdateUserMutation();
  const [error, setError] = useState<string>();
  const notifications = useNotifications();
  const loading = updateResult.fetching;

  const resetError = useCallback(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setError(undefined);
  }, []);

  const onSubmit = useCallback(
    (values: typeof form[`values`]) => {
      resetError();

      const username = getUpdatedValue(
        user,
        `username`,
        values.username.trim(),
      );
      const email = getUpdatedValue(user, `email`, values.email.trim());
      const password = passwordOpen ? values.password : undefined;

      if (username || email || password) {
        void updateUser({ username, email, password }).then((result) => {
          if (result.error) {
            setError(result.error.message);
          } else {
            notifications.showNotification(userUpdatedNotification(user));
          }
        });
      } else {
        setError(`No values updated`);
        notifications.showNotification(userNotUpdatedNotification(user));
      }
    },
    [resetError, user, passwordOpen, updateUser, notifications],
  );

  const errorContent = error && <ErrorText error={error} />;

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <LoadingOverlay visible={loading} />

      <Group
        grow
        direction="column"
      >
        <UsernameInput
          form={form}
          disabled={loading}
        />
        <EmailInput
          form={form}
          disabled={loading}
        />

        {error && !passwordOpen && errorContent}

        <Collapse in={passwordOpen}>
          <Group
            grow
            direction="column"
          >
            <PasswordStrength
              form={form}
              disabled={loading}
            />
            <ConfirmPasswordInput
              form={form}
              disabled={loading}
            />
          </Group>
        </Collapse>
      </Group>

      {error && passwordOpen && errorContent}

      <Group
        grow
        position="apart"
        mt={15}
      >
        <Anchor
          size="sm"
          onClick={() => {
            setPasswordOpen((current) => !current);
            resetError();
          }}
        >
          {passwordOpen ? `Close password` : `Set new password?`}
        </Anchor>
        <SubmitButton disabled={loading}>Update</SubmitButton>
      </Group>
    </form>
  );
};

export default UpdateForm;
