/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErrorCode } from "./../../global-types";

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser_user {
  __typename: "User";
  id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface CreateUser_createUser_auth {
  __typename: "Auth";
  token: string;
  expires: any;
}

export interface CreateUser_createUser_errors {
  __typename: "UserError";
  message: string;
  code: ErrorCode;
  path: string;
}

export interface CreateUser_createUser {
  __typename: "CreateUserPayload";
  user: CreateUser_createUser_user | null;
  auth: CreateUser_createUser_auth | null;
  errors: CreateUser_createUser_errors[];
}

export interface CreateUser {
  createUser: CreateUser_createUser;
}

export interface CreateUserVariables {
  username: string;
  password: string;
}
