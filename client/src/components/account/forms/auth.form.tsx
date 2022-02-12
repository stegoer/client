import ConfirmPasswordInput from "@/components/account/input/confirm-password.input";
import EmailInput from "@/components/account/input/email.input";
import PasswordStrength from "@/components/account/input/password-strength/password-strength.input";
import PasswordInput from "@/components/account/input/password.input";
import UsernameInput from "@/components/account/input/username.input";
import AuthLink from "@/components/account/links/auth.link";
import SubmitButton from "@/components/buttons/submit.button";
import {
  useCreateUserMutation,
  useLoginMutation,
} from "@/graphql/generated/codegen.generated";
import useAuthForm from "@/hooks/account/auth-form.hook";
import LocalStorageService from "@/services/local-storage.service";

import { Group, LoadingOverlay, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import type { FC } from "react";

const AuthForm: FC = () => {
  const [formType, setFormType] = useState<`register` | `login`>(`login`);
  const form = useAuthForm(formType);
  const [loginResult, login] = useLoginMutation();
  const [createUserResult, createUser] = useCreateUserMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  useEffect(
    () => setLoading(createUserResult.fetching || loginResult.fetching),
    [createUserResult.fetching, loginResult.fetching],
  );

  const resetError = () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setError(undefined);
  };

  const toggleFormType = () => {
    setFormType((current) => (current === `register` ? `login` : `register`));
    resetError();
  };

  const onSuccess = (token: string) => {
    LocalStorageService.set(`token`, token);
    router.reload();
  };

  const onLogin = (values: { email: string; password: string }) => {
    resetError();
    void login({ email: values.email, password: values.password }).then(
      (result) => {
        if (result.error) {
          setError(result.error.message);
        } else if (result.data?.login.auth?.token) {
          onSuccess(result.data.login.auth.token);
        }
      },
    );
  };

  const onRegister = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    resetError();
    console.log(values);
    void createUser({
      username: values.username,
      email: values.email,
      password: values.password,
    }).then((result) => {
      if (result.error) {
        setError(result.error.message);
      } else if (result.data?.createUser.auth.token) {
        onSuccess(result.data.createUser.auth.token);
      }
    });
  };

  const onSubmit = (values: {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    setLoading(true);
    // eslint-disable-next-line unicorn/no-useless-undefined
    setError(undefined);
    if (formType === `login`) {
      onLogin(values);
    } else {
      onRegister(values);
    }
  };

  return (
    <Paper style={{ width: 300, position: `relative` }}>
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
          <AuthLink formType={formType} toggleFormType={toggleFormType} />
          <SubmitButton
            text={formType === `register` ? `Register` : `Login`}
          />
        </Group>
      </form>
    </Paper>
  );
};

export default AuthForm;
