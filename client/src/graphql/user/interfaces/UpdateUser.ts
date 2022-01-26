/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErrorCode } from "./../../global-types";

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_user {
  __typename: "User";
  id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateUser_updateUser_errors {
  __typename: "UserError";
  message: string;
  code: ErrorCode;
  path: string;
}

export interface UpdateUser_updateUser {
  __typename: "UpdateUserPayload";
  user: UpdateUser_updateUser_user | null;
  errors: UpdateUser_updateUser_errors[];
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  name?: string | null;
  password?: string | null;
}
