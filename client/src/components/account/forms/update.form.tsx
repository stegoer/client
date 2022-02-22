import ConfirmPasswordInput from "@components/account/input/confirm-password.input";
import EmailInput from "@components/account/input/email.input";
import PasswordStrength from "@components/account/input/password-strength/password-strength.input";
import UsernameInput from "@components/account/input/username.input";
import SubmitButton from "@components/buttons/submit.button";
import { useUpdateUserMutation } from "@graphql/generated/codegen.generated";
import useAuthForm from "@hooks/auth-form.hook";
import useAuth from "@hooks/auth.hook";

import { Anchor, Collapse, Group, LoadingOverlay, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { CheckIcon, Cross2Icon } from "@modulz/radix-icons";
import { useCallback, useEffect, useState } from "react";

import type { User } from "@graphql/generated/codegen.generated";
import type { MantineColor } from "@mantine/core";
import type { FC, ReactNode } from "react";

type Props = {
  user: User;
};

const getUpdatedValue = (user: User, key: keyof User, value?: string) =>
  value && value !== user[key] ? value : undefined;

const UserForm: FC<Props> = ({ user }) => {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const form = useAuthForm(`register`, passwordOpen, user);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { update: updateAuth } = useAuth();
  const [updateResult, updateUser] = useUpdateUserMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const notifications = useNotifications();

  useEffect(() => setLoading(updateResult.fetching), [updateResult.fetching]);

  const showNotification = useCallback(
    (message: string, icon: ReactNode, color: MantineColor) => {
      notifications.showNotification({
        title: `Update ${user.username} account`,
        message,
        icon,
        color,
      });
    },
    [notifications, user.username],
  );

  const onSubmit = useCallback(
    (values: typeof form[`values`]) => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setError(undefined);

      const username = getUpdatedValue(
        user,
        `username`,
        values.username.trim(),
      );
      const email = getUpdatedValue(user, `email`, values.email.trim());
      const password = passwordOpen ? values.password.trim() : undefined;

      if (username || email || password) {
        void updateUser({ username, email, password }).then((result) => {
          if (result.error) {
            setError(result.error.message);
          } else {
            updateAuth();
            showNotification(
              `Account successfully updated`,
              <CheckIcon />,
              `green`,
            );
          }
        });
      } else {
        setError(`No values updated`);
        showNotification(`No values updated`, <Cross2Icon />, `red`);
      }
    },
    [updateAuth, passwordOpen, showNotification, updateUser, user],
  );

  const errorContent = (
    <Text color="red" size="sm" mt="sm">
      {error}
    </Text>
  );

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <LoadingOverlay visible={loading} />
      <UsernameInput form={form} />
      <EmailInput form={form} />

      {error && !passwordOpen && errorContent}

      <Group position="apart" mt="xs">
        <Anchor
          size="sm"
          onClick={() => setPasswordOpen((current) => !current)}
        >
          Set new password?
        </Anchor>
        <Collapse in={passwordOpen}>
          <PasswordStrength form={form} />
          <ConfirmPasswordInput form={form} />
        </Collapse>

        {error && passwordOpen && errorContent}
        <SubmitButton text="Update" disabled={loading} />
      </Group>
    </form>
  );
};

export default UserForm;
