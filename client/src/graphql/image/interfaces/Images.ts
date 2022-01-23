/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Channel } from "./../../global-types";

// ====================================================
// GraphQL query operation: Images
// ====================================================

export interface Images_images_edges_node {
  __typename: "Image";
  id: string;
  channel: Channel;
  createdAt: any;
}

export interface Images_images_edges {
  __typename: "ImageEdge";
  node: Images_images_edges_node | null;
}

export interface Images_images_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: any | null;
}

export interface Images_images {
  __typename: "ImageConnection";
  totalCount: number;
  edges: (Images_images_edges | null)[];
  pageInfo: Images_images_pageInfo;
}

export interface Images {
  images: Images_images | null;
}

export interface ImagesVariables {
  first?: number | null;
}
