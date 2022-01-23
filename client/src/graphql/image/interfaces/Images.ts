/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  ImageWhereInput,
  ImageOrder,
  Channel,
  ErrorCode,
} from "./../../global-types";

// ====================================================
// GraphQL query operation: Images
// ====================================================

export interface Images_images_images_edges_node {
  __typename: "Image";
  id: string;
  channel: Channel;
  createdAt: any;
  updatedAt: any;
}

export interface Images_images_images_edges {
  __typename: "ImageEdge";
  node: Images_images_images_edges_node;
}

export interface Images_images_images_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: any | null;
}

export interface Images_images_images {
  __typename: "ImageConnection";
  totalCount: number;
  edges: (Images_images_images_edges | null)[];
  pageInfo: Images_images_images_pageInfo;
}

export interface Images_images_errors {
  __typename: "UserError";
  message: string;
  code: ErrorCode;
  path: string;
}

export interface Images_images {
  __typename: "ImagesPayload";
  images: Images_images_images | null;
  errors: Images_images_errors[];
}

export interface Images {
  images: Images_images;
}

export interface ImagesVariables {
  after?: any | null;
  first?: number | null;
  before?: any | null;
  last?: number | null;
  where?: ImageWhereInput | null;
  orderBy?: ImageOrder | null;
}
