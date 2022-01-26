/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Channel, ErrorCode } from "./../../global-types";

// ====================================================
// GraphQL mutation operation: CreateImage
// ====================================================

export interface CreateImage_createImage_image {
  __typename: "Image";
  id: string;
  channel: Channel;
  createdAt: any;
  updatedAt: any;
}

export interface CreateImage_createImage_errors {
  __typename: "UserError";
  message: string;
  code: ErrorCode;
  path: string;
}

export interface CreateImage_createImage {
  __typename: "CreateImagePayload";
  image: CreateImage_createImage_image | null;
  errors: CreateImage_createImage_errors[];
}

export interface CreateImage {
  createImage: CreateImage_createImage;
}

export interface CreateImageVariables {
  channel: Channel;
  file: any;
}
