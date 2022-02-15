import ConfirmPasswordInput from "@components/account/input/confirm-password.input";
import EmailInput from "@components/account/input/email.input";
import PasswordStrength from "@components/account/input/password-strength/password-strength.input";
import PasswordInput from "@components/account/input/password.input";
import UsernameInput from "@components/account/input/username.input";
import AuthLink from "@components/account/links/auth.link";
import SubmitButton from "@components/buttons/submit.button";
import {
  useCreateUserMutation,
  useLoginMutation,
} from "@graphql/generated/codegen.generated";
import useAuthForm from "@hooks/account/auth-form.hook";
import LocalStorageService from "@services/base/local-storage.service";

import { Group, LoadingOverlay, Text, Title } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";

import type { FormType } from "@custom-types/account/account.types";
import type { FC } from "react";

type Props = {
  dispatch(): void;
};

const AuthForm: FC<Props> = ({ dispatch }) => {
  const [formType, toggleFormType] = useToggle<FormType>(`login`, [
    `login`,
    `register`,
  ]);
  const form = useAuthForm(formType, true);
  const [loginResult, login] = useLoginMutation();
  const [createUserResult, createUser] = useCreateUserMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const title = formType === `register` ? `Register` : `Login`;

  useEffect(
    () => setLoading(createUserResult.fetching || loginResult.fetching),
    [createUserResult.fetching, loginResult.fetching],
  );

  const resetError = useCallback(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setError(undefined);
  }, []);

  const onToggle = useCallback(() => {
    form.reset();
    toggleFormType();
    resetError();
  }, [form, resetError, toggleFormType]);

  const onSuccess = useCallback(
    (token: string) => {
      LocalStorageService.set(`token`, token);
      dispatch();
    },
    [dispatch],
  );

  const onLogin = useCallback(
    (values: { email: string; password: string }) => {
      void login({ email: values.email, password: values.password }).then(
        (result) => {
          if (result.error) {
            setError(result.error.message);
          } else if (result.data?.login) {
            onSuccess(result.data.login.auth.token);
          }
        },
      );
    },
    [login, onSuccess],
  );

  const onRegister = useCallback(
    (values: { username: string; email: string; password: string }) => {
      void createUser({
        username: values.username,
        email: values.email,
        password: values.password,
      }).then((result) => {
        if (result.error) {
          setError(result.error.message);
        } else if (result.data?.createUser) {
          onSuccess(result.data.createUser.auth.token);
        }
      });
    },
    [createUser, onSuccess],
  );

  const onSubmit = useCallback(
    (values: typeof form[`values`]) => {
      resetError();
      if (formType === `login`) {
        onLogin(values);
      } else {
        onRegister(values);
      }
    },
    [formType, onLogin, onRegister, resetError],
  );

  return (
    <>
      <Title>{title}</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <LoadingOverlay visible={loading} />

        {formType === `register` && <UsernameInput form={form} />}

        <EmailInput form={form} />

        {formType === `register` ? (
          <PasswordStrength form={form} />
        ) : (
          <PasswordInput form={form} />
        )}

        {formType === `register` && <ConfirmPasswordInput form={form} />}

        {error && (
          <Text color="red" size="sm" mt="sm">
            {error}
          </Text>
        )}

        <Group position="apart" mt="xl">
          <AuthLink
            formType={formType}
            toggleFormType={onToggle}
            disabled={loading}
          />
          <SubmitButton text={title} disabled={loading} />
        </Group>
      </form>
    </>
  );
};

export default AuthForm;
