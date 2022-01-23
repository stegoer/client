/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Channel } from "./../../global-types";

// ====================================================
// GraphQL fragment: ImageConnectionFragment
// ====================================================

export interface ImageConnectionFragment_edges_node {
  __typename: "Image";
  id: string;
  channel: Channel;
  createdAt: any;
  updatedAt: any;
}

export interface ImageConnectionFragment_edges {
  __typename: "ImageEdge";
  node: ImageConnectionFragment_edges_node;
}

export interface ImageConnectionFragment_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: any | null;
}

export interface ImageConnectionFragment {
  __typename: "ImageConnection";
  totalCount: number;
  edges: (ImageConnectionFragment_edges | null)[];
  pageInfo: ImageConnectionFragment_pageInfo;
}
