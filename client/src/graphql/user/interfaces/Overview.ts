/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErrorCode } from "./../../global-types";

// ====================================================
// GraphQL query operation: Overview
// ====================================================

export interface Overview_overview_user {
  __typename: "User";
  id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface Overview_overview_errors {
  __typename: "UserError";
  message: string;
  code: ErrorCode;
  path: string;
}

export interface Overview_overview {
  __typename: "OverviewPayload";
  user: Overview_overview_user | null;
  errors: Overview_overview_errors[];
}

export interface Overview {
  overview: Overview_overview;
}
