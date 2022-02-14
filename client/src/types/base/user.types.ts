import type { User } from "@graphql/generated/codegen.generated";
import type { OperationContext } from "urql";

export type UserPayload = [
  User | undefined,
  (options?: Partial<OperationContext>) => void,
];
