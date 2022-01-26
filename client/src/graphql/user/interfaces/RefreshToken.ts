/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErrorCode } from "./../../global-types";

// ====================================================
// GraphQL mutation operation: RefreshToken
// ====================================================

export interface RefreshToken_refreshToken_user {
  __typename: "User";
  id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface RefreshToken_refreshToken_auth {
  __typename: "Auth";
  token: string;
  expires: any;
}

export interface RefreshToken_refreshToken_errors {
  __typename: "UserError";
  message: string;
  code: ErrorCode;
  path: string;
}

export interface RefreshToken_refreshToken {
  __typename: "RefreshTokenPayload";
  user: RefreshToken_refreshToken_user | null;
  auth: RefreshToken_refreshToken_auth | null;
  errors: RefreshToken_refreshToken_errors[];
}

export interface RefreshToken {
  refreshToken: RefreshToken_refreshToken;
}

export interface RefreshTokenVariables {
  token: string;
}
