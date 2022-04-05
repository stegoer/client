import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type UseAuthFormType = UseForm<{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

export type FormType = `login` | `register`;

export type AuthState = {
  token?: string;
};

export const isFormType = (s: string): s is FormType => {
  return [`login`, `register`].includes(s);
};
