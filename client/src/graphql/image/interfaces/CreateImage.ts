/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Channel } from "./../../global-types";

// ====================================================
// GraphQL mutation operation: CreateImage
// ====================================================

export interface CreateImage_createImage {
  __typename: "Image";
  id: string;
  channel: Channel;
  createdAt: any;
}

export interface CreateImage {
  createImage: CreateImage_createImage;
}

export interface CreateImageVariables {
  channel: Channel;
  file: any;
}
