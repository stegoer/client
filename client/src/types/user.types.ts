import type { User } from "@graphql/generated/codegen.generated";

export type UserPayload = {
  user?: User;
  isAuthenticated: boolean;
  setUser(user?: User): void;
};
